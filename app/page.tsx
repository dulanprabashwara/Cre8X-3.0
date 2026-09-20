"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sliders } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { NovaInsightCard } from "@/components/home/NovaInsightCard";
import { NovaJourneyPreview } from "@/components/home/NovaJourneyPreview";
import { PlanningLoadingOverlay } from "@/components/home/PlanningLoadingOverlay";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export default function HomePage() {
  const router = useRouter();
  const { startPlanning, setPreferencesSheetOpen } = useJourney();

  const handleFindJourney = () => {
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col w-full max-w-[1240px] mx-auto lg:justify-center py-1 sm:py-2">
      {/* Mobile-only AppHeader */}
      <div className="md:hidden mb-2">
        <AppHeader />
      </div>

      {/* Main Responsive Grid Layout (>= 1024px: 58% / 42% composition) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2 sm:py-4 my-auto lg:my-auto">
        {/* Left Column: Primary Journey Planner (~58-60%) */}
        <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 max-w-[650px] w-full">
          {/* Top Bar on Tablet */}
          <div className="hidden md:flex lg:hidden items-center justify-between gap-3">
            <StatusBadge />
            <button
              type="button"
              onClick={() => setPreferencesSheetOpen(true)}
              className="ml-auto inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-full bg-white border border-nova-border/70 text-[12px] font-heading font-medium text-nova-text-secondary transition-colors hover:bg-nova-surface shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 text-nova-green" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Task-oriented Heading */}
          <div>
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-text-muted">
              Plan a trip
            </p>
            <h1 className="mt-1.5 font-heading text-[28px] sm:text-[34px] font-bold tracking-tight text-nova-text-primary leading-tight">
              Where would you like to go?
            </h1>
          </div>

          {/* Simplified Planner Card */}
          <JourneyPlannerCard />

          {/* Primary CTA Button */}
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

          {/* Compact NOVA Insight Strip */}
          <NovaInsightCard />
        </div>

        {/* Right Column: Calm, Non-interactive Preview (~40-42%, Desktop only) */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-6">
          <NovaJourneyPreview />
        </div>
      </div>

      <PlanningLoadingOverlay />
    </main>
  );
}
