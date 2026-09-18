"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function JourneySummaryCard() {
  const { currentJourney } = useJourney();

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
          Estimated Transit
        </span>

        {/* Arrival on time badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nova-green-soft border border-nova-green/30 text-nova-green text-[12px] font-heading font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{currentJourney.statusLabel}</span>
        </div>
      </div>

      {/* Large Timing Row */}
      <div className="mt-4 flex items-center justify-between">
        {/* Departure */}
        <div className="flex flex-col">
          <span className="font-heading font-bold text-[30px] text-nova-text-primary tracking-tight leading-none">
            {currentJourney.departureTime}
          </span>
          <span className="text-[12px] font-heading font-bold tracking-widest text-nova-text-muted uppercase mt-1.5">
            Departure
          </span>
        </div>

        {/* Duration & Segment connector */}
        <div className="flex-1 mx-4 flex flex-col items-center">
          <span className="font-heading font-bold text-[20px] text-nova-green tracking-tight mb-1">
            {currentJourney.durationMinutes} min
          </span>

          {/* Dotted/segmented connecting line */}
          <div className="w-full max-w-[140px] flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-nova-green shrink-0" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-nova-green via-nova-coral-mid to-nova-coral rounded-full" />
            <div className="w-2 h-2 rounded-full bg-nova-coral shrink-0" />
          </div>

          <span className="text-[12px] font-heading font-medium text-nova-text-secondary mt-1.5">
            {currentJourney.connectionSummary}
          </span>
        </div>

        {/* Arrival */}
        <div className="flex flex-col items-end">
          <span className="font-heading font-bold text-[30px] text-nova-text-primary tracking-tight leading-none">
            {currentJourney.arrivalTime}
          </span>
          <span className="text-[12px] font-heading font-bold tracking-widest text-nova-text-muted uppercase mt-1.5">
            Arrival
          </span>
        </div>
      </div>
    </div>
  );
}
