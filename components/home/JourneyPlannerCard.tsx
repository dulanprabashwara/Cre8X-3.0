"use client";

import React, { useMemo } from "react";
import {
  CarFront,
  TrainFront,
  Plane,
  BusFront,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  AlertCircle,
  Check,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import {
  TravelMethod,
  PLANNER_LOCATIONS,
  METHOD_CONFIGS,
  calculateMethodEstimates,
} from "@/lib/journeyPlanner";
import { DESTINATIONS } from "@/data/destinations";
import { cn } from "@/lib/utils";

interface JourneyPlannerCardProps {
  onSameLocationChange?: (isSame: boolean) => void;
}

export function JourneyPlannerCard({ onSameLocationChange }: JourneyPlannerCardProps) {
  const {
    origin,
    destination,
    departureTime,
    selectedMethod,
    recommendedMethod,
    userHasOverriddenMethod,
    setOrigin,
    setDestination,
    setDepartureTime,
    setSelectedMethod,
    resetToRecommendedMethod,
    setPreferencesSheetOpen,
    preferences,
  } = useJourney();

  // Check if start and destination are identical
  const isSameLocation = origin.id === destination.id;

  React.useEffect(() => {
    if (onSameLocationChange) {
      onSameLocationChange(isSameLocation);
    }
  }, [isSameLocation, onSameLocationChange]);

  // Destination Planner Location
  const destPlannerLoc = useMemo(() => {
    return (
      PLANNER_LOCATIONS.find((l) => l.id === destination.id) || {
        id: destination.id,
        name: destination.name,
        district: destination.district,
        terminal: "Terminal Concourse",
        supportedMethods: ["rail", "pod", "aero", "road"] as TravelMethod[],
      }
    );
  }, [destination]);

  // Real-time method duration & availability estimates
  const estimates = useMemo(() => {
    return calculateMethodEstimates(origin, destPlannerLoc, departureTime, preferences);
  }, [origin, destPlannerLoc, departureTime, preferences]);

  const methodsList: { id: TravelMethod; label: string; icon: React.ElementType }[] = [
    { id: "pod", label: "Autonomous Pod", icon: CarFront },
    { id: "rail", label: "HyperRail", icon: TrainFront },
    { id: "aero", label: "AeroLink", icon: Plane },
    { id: "road", label: "Smart Road", icon: BusFront },
  ];

  return (
    <div className="w-full bg-white rounded-card p-3.5 sm:p-5 border border-nova-border/70 shadow-card space-y-3 sm:space-y-4">
      {/* 1. Origin & Destination Row */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Start Location */}
        <label className="space-y-1.5 block">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider">
            Start location
          </span>
          <div className="relative block">
            <select
              value={origin.id}
              onChange={(e) => {
                const selected = PLANNER_LOCATIONS.find((l) => l.id === e.target.value);
                if (selected) setOrigin(selected);
              }}
              className="w-full min-h-[44px] h-11 appearance-none rounded-xl border border-nova-border bg-[#FAF8FC] px-3 pr-9 text-[14px] font-heading font-medium text-nova-text-primary focus:border-nova-green focus:bg-white focus:outline-none transition-colors"
            >
              {PLANNER_LOCATIONS.map((loc) => (
                <option key={`origin-${loc.id}`} value={loc.id}>
                  {loc.name} ({loc.district})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-nova-text-muted" />
          </div>
        </label>

        {/* Destination Location */}
        <label className="space-y-1.5 block">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider">
            Destination
          </span>
          <div className="relative block">
            <select
              value={destination.id}
              onChange={(e) => {
                const found = DESTINATIONS.find((d) => d.id === e.target.value);
                if (found) {
                  setDestination(found);
                } else {
                  const loc = PLANNER_LOCATIONS.find((l) => l.id === e.target.value);
                  if (loc) {
                    setDestination({
                      id: loc.id,
                      name: loc.name,
                      district: loc.district,
                      category: "recent",
                      durationMinutes: 22,
                      iconType: "building",
                      modes: ["HyperRail", "Pod"],
                    });
                  }
                }
              }}
              className={cn(
                "w-full min-h-[44px] h-11 appearance-none rounded-xl border bg-[#FAF8FC] px-3 pr-9 text-[14px] font-heading font-medium text-nova-text-primary focus:bg-white focus:outline-none transition-colors",
                isSameLocation
                  ? "border-nova-coral focus:border-nova-coral bg-nova-coral-soft/20"
                  : "border-nova-border focus:border-nova-green",
              )}
            >
              {PLANNER_LOCATIONS.map((loc) => (
                <option key={`dest-${loc.id}`} value={loc.id}>
                  {loc.name} ({loc.district})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-nova-text-muted" />
          </div>
        </label>
      </div>

      {/* Inline Same Location Warning */}
      {isSameLocation && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-nova-coral-soft/60 border border-nova-coral/40 text-nova-coral text-[13px] font-heading font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Choose a different destination to plan your journey.</span>
        </div>
      )}

      {/* 2. Departure Time Row */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-nova-border/40">
        <label htmlFor="departure-time-input" className="flex items-center gap-2">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider">
            Departure time
          </span>
        </label>

        <div className="relative">
          <input
            id="departure-time-input"
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="min-h-[44px] h-11 px-3 py-1.5 rounded-xl border border-nova-border bg-[#FAF8FC] text-[14px] font-heading font-bold text-nova-text-primary focus:border-nova-green focus:bg-white focus:outline-none transition-colors cursor-pointer"
          />
        </div>
      </div>

      {/* 3. Single Travel Method Selection */}
      <div className="space-y-2 pt-1 border-t border-nova-border/40">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider">
            Choose travel method
          </span>
          <span className="text-[12px] font-heading font-medium text-nova-text-secondary">
            Single primary method
          </span>
        </div>

        {/* 4 Method Cards: 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {methodsList.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMethod === m.id;
            const isRecommended = recommendedMethod === m.id;
            const estimate = estimates[m.id];
            const isAvailable = estimate?.isAvailable ?? true;

            return (
              <button
                key={m.id}
                type="button"
                disabled={!isAvailable || isSameLocation}
                onClick={() => setSelectedMethod(m.id)}
                className={cn(
                  "relative p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[78px] sm:min-h-[92px] group active:scale-[0.98]",
                  !isAvailable || isSameLocation
                    ? "opacity-45 bg-[#F7F5F9] border-nova-border/50 cursor-not-allowed"
                    : isSelected
                      ? "border-2 border-nova-green bg-nova-green-soft/40 shadow-xs ring-1 ring-nova-green/20"
                      : "border-nova-border bg-white hover:border-nova-green/60 hover:bg-[#FAF8FC]",
                )}
                aria-pressed={isSelected}
              >
                {/* Top Row: Icon + Selection Indicator */}
                <div className="flex items-start justify-between w-full">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-nova-green text-white"
                        : "bg-nova-surface text-nova-text-secondary group-hover:text-nova-text-primary",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Selected checkmark or recommended indicator */}
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-nova-green text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  ) : null}
                </div>

                {/* Center / Bottom Info */}
                <div className="mt-2">
                  <div className="font-heading font-bold text-[14px] text-nova-text-primary leading-tight">
                    {m.label}
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[12px] font-heading font-medium text-nova-text-secondary">
                      {isAvailable ? `${estimate.durationMinutes} min` : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* NOVA Recommends Coral Badge */}
                {isRecommended && (
                  <div className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full bg-nova-coral text-white text-[12px] font-heading font-bold shadow-2xs flex items-center gap-1 z-10">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>NOVA recommends</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Choice vs Recommendation Banner (when user overrides) */}
      {userHasOverriddenMethod && selectedMethod !== recommendedMethod && (
        <div className="p-3 rounded-xl bg-[#FAF8FC] border border-nova-border flex items-center justify-between gap-2 text-[13px] animate-in fade-in duration-200">
          <div className="min-w-0">
            <p className="font-heading font-medium text-nova-text-primary">
              <span className="text-nova-text-secondary">Your choice:</span>{" "}
              <strong>{METHOD_CONFIGS[selectedMethod].label}</strong>
              <span className="mx-2 text-nova-border">•</span>
              <span className="text-nova-text-secondary">NOVA recommends:</span>{" "}
              <strong className="text-nova-coral">
                {METHOD_CONFIGS[recommendedMethod].label}
              </strong>
            </p>
          </div>

          <button
            type="button"
            onClick={resetToRecommendedMethod}
            className="min-h-[44px] px-3 rounded-lg bg-nova-coral-soft hover:bg-nova-coral-soft/80 text-nova-coral font-heading font-semibold text-[12px] shrink-0 transition-colors"
          >
            Use recommendation
          </button>
        </div>
      )}

      {/* 4. Journey Preferences Summary */}
      <div className="flex items-center justify-between pt-1 border-t border-nova-border/40 text-[13px]">
        <div className="flex items-center gap-2 text-nova-text-secondary font-heading font-medium flex-wrap">
          <span className="px-2.5 py-1 rounded-md bg-[#FAF8FC] border border-nova-border text-[12px]">
            {preferences.stepFree ? "Step-free" : "Standard access"}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#FAF8FC] border border-nova-border text-[12px]">
            {preferences.reduceWalking ? "Low walking" : "Standard walking"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPreferencesSheetOpen(true)}
          className="min-h-[44px] px-2.5 inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-nova-green hover:underline"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Change</span>
        </button>
      </div>
    </div>
  );
}
