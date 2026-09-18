"use client";

import React from "react";
import { Sparkles, CheckCircle2, Radio } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function JourneyGuardianCard() {
  const { currentJourney } = useJourney();
  const { guardian } = currentJourney;

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Badges Row */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nova-coral-soft border border-nova-coral/20 text-nova-coral text-[12px] font-heading font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Journey Guardian</span>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[12px] font-heading font-semibold text-nova-green">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-nova-green" />
          </span>
          <span>{guardian.status}</span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="font-heading font-bold text-[18px] text-nova-text-primary mt-3">
        {guardian.title}
      </h3>

      {/* Verified Checklist */}
      <div className="mt-3 space-y-2">
        {guardian.verifiedPoints.map((point) => (
          <div key={point} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0 stroke-[2.2]" />
            <span className="font-heading text-[14px] font-medium text-nova-text-primary">
              {point}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Monitoring Note */}
      <div className="mt-4 pt-3 border-t border-nova-divider flex items-center justify-between text-nova-text-secondary text-[13px]">
        <span>{guardian.monitoringNote}</span>
        <Radio className="w-4 h-4 text-nova-coral animate-pulse" />
      </div>
    </div>
  );
}
