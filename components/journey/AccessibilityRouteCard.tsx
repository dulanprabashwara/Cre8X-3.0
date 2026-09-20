"use client";

import React from "react";
import { Accessibility } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function AccessibilityRouteCard() {
  const { currentJourney, setPreferencesSheetOpen } = useJourney();
  const { accessibility } = currentJourney;

  return (
    <div className="w-full bg-white rounded-card p-3.5 sm:p-4 border border-nova-border/70 shadow-xs flex items-center justify-between gap-3">
      {/* Icon & Label */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-nova-green-soft border border-nova-green/30 flex items-center justify-center text-nova-green shrink-0 shadow-2xs">
          <Accessibility className="w-4.5 h-4.5" />
        </div>

        <div className="min-w-0">
          <h4 className="font-heading font-semibold text-[14px] text-nova-text-primary truncate">
            Low walking route
          </h4>
          <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5 truncate">
            {accessibility.walkReductionPercent}% less walking · Elevators
            available
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPreferencesSheetOpen(true)}
        className="min-h-[44px] px-2.5 inline-flex items-center text-[13px] font-heading font-semibold text-nova-green hover:underline shrink-0"
      >
        Details
      </button>
    </div>
  );
}
