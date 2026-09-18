"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sliders, ShieldCheck } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { NovaInsightCard } from "@/components/home/NovaInsightCard";
import { CityMobilityOverview } from "@/components/home/CityMobilityOverview";
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
      {/* Mobile-only AppHeader (Tablet and Desktop have rail/sidebar) */}
      <div className="md:hidden">
        <AppHeader />
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-6 lg:gap-8 pt-1 sm:pt-2">
        {/* Left / Primary Column: Planner & Immediate Action */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col space-y-4 sm:space-y-5">
          {/* Network Status Badge */}
          <div className="flex items-center justify-between">
            <StatusBadge />
            <button
              onClick={() => setPreferencesSheetOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-nova-border/70 hover:bg-nova-surface text-[12px] font-heading font-medium text-nova-text-secondary hover:text-nova-text-primary transition-colors shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 text-nova-green" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Greeting & Hero Heading */}
          <div className="pt-0.5">
            <p className="text-[14px] font-heading font-medium text-nova-text-secondary">
              Good morning
            </p>
            <h1 className="font-heading font-bold text-[26px] sm:text-[30px] lg:text-[34px] text-nova-text-primary tracking-tight leading-tight mt-0.5">
              Where would you like to go?
            </h1>
          </div>

          {/* Journey Planner Card (Preserved 100% interactive) */}
          <JourneyPlannerCard />

          {/* Active Travel Preference Indicator for Desktop */}
          <div className="hidden md:flex items-center justify-between p-3 rounded-xl bg-white border border-nova-border/60 text-[12px] font-heading">
            <span className="flex items-center gap-1.5 text-nova-text-secondary font-medium">
              <ShieldCheck className="w-4 h-4 text-nova-green" />
              <span>
                {preferences.stepFree
                  ? "Step-free verified"
                  : "Multimodal standard"}{" "}
                ·{" "}
                {preferences.reduceWalking
                  ? "Low walking (<5 min)"
                  : "Standard walking"}
              </span>
            </span>
            <button
              onClick={() => setPreferencesSheetOpen(true)}
              className="text-nova-green hover:underline font-semibold"
            >
              Change
            </button>
          </div>

          {/* Predictive NOVA Insight Card */}
          <NovaInsightCard />

          {/* Primary CTA */}
          <div className="pt-1">
            <Button
              size="lg"
              fullWidth
              onClick={handleFindJourney}
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-md shadow-nova-green/20"
            >
              Find my journey
            </Button>
          </div>
        </div>

        {/* Right / Secondary Column: City Mobility Overview (Tablet & Desktop) */}
        <div className="hidden md:block md:col-span-6 lg:col-span-7">
          <CityMobilityOverview />
        </div>
      </div>

      {/* Loading Overlay */}
      <PlanningLoadingOverlay />
    </main>
  );
}
