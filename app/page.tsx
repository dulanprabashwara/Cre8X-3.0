"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BottomNav } from "@/components/shared/BottomNav";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
import { NovaInsightCard } from "@/components/home/NovaInsightCard";
import { DestinationSearchSheet } from "@/components/home/DestinationSearchSheet";
import { JourneyPreferencesSheet } from "@/components/home/JourneyPreferencesSheet";
import { VoiceSearchModal } from "@/components/shared/VoiceSearchModal";
import { PlanningLoadingOverlay } from "@/components/home/PlanningLoadingOverlay";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export default function HomePage() {
  const router = useRouter();
  const { startPlanning } = useJourney();

  const handleFindJourney = () => {
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col pb-28">
      {/* Top Header */}
      <AppHeader />

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-2 flex flex-col space-y-5">
        {/* Network Status Badge */}
        <div>
          <StatusBadge />
        </div>

        {/* Greeting & Hero Heading */}
        <div className="pt-1">
          <p className="text-[14px] font-heading font-medium text-nova-text-secondary">
            Good morning
          </p>
          <h1 className="font-heading font-bold text-[28px] sm:text-[32px] text-nova-text-primary tracking-tight leading-tight mt-0.5">
            Where would you like to go?
          </h1>
        </div>

        {/* Journey Planner Card */}
        <JourneyPlannerCard />

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

      {/* Overlays & Bottom Sheets */}
      <DestinationSearchSheet />
      <JourneyPreferencesSheet />
      <VoiceSearchModal />
      <PlanningLoadingOverlay />

      {/* Floating Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
