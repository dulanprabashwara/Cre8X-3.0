"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { JourneyPlannerCard } from "@/components/home/JourneyPlannerCard";
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
    <main className="flex-1 flex flex-col w-full max-w-[720px] mx-auto justify-center py-1 sm:py-2">
      {/* Mobile-only AppHeader */}
      <div className="md:hidden mb-2">
        <AppHeader />
      </div>

      <div className="w-full py-2 sm:py-4">
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <div>
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-text-muted">
              Plan a trip
            </p>
            <h1 className="mt-1.5 font-heading text-[28px] sm:text-[34px] font-bold tracking-tight text-nova-text-primary leading-tight">
              Set your journey
            </h1>
          </div>

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

        </div>
      </div>

      <PlanningLoadingOverlay />
    </main>
  );
}
