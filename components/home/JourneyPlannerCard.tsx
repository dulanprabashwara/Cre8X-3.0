"use client";

import React from "react";
import {
  MapPin,
  Mic,
  Search,
  Crosshair,
  Footprints,
  ShieldCheck,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DEFAULT_ORIGIN } from "@/data/destinations";

export function JourneyPlannerCard() {
  const {
    destination,
    routeStyle,
    preferences,
    setDestinationSheetOpen,
    setVoiceModalOpen,
    setPreferencesSheetOpen,
    showToast,
  } = useJourney();

  const getRouteStyleLabel = () => {
    switch (routeStyle) {
      case "fastest":
        return "Fastest route";
      case "calmest":
        return "Calmest route";
      case "eco":
        return "Eco route";
      case "low_walking":
      default:
        return "Low walking";
    }
  };

  return (
    <div className="w-full bg-white rounded-card p-4 sm:p-5 border border-nova-border/70 shadow-card">
      <div className="flex flex-col space-y-3">
        {/* Origin Row */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full border-2 border-nova-green flex items-center justify-center bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-nova-green" />
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-nova-green to-nova-coral my-0.5 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-heading font-medium text-nova-text-muted">
              From
            </p>
            <h3 className="font-heading font-semibold text-[16px] sm:text-[17px] text-nova-text-primary truncate">
              {DEFAULT_ORIGIN.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => showToast("GPS updated: KDU Mobility Hub", "info")}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-nova-green hover:bg-nova-green-soft border border-transparent hover:border-nova-green/30 flex items-center justify-center transition-colors"
            aria-label="Use current GPS location"
            title="Use current GPS"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        {/* Destination Row */}
        <div className="flex items-center gap-3 -mt-1">
          <div className="w-4 flex justify-center">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-nova-coral border border-nova-coral-mid flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          <div
            onClick={() => setDestinationSheetOpen(true)}
            className="flex-1 bg-[#F9F7FB] hover:bg-[#F3EEF8] border border-nova-border rounded-xl pl-3 pr-1 py-1.5 flex items-center justify-between cursor-pointer transition-colors shadow-2xs group min-w-0"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
              <MapPin className="w-4 h-4 text-nova-text-secondary shrink-0 group-hover:text-nova-coral transition-colors" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-heading font-medium text-nova-text-muted">
                  To
                </p>
                <span className="font-heading font-semibold text-[15px] sm:text-[16px] text-nova-text-primary truncate block">
                  {destination.name}
                </span>
              </div>
            </div>

            <div
              className="flex items-center shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] text-nova-text-secondary hover:text-nova-green hover:bg-nova-green-soft rounded-xl flex items-center justify-center transition-colors"
                aria-label="Voice search destination"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDestinationSheetOpen(true)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] text-nova-text-muted hover:text-nova-text-primary rounded-xl flex items-center justify-center transition-colors"
                aria-label="Change destination"
                title="Change Destination"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Preference Summary Row */}
      <div className="mt-4 pt-3.5 border-t border-nova-divider flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-nova-green-soft border border-nova-green/30 text-[12px] font-heading font-semibold text-nova-text-primary">
            <Footprints className="w-3.5 h-3.5 text-nova-green shrink-0" />
            <span>{getRouteStyleLabel()}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-nova-surface border border-nova-border/70 text-[12px] font-heading font-medium text-nova-text-secondary">
            <ShieldCheck className="w-3.5 h-3.5 text-nova-green shrink-0" />
            <span>{preferences.stepFree ? "Step-free" : "Standard"}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPreferencesSheetOpen(true)}
          className="min-h-[44px] px-2 sm:px-3 inline-flex items-center gap-1 text-[13px] font-heading font-semibold text-nova-green hover:underline shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Change</span>
        </button>
      </div>

      {/* Departure / Timing Row */}
      <div className="mt-3 pt-3 border-t border-nova-border/50 flex items-center justify-between text-[13px] text-nova-text-secondary">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-nova-coral shrink-0" />
          <span className="font-heading font-medium text-nova-text-primary">
            Leave now
          </span>
          <span className="text-nova-text-muted">· Departure 09:18</span>
        </div>

        <button
          type="button"
          onClick={() =>
            showToast("Demo schedule set to leave now (09:18 AM)", "info")
          }
          className="min-h-[44px] px-2 text-[12px] font-heading font-semibold text-nova-text-muted hover:text-nova-text-primary"
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
