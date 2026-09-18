"use client";

import React from "react";
import { Accessibility } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function AccessibilityRouteCard() {
  const { currentJourney } = useJourney();
  const { accessibility } = currentJourney;

  return (
    <div className="w-full bg-white rounded-card p-4 border border-nova-border/70 shadow-card flex items-center gap-3.5">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-nova-green-soft border border-nova-green/30 flex items-center justify-center text-nova-green shrink-0 shadow-2xs">
        <Accessibility className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h4 className="font-heading font-semibold text-[15px] text-nova-text-primary truncate">
          {accessibility.preferenceLabel}
        </h4>
        <p className="text-[13px] text-nova-text-secondary mt-0.5 leading-snug">
          Walking reduced by {accessibility.walkReductionPercent}% · Elevators confirmed at all transfers
        </p>
      </div>
    </div>
  );
}
