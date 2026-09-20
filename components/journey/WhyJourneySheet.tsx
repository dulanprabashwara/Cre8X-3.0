"use client";

import React, { useMemo } from "react";
import {
  Sparkles,
  Check,
  CarFront,
  TrainFront,
  Plane,
  BusFront,
} from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";
import {
  METHOD_CONFIGS,
  TravelMethod,
  PLANNER_LOCATIONS,
  calculateMethodEstimates,
} from "@/lib/journeyPlanner";
import { cn } from "@/lib/utils";

export function WhyJourneySheet() {
  const {
    whyJourneySheetOpen,
    setWhyJourneySheetOpen,
    currentJourney,
    selectedMethod,
    recommendedMethod,
    userHasOverriddenMethod,
    setSelectedMethod,
    origin,
    destination,
    departureTime,
    preferences,
  } = useJourney();

  const { whyNova } = currentJourney;
  const isRecommended = selectedMethod === recommendedMethod;
  const selectedConfig = METHOD_CONFIGS[selectedMethod];
  const recommendedConfig = METHOD_CONFIGS[recommendedMethod];

  // Destination Planner Location
  const destPlannerLoc = useMemo(() => {
    return (
      PLANNER_LOCATIONS.find((l) => l.id === destination.id) || {
        id: destination.id,
        name: destination.name,
        district: destination.district,
        terminal: "Terminal Concourse",
        supportedMethods: ["rail", "pod", "aero", "road"] as TravelMethod[],
      }
    );
  }, [destination]);

  const estimates = useMemo(() => {
    return calculateMethodEstimates(
      origin,
      destPlannerLoc,
      departureTime,
      preferences,
    );
  }, [origin, destPlannerLoc, departureTime, preferences]);

  const methodsList: {
    id: TravelMethod;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "rail", label: "HyperRail", icon: TrainFront },
    { id: "pod", label: "Autonomous Pod", icon: CarFront },
    { id: "aero", label: "AeroLink", icon: Plane },
    { id: "road", label: "Smart Road", icon: BusFront },
  ];

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
            <Sparkles className="w-3.5 h-3.5" />
            NOVA Routing Intelligence
          </span>
          <p className="text-[14px] text-nova-text-primary leading-relaxed font-medium">
            {whyNova.summary}
          </p>
        </div>

        {/* Evaluation Factors Tags */}
        <div>
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted mb-2 block">
            Evaluated Decision Factors
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Speed & punctuality",
              "Weather immunity",
              "Zero intermediate transfers",
              "Step-free ease",
              "Network conditions",
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

        {/* Method Comparison Grid */}
        <div>
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted mb-2 block">
            Method Comparison For This Route
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {methodsList.map((m) => {
              const Icon = m.icon;
              const est = estimates[m.id];
              const isCurrSelected = selectedMethod === m.id;
              const isCurrRec = recommendedMethod === m.id;

              return (
                <div
                  key={m.id}
                  className={cn(
                    "p-3.5 rounded-xl border flex flex-col justify-between transition-all",
                    isCurrSelected
                      ? "border-2 border-nova-green bg-nova-green-soft/50 shadow-2xs"
                      : "border-nova-border bg-white",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center",
                          isCurrSelected
                            ? "bg-nova-green text-white"
                            : "bg-nova-surface text-nova-text-secondary",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-[14px] text-nova-text-primary leading-none">
                          {m.label}
                        </h4>
                        <span className="text-[12px] font-heading font-medium text-nova-text-secondary">
                          {est?.durationMinutes} min
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {isCurrSelected && (
                        <span className="text-[12px] font-heading font-bold text-nova-green bg-white px-2 py-0.5 rounded-md border border-nova-green/40">
                          Selected
                        </span>
                      )}
                      {isCurrRec && (
                        <span className="text-[12px] font-heading font-bold text-nova-coral bg-nova-coral-soft px-2 py-0.5 rounded-md border border-nova-coral/30">
                          ✦ Recommended
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[12px] text-nova-text-secondary mt-2.5 pt-2 border-t border-nova-border/50">
                    {est?.statusNote}
                  </p>

                  {!isCurrSelected && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMethod(m.id);
                        setWhyJourneySheetOpen(false);
                      }}
                      className="mt-2 min-h-[44px] w-full rounded-lg bg-[#FAF8FC] hover:bg-nova-surface border border-nova-border text-[12px] font-heading font-semibold text-nova-text-primary transition-colors"
                    >
                      Switch to {m.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights List */}
        <div className="p-4 rounded-card bg-white border border-nova-border/80 space-y-2">
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted block">
            Guardian Assurances
          </span>
          <div className="space-y-1.5">
            {whyNova.highlights.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-[13px] font-heading font-medium text-nova-text-primary"
              >
                <Check className="w-3.5 h-3.5 text-nova-green shrink-0 stroke-[2.5]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Close Button */}
        <Button
          size="lg"
          fullWidth
          onClick={() => setWhyJourneySheetOpen(false)}
          className="min-h-[44px]"
        >
          Got it
        </Button>
      </div>
    </Sheet>
  );
}
