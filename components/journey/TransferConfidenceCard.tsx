"use client";

import React from "react";
import { useJourney } from "@/context/JourneyContext";

export function TransferConfidenceCard() {
  const { currentJourney } = useJourney();
  const { transferConfidence } = currentJourney;

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
          Transfer Confidence
        </span>
        <span className="text-[13px] font-heading font-semibold text-nova-green">
          {transferConfidence.label}
        </span>
      </div>

      {/* Explanatory Dual-Tone Buffer Bar */}
      <div className="w-full h-2.5 bg-nova-surface rounded-full overflow-hidden flex items-center p-0.5 border border-nova-border/50">
        {/* Available Buffer (Green to Amber Gradient) */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-nova-green via-[#9EC956] to-nova-warning transition-all duration-500"
          style={{ width: `${transferConfidence.confidenceRatio * 100}%` }}
        />
      </div>

      {/* Buffer Labels */}
      <div className="flex items-center justify-between mt-2.5 text-[13px] font-heading font-medium">
        <span className="text-nova-green">
          {transferConfidence.availableBufferMin} min available buffer
        </span>
        <span className="text-nova-text-secondary">
          {transferConfidence.neededBufferMin} min needed
        </span>
      </div>
    </div>
  );
}
