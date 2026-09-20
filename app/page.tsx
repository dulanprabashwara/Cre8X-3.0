"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sliders, ShieldCheck } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { PlanningLoadingOverlay } from "@/components/home/PlanningLoadingOverlay";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export default function HomePage() {
  const router = useRouter();
  const { startPlanning, setPreferencesSheetOpen, preferences } = useJourney();

  const handleFindJourney = () => {
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="md:hidden">
        <AppHeader />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 md:px-8">
        <div className="w-full max-w-[640px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="lg:hidden">
              <StatusBadge />
            </div>
            <button
              type="button"
              onClick={() => setPreferencesSheetOpen(true)}
              className="ml-auto inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-full bg-white border border-nova-border/70 text-[12px] font-heading font-medium text-nova-text-secondary transition-colors hover:bg-nova-surface"
            >
              <Sliders className="w-3.5 h-3.5 text-nova-green" />
              Preferences
            </button>
          </div>

          <div className="mb-4">
            <p className="text-[13px] font-heading font-medium uppercase tracking-[0.14em] text-nova-text-muted">
              Plan a trip
            </p>
            <h1 className="mt-2 font-heading text-[28px] font-bold tracking-tight text-nova-text-primary sm:text-[34px]">
              Move through the city with less friction.
            </h1>
          </div>

          <JourneyPlannerCard />

          <div className="mt-4 flex items-center justify-between rounded-xl border border-nova-border/60 bg-white px-3 py-2.5 text-[12px] text-nova-text-secondary">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-nova-green" />
              {preferences.stepFree ? "Step-free route" : "Standard route"}
            </span>
            <button
              type="button"
              onClick={() => setPreferencesSheetOpen(true)}
              className="font-heading font-semibold text-nova-green"
            >
              Edit
            </button>
          </div>

          <div className="mt-5">
            <Button
              size="lg"
              fullWidth
              onClick={handleFindJourney}
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-sm shadow-nova-green/20"
            >
              Find my journey
            </Button>
          </div>
        </div>
      </div>

      <PlanningLoadingOverlay />
    </main>
  );
}
