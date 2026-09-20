"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { useRouter } from "next/navigation";

export function NovaInsightCard() {
  const { startPlanning } = useJourney();
  const router = useRouter();

  const handlePlanTrip = () => {
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-nova-coral-soft/60 via-white to-white rounded-card p-3.5 sm:p-4 border border-nova-coral/30 shadow-2xs flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-nova-coral-soft border border-nova-coral/30 flex items-center justify-center text-nova-coral shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="font-heading font-bold text-[12px] text-nova-coral uppercase tracking-wider block">
            NOVA Insight
          </span>
          <p className="text-[12px] sm:text-[13px] font-heading font-medium text-nova-text-primary leading-tight">
            Leave in 6 min to avoid a predicted delay.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePlanTrip}
        className="min-h-[44px] px-3 inline-flex items-center gap-1 text-[13px] font-heading font-semibold text-nova-coral hover:text-nova-coral-mid transition-colors shrink-0"
      >
        <span>Plan trip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
