"use client";

import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function ApproachingTransferBanner() {
  const { setLiveMode } = useJourney();

  return (
    <div className="w-full p-4 rounded-card bg-nova-warning-soft border border-nova-warning/30 shadow-xs flex flex-col space-y-2 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-nova-warning font-heading font-bold text-[14px]">
          <AlertTriangle className="w-4 h-4" />
          <span>Get ready to transfer</span>
        </div>
        <span className="text-[12px] font-heading font-bold px-2 py-0.5 rounded-full bg-white text-nova-warning border border-nova-warning/20">
          2 min
        </span>
      </div>

      <div className="pl-6">
        <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight">
          Central Skyport
        </h4>
        <p className="text-[13px] text-nova-text-secondary mt-0.5 leading-snug">
          Exit on the left. Follow the coral signs to Gate 04.
        </p>

        <button
          onClick={() => setLiveMode("instructions")}
          className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-nova-text-primary hover:text-nova-green transition-colors"
        >
          <span>Show step-by-step guidance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
