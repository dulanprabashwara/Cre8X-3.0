"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  CarFront,
  TrainFront,
  Plane,
  BusFront,
  Sparkles,
} from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { PlanningLoadingOverlay } from "@/components/home/PlanningLoadingOverlay";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const {
    currentJourney,
    startPlanning,
    selectedMethod,
    recommendedMethod,
    origin,
    destination,
  } = useJourney();

  const [isSameLocation, setIsSameLocation] = useState(false);

  const handleFindJourney = () => {
    if (isSameLocation) return;
    startPlanning(() => {
      router.push("/journey");
    });
  };

  const MethodIcon =
    selectedMethod === "pod"
      ? CarFront
      : selectedMethod === "rail"
        ? TrainFront
        : selectedMethod === "aero"
          ? Plane
          : BusFront;

  const config = METHOD_CONFIGS[selectedMethod];
  const isRecommended = selectedMethod === recommendedMethod;

  return (
    <main className="flex-1 flex flex-col w-full max-w-[1120px] mx-auto justify-center py-1 sm:py-2">
      {/* Mobile-only AppHeader */}
      <div className="md:hidden mb-1">
        <AppHeader />
      </div>

      <div className="w-full py-1 sm:py-4">
        <div className="grid items-start gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Planner Controls & Primary CTA */}
          <div className="flex flex-col space-y-3 sm:space-y-5 lg:col-span-7">
            <div>
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-text-muted">
                Plan a trip
              </p>
              <h1 className="mt-0.5 sm:mt-1.5 font-heading text-[24px] sm:text-[34px] font-bold tracking-tight text-nova-text-primary leading-tight">
                Set your journey
              </h1>
            </div>

            <JourneyPlannerCard onSameLocationChange={setIsSameLocation} />

            <Button
              size="lg"
              fullWidth
              disabled={isSameLocation}
              onClick={handleFindJourney}
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              iconPosition="right-edge"
              className={cn(
                "h-[52px] sm:h-[56px] min-h-[52px] sm:min-h-[56px] rounded-[16px] px-5 sm:px-6 text-white text-[15px] sm:text-[16px] font-heading font-semibold transition-all",
                isSameLocation
                  ? "bg-gray-300 cursor-not-allowed opacity-60 shadow-none"
                  : "bg-nova-green hover:bg-nova-green-hover shadow-[0_4px_16px_rgba(47,174,99,0.28)] hover:shadow-[0_6px_20px_rgba(47,174,99,0.36)] active:bg-nova-green-hover",
              )}
            >
              {isSameLocation ? "Choose a different destination" : "Find my journey"}
            </Button>
          </div>

          {/* Right Column: Dynamic Single-Method Journey Preview */}
          <section
            className="w-full rounded-card border border-nova-border/70 bg-white p-5 shadow-card lg:col-span-5 space-y-4"
            aria-labelledby="preview-heading"
          >
            <div className="flex items-center justify-between pb-1 border-b border-nova-border/40">
              <h2
                id="preview-heading"
                className="font-heading text-[16px] font-bold text-nova-text-primary"
              >
                Journey Preview
              </h2>
              <span className="text-[12px] font-heading font-semibold text-nova-green px-2.5 py-0.5 rounded-full bg-nova-green-soft border border-nova-green/30">
                Direct route
              </span>
            </div>

            {/* Timing Strip */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8FC] border border-nova-border/60">
              <div>
                <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider block">
                  Departure & Arrival
                </span>
                <span className="font-heading font-bold text-[20px] text-nova-text-primary">
                  {currentJourney.departureTime} → {currentJourney.arrivalTime}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[12px] font-heading font-semibold text-nova-text-muted uppercase tracking-wider block">
                  Duration
                </span>
                <span className="font-heading font-bold text-[20px] text-nova-green">
                  {currentJourney.durationMinutes} min
                </span>
              </div>
            </div>

            {/* Direct Corridor Visualizer */}
            <div className="relative pl-6 space-y-4 pt-1">
              {/* Vertical connector line */}
              <div className="absolute left-[7px] top-2 bottom-3 w-0.5 bg-gradient-to-b from-nova-green via-nova-coral-mid to-nova-coral rounded-full" />

              {/* Origin Stop */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-nova-green bg-white ring-4 ring-white" />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-[15px] text-nova-text-primary">
                      {currentJourney.origin}
                    </h3>
                    <span className="text-[12px] font-heading font-semibold text-nova-green">
                      {currentJourney.departureTime}
                    </span>
                  </div>
                  <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
                    {currentJourney.originDetail}
                  </p>
                </div>
              </div>

              {/* Transit Method Card */}
              <div className="p-3.5 rounded-xl border border-nova-border/80 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-nova-green-soft text-nova-green flex items-center justify-center">
                      <MethodIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[14px] text-nova-text-primary leading-none">
                        {config.label}
                      </h4>
                      <span className="text-[12px] font-heading text-nova-text-secondary">
                        {config.vehicleName}
                      </span>
                    </div>
                  </div>

                  {isRecommended ? (
                    <span className="inline-flex items-center gap-1 text-[12px] font-heading font-bold text-nova-coral bg-nova-coral-soft/80 px-2 py-0.5 rounded-full border border-nova-coral/30">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </span>
                  ) : (
                    <span className="text-[12px] font-heading font-medium text-nova-text-secondary bg-[#FAF8FC] px-2 py-0.5 rounded-full border border-nova-border">
                      Your choice
                    </span>
                  )}
                </div>

                <div className="text-[12px] text-nova-text-secondary bg-[#FAF8FC] p-2 rounded-lg border border-nova-border/50 flex items-center justify-between">
                  <span>Non-stop service</span>
                  <span className="font-heading font-semibold text-nova-text-primary">
                    Zero transfers
                  </span>
                </div>
              </div>

              {/* Destination Stop */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-nova-coral bg-white ring-4 ring-white" />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-[15px] text-nova-text-primary">
                      {currentJourney.destination}
                    </h3>
                    <span className="text-[12px] font-heading font-semibold text-nova-coral">
                      {currentJourney.arrivalTime}
                    </span>
                  </div>
                  <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
                    {currentJourney.destinationDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* Assurances Footer */}
            <div className="pt-3 border-t border-nova-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-[12px] font-heading font-medium text-nova-text-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-nova-green shrink-0" />
                <span>Step-free ramp and boarding confirmed</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-heading font-medium text-nova-text-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-nova-green shrink-0" />
                <span>Journey Guardian monitoring active</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <PlanningLoadingOverlay />
    </main>
  );
}
