"use client";

import React from "react";
import { Sparkles, CheckCircle2, Check } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export function WhyJourneySheet() {
  const {
    whyJourneySheetOpen,
    setWhyJourneySheetOpen,
    currentJourney,
    showToast,
  } = useJourney();
  const { whyNova } = currentJourney;

  return (
    <Sheet
      isOpen={whyJourneySheetOpen}
      onClose={() => setWhyJourneySheetOpen(false)}
    >
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-nova-coral-soft border border-nova-coral/20 flex items-center justify-center text-nova-coral shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-[22px] text-nova-text-primary">
              {whyNova.title}
            </h2>
            <p className="text-[14px] text-nova-text-secondary mt-0.5">
              {whyNova.headline}
            </p>
          </div>
        </div>

        {/* Personalized Rationale Box */}
        <div className="p-4 rounded-card bg-[#FAF8FC] border border-nova-border/80 shadow-2xs">
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-coral flex items-center gap-1 mb-1.5">
            <Sparkles className="w-3 h-3" />
            Personalized Routing Intelligence
          </span>
          <p className="text-[14px] text-nova-text-primary leading-relaxed font-medium">
            {whyNova.summary}
          </p>
        </div>

        {/* Evaluation Factors Tags */}
        <div>
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted mb-2 block">
            NOVA Evaluated 5 Decision Vectors
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Arrival time",
              "Walking distance",
              "Transfer reliability",
              "Network conditions",
              "Your preferences",
            ].map((factor) => (
              <span
                key={factor}
                className="px-2.5 py-1 rounded-full bg-white border border-nova-border text-[12px] font-heading font-medium text-nova-text-secondary"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>

        {/* Simple Comparison Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Selected Option */}
          <div className="p-3.5 rounded-card border-2 border-nova-green bg-nova-green-soft/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-green">
                  Selected
                </span>
                <Check className="w-4 h-4 text-nova-green stroke-[3]" />
              </div>
              <p className="font-heading font-bold text-[22px] text-nova-text-primary mt-1">
                {whyNova.comparison.selected.time}
              </p>
              <p className="text-[12px] font-heading font-semibold text-nova-text-secondary mt-0.5">
                {whyNova.comparison.selected.tag}
              </p>
            </div>
            <p className="text-[12px] text-nova-text-muted mt-2 border-t border-nova-green/20 pt-1.5">
              {whyNova.comparison.selected.details}
            </p>
          </div>

          {/* Fastest Alternative */}
          <div className="p-3.5 rounded-card border border-nova-border bg-white flex flex-col justify-between shadow-2xs">
            <div>
              <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
                Fastest Alternative
              </span>
              <p className="font-heading font-bold text-[22px] text-nova-text-primary mt-1">
                {whyNova.comparison.fastest.time}
              </p>
              <p className="text-[12px] font-heading font-semibold text-nova-text-secondary mt-0.5">
                {whyNova.comparison.fastest.tag}
              </p>
            </div>
            <p className="text-[12px] text-nova-text-muted mt-2 border-t border-nova-border/40 pt-1.5">
              {whyNova.comparison.fastest.details}
            </p>
          </div>
        </div>

        {/* Confirmations List */}
        <div className="space-y-2 pt-1">
          {whyNova.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0 stroke-[2.2]" />
              <span className="text-[13px] font-heading font-medium text-nova-text-primary">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 space-y-2">
          <Button
            size="lg"
            fullWidth
            onClick={() => setWhyJourneySheetOpen(false)}
          >
            Got it
          </Button>

          <Button
            size="md"
            variant="secondary"
            fullWidth
            onClick={() => {
              setWhyJourneySheetOpen(false);
              showToast("Alternative routes displayed", "info");
            }}
          >
            View other routes
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
