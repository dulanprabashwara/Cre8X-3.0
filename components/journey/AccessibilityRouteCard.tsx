"use client";

import React, { useState } from "react";
import {
  Accessibility,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function AccessibilityRouteCard() {
  const { currentJourney, setPreferencesSheetOpen } = useJourney();
  const { accessibility } = currentJourney;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white rounded-card p-4 border border-nova-border/70 shadow-xs">
      {/* Main Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-nova-green-soft border border-nova-green/30 flex items-center justify-center text-nova-green shrink-0 shadow-2xs">
            <Accessibility className="w-4.5 h-4.5" />
          </div>

          <div className="min-w-0">
            <h4 className="font-heading font-semibold text-[14px] text-nova-text-primary truncate">
              Accessible journey
            </h4>
            <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5 truncate">
              {accessibility.walkReductionPercent}% less walking · Step-free boarding
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="min-h-[44px] px-2.5 inline-flex items-center gap-1 text-[13px] font-heading font-semibold text-nova-green hover:underline shrink-0"
          aria-expanded={expanded}
        >
          <span>{expanded ? "Less" : "Details"}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Inline Route-Specific Accessibility Details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-nova-divider space-y-2.5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-nova-text-primary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>{accessibility.walkReductionPercent}% less walking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Direct non-stop service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Step-free boarding</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Level boarding & ramps verified</span>
            </div>
          </div>

          <div className="pt-2 border-t border-nova-border/40 flex justify-end">
            <button
              type="button"
              onClick={() => setPreferencesSheetOpen(true)}
              className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-[12px] font-heading font-semibold text-nova-text-secondary hover:text-nova-green transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Change preferences</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
