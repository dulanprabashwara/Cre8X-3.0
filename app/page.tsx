"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { PlanningLoadingOverlay } from "@/components/home/PlanningLoadingOverlay";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { currentJourney, startPlanning } = useJourney();
  const stops = [
    currentJourney.origin,
    ...currentJourney.segments.map((segment) => segment.destinationStation),
  ];

  const handleFindJourney = () => {
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col w-full max-w-[1120px] mx-auto justify-center py-1 sm:py-2">
      {/* Mobile-only AppHeader */}
      <div className="md:hidden mb-2">
        <AppHeader />
      </div>

      <div className="w-full py-2 sm:py-4">
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col space-y-4 sm:space-y-5 lg:col-span-7">
            <div>
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-text-muted">
                Plan a trip
              </p>
              <h1 className="mt-1.5 font-heading text-[28px] sm:text-[34px] font-bold tracking-tight text-nova-text-primary leading-tight">
                Set your journey
              </h1>
            </div>

            <JourneyPlannerCard />

            <Button
              size="lg"
              fullWidth
              onClick={handleFindJourney}
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              iconPosition="right-edge"
              className="h-[56px] min-h-[56px] rounded-[16px] px-5 sm:px-6 bg-nova-green hover:bg-nova-green-hover text-white text-[16px] font-heading font-semibold shadow-[0_4px_16px_rgba(47,174,99,0.28)] hover:shadow-[0_6px_20px_rgba(47,174,99,0.36)] active:bg-nova-green-hover transition-all"
            >
              Find my journey
            </Button>
          </div>

          <section className="w-full rounded-card border border-nova-border/70 bg-white p-4 sm:p-5 shadow-card lg:col-span-5" aria-labelledby="itinerary-heading">
            <h2 id="itinerary-heading" className="font-heading text-[16px] font-bold text-nova-text-primary">
              Itinerary
            </h2>
            <div className="mt-4 space-y-0">
              {stops.map((stop, index) => (
                <div key={`${stop}-${index}`} className="flex min-h-10 items-stretch gap-3">
                  <div className="flex w-3 flex-col items-center">
                    <span className={cn("mt-1.5 h-3 w-3 rounded-full border-2 bg-white", index === 0 ? "border-nova-green" : index === stops.length - 1 ? "border-nova-coral" : "border-nova-text-secondary")} />
                    {index < stops.length - 1 && <span className="w-px flex-1 bg-nova-border" />}
                  </div>
                  <p className="pb-3 text-[14px] font-heading font-medium text-nova-text-primary">
                    {stop}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <PlanningLoadingOverlay />
    </main>
  );
}
