"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Radio,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function JourneyGuardianCard() {
  const { currentJourney } = useJourney();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white rounded-card p-4 border border-nova-border/70 shadow-xs">
      {/* Compact Status Strip */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-nova-coral-soft border border-nova-coral/30 flex items-center justify-center text-nova-coral shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-[12px] text-nova-coral uppercase tracking-wider">
                Journey Guardian
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-heading font-semibold text-nova-green">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Everything is ready
              </span>
            </div>
            <p className="text-[13px] font-heading text-nova-text-secondary truncate mt-0.5">
              Vehicle reserved · Step-free boarding · Arrival monitored
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

      {/* Expandable Details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-nova-divider space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-nova-text-primary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Vehicle reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Accessible boarding confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Service monitored</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
              <span>Arrival monitored</span>
            </div>
          </div>
          <div className="pt-2 border-t border-nova-border/40 flex items-center justify-between text-[12px] text-nova-text-secondary">
            <span>NOVA is monitoring your journey.</span>
            <Radio className="w-3.5 h-3.5 text-nova-coral animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
