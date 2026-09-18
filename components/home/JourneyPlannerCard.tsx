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
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DEFAULT_ORIGIN } from "@/data/destinations";
import { cn } from "@/lib/utils";

export function JourneyPlannerCard() {
  const {
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

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Route Selector Nodes */}
      <div className="flex flex-col">
        {/* Origin Row */}
        <div className="flex items-start gap-3.5">
          <div className="mt-1 flex flex-col items-center">
            {/* Origin Node Icon */}
            <div className="w-4 h-4 rounded-full border-2 border-nova-green flex items-center justify-center bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-nova-green" />
            </div>
            {/* Connecting Track Line */}
            <div className="w-0.5 h-8 bg-gradient-to-b from-nova-green to-nova-coral my-0.5 rounded-full" />
          </div>

          <div className="flex-1 flex items-center justify-between pt-0.5">
            <div>
              <p className="text-[13px] font-medium text-nova-text-muted">
                {DEFAULT_ORIGIN.subtitle}
              </p>
              <h3 className="font-heading font-semibold text-[17px] text-nova-text-primary">
                {DEFAULT_ORIGIN.name}
              </h3>
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
        </div>

        {/* Destination Row */}
        <div className="flex items-center gap-3.5 -mt-1">
          <div className="w-4 flex justify-center">
            <div className="w-3.5 h-3.5 rounded-[4px] bg-nova-coral border border-nova-coral-mid flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          {/* Destination Input Box */}
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

            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
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
      </div>

      {/* Travel Preferences Row */}
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
                  : "bg-nova-surface/60 hover:bg-nova-surface border-nova-border/70 text-nova-text-secondary hover:text-nova-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isSelected ? "text-nova-green" : "text-nova-text-secondary"
                )}
              />
              <span>{pref.label}</span>
              {isSelected && <Check className="w-3 h-3 text-nova-green stroke-[3] ml-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
