"use client";

import React from "react";
import {
  MapPin,
  Mic,
  X,
  Crosshair,
  Zap,
  Sparkles,
  Leaf,
  Footprints,
  Check,
  Clock3,
  Route,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DEFAULT_ORIGIN, DESTINATIONS } from "@/data/destinations";
import { cn } from "@/lib/utils";

export function JourneyPlannerCard() {
  const {
    currentLocation,
    setCurrentLocation,
    preferredModes,
    setPreferredModes,
    departureTime,
    setDepartureTime,
    destination,
    setDestination,
    routeStyle,
    setRouteStyle,
    setDestinationSheetOpen,
    setVoiceModalOpen,
    showToast,
  } = useJourney();

  const preferencesList = [
    { id: "fastest", label: "Fastest", icon: Zap },
    { id: "calmest", label: "Calmest", icon: Sparkles },
    { id: "eco", label: "Eco", icon: Leaf },
    { id: "low_walking", label: "Low walking", icon: Footprints },
  ] as const;

  const travelModes = ["Pod", "HyperRail", "AeroLink", "Walk"] as const;

  const handleModeToggle = (mode: (typeof travelModes)[number]) => {
    if (preferredModes.includes(mode)) {
      setPreferredModes(preferredModes.filter((item) => item !== mode));
      return;
    }

    setPreferredModes([...preferredModes, mode]);
  };

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <div className="mt-1 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full border-2 border-nova-green flex items-center justify-center bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-nova-green" />
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-nova-green to-nova-coral my-0.5 rounded-full" />
          </div>

          <div className="flex-1">
            <label className="block">
              <span className="text-[12px] font-medium text-nova-text-muted">
                {DEFAULT_ORIGIN.subtitle}
              </span>
              <select
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-nova-border bg-nova-surface/30 px-3 py-2.5 text-[15px] font-heading font-medium text-nova-text-primary outline-none transition focus:border-nova-green"
              >
                {[
                  DEFAULT_ORIGIN.name,
                  ...DESTINATIONS.map((item) => item.name),
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            onClick={() => showToast("GPS updated: KDU Mobility Hub")}
            className="p-2 rounded-full text-nova-green hover:bg-nova-green-soft transition-colors"
            aria-label="Use current GPS location"
            title="Use Current GPS"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3.5 -mt-1">
          <div className="w-4 flex justify-center">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-nova-coral border border-nova-coral-mid flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          <div
            onClick={() => setDestinationSheetOpen(true)}
            className="flex-1 bg-[#F9F7FB] hover:bg-[#F3EEF8] border border-nova-border rounded-xl px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-nova-text-secondary shrink-0 group-hover:text-nova-coral transition-colors" />
              <span className="font-heading font-medium text-[15px] text-nova-text-primary truncate">
                {destination.name}
              </span>
            </div>

            <div
              className="flex items-center gap-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="p-1.5 text-nova-text-secondary hover:text-nova-green hover:bg-nova-green-soft rounded-full transition-colors"
                aria-label="Voice search destination"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDestinationSheetOpen(true)}
                className="p-1.5 text-nova-text-muted hover:text-nova-text-primary rounded-full transition-colors"
                aria-label="Search destination"
                title="Change Destination"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
          <div className="rounded-xl border border-nova-border/70 bg-nova-surface/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
              <Route className="w-3.5 h-3.5 text-nova-green" />
              Travel modes
            </div>
            <div className="flex flex-wrap gap-2">
              {travelModes.map((mode) => {
                const selected = preferredModes.includes(mode);

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleModeToggle(mode)}
                    className={cn(
                      "rounded-full border px-2.5 py-1.5 text-[12px] font-heading font-medium transition-all",
                      selected
                        ? "border-nova-green bg-nova-green-soft text-nova-text-primary"
                        : "border-nova-border bg-white text-nova-text-secondary",
                    )}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="rounded-xl border border-nova-border/70 bg-nova-surface/30 p-3">
            <span className="mb-2 flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
              <Clock3 className="w-3.5 h-3.5 text-nova-coral" />
              Start
            </span>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full rounded-lg border border-nova-border bg-white px-2 py-2 text-[14px] text-nova-text-primary outline-none transition focus:border-nova-green"
            />
          </label>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-nova-divider flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {preferencesList.map((pref) => {
          const isSelected = routeStyle === pref.id;
          const Icon = pref.icon;

          return (
            <button
              key={pref.id}
              onClick={() => setRouteStyle(pref.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-heading font-medium border transition-all select-none shrink-0",
                isSelected
                  ? "bg-nova-green-soft border-nova-green text-nova-text-primary font-semibold shadow-2xs ring-1 ring-nova-green/30"
                  : "bg-nova-surface/60 hover:bg-nova-surface border-nova-border/70 text-nova-text-secondary hover:text-nova-text-primary",
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isSelected ? "text-nova-green" : "text-nova-text-secondary",
                )}
              />
              <span>{pref.label}</span>
              {isSelected && (
                <Check className="w-3 h-3 text-nova-green stroke-[3] ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
