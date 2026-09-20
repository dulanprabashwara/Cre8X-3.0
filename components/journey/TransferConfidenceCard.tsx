"use client";

import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function TransferConfidenceCard() {
  const { currentJourney } = useJourney();
  const { transferConfidence } = currentJourney;

  return (
    <div className="w-full bg-white rounded-card p-4 border border-nova-border/70 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-nova-green" />
          <span className="text-[12px] font-heading font-semibold uppercase tracking-wider text-nova-text-muted">
            Transfer details
          </span>
        </div>
        <span className="text-[12px] font-heading font-semibold text-nova-green">
          Comfortable transfer
        </span>
      </div>

      {/* Explanatory Dual-Tone Buffer Bar */}
      <div className="w-full h-2 bg-nova-surface rounded-full overflow-hidden flex items-center p-0.5 border border-nova-border/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-nova-green to-nova-coral-mid transition-all duration-500"
          style={{ width: `${transferConfidence.confidenceRatio * 100}%` }}
        />
      </div>

      {/* Plain Language Buffer Summary */}
      <div className="flex items-center justify-between mt-2 text-[12px] font-heading font-medium">
        <span className="text-nova-green font-semibold">
          {transferConfidence.availableBufferMin} min available
        </span>
        <span className="text-nova-text-secondary">
          About {transferConfidence.neededBufferMin} min needed
        </span>
      </div>
    </div>
  );
}
