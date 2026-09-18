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
    <div className="w-full bg-white rounded-card p-5 border border-nova-coral/30 shadow-card relative overflow-hidden group hover:border-nova-coral/50 transition-colors">
      {/* Soft coral bioluminescent gradient highlight in top corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-nova-coral/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-nova-coral-soft border border-nova-coral/20 flex items-center justify-center text-nova-coral shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-[15px] text-nova-coral flex items-center gap-1">
            ✦ NOVA Insight
          </span>
        </div>

        <span className="text-[13px] font-heading font-semibold text-nova-coral tracking-wide">
          Predictive
        </span>
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="font-heading font-bold text-[17px] text-nova-text-primary leading-tight">
          Leave in 6 minutes
        </h3>
        <p className="text-[14px] text-nova-text-secondary mt-1.5 leading-relaxed">
          HyperRail traffic is expected to increase after 09:30. Avoids a
          predicted 14 min delay.
        </p>
      </div>

      {/* Footer Divider & CTA */}
      <div className="mt-4 pt-3 border-t border-nova-divider flex items-center justify-between">
        <span className="text-[13px] font-medium text-nova-text-muted">
          Take Pod P17 directly
        </span>

        <button
          onClick={handlePlanTrip}
          className="inline-flex items-center gap-1 text-[14px] font-heading font-semibold text-nova-coral hover:text-nova-coral-mid transition-colors active:translate-x-0.5"
        >
          <span>Plan this trip</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
