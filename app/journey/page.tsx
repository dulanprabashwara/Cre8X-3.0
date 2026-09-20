"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Sparkles,
  Map,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { JourneySummaryCard } from "@/components/journey/JourneySummaryCard";
import { RouteFlowBar } from "@/components/journey/RouteFlowBar";
import { ItineraryTimeline } from "@/components/journey/ItineraryTimeline";
import { JourneyRouteMap } from "@/components/journey/JourneyRouteMap";
import { JourneyGuardianCard } from "@/components/journey/JourneyGuardianCard";
import { AccessibilityRouteCard } from "@/components/journey/AccessibilityRouteCard";
import { WhyJourneySheet } from "@/components/journey/WhyJourneySheet";
import { Button } from "@/components/ui/Button";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export default function JourneyPage() {
  const router = useRouter();
  const {
    currentJourney,
    selectedMethod,
    recommendedMethod,
    setWhyJourneySheetOpen,
    showToast,
  } = useJourney();
  const [mobileMapVisible, setMobileMapVisible] = useState(false);

  const isRecommended = selectedMethod === recommendedMethod;
  const selectedConfig = METHOD_CONFIGS[selectedMethod];
  const recommendedConfig = METHOD_CONFIGS[recommendedMethod];

  const handleStartJourney = () => {
    router.push("/live");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen relative pb-28 md:pb-8">
      {/* 1. Journey Header */}
      <header className="sticky top-0 z-30 bg-nova-bg/95 backdrop-blur-md pb-3 pt-1 border-b border-nova-border/40 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
            aria-label="Back to planner"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-heading font-bold text-[18px] sm:text-[22px] text-nova-text-primary leading-tight">
              {currentJourney.destination}
            </h1>
            <p className="text-[12px] sm:text-[13px] font-heading font-medium text-nova-text-secondary">
              From {currentJourney.origin} · Direct {selectedConfig.label}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            showToast(
              "Journey options: Share, Export itinerary, Boarding pass",
              "info",
            )
          }
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          aria-label="More journey options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main Responsive Grid Layout (Desktop: Left ~58%, Right ~42%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 58% / Mobile in-flow): Summary, Route Flow, Timeline */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* 2. Journey Summary Card */}
          <JourneySummaryCard />

          {/* 3. Route Flow Bar */}
          <RouteFlowBar />

          {/* 4. Itinerary Timeline */}
          <ItineraryTimeline />

          {/* Mobile-only: Compact Guardian, Accessibility, Why NOVA, CTA, and Map toggle */}
          <div className="lg:hidden flex flex-col space-y-4 pt-2">
            {/* 5. Compact Journey Guardian */}
            <JourneyGuardianCard />

            {/* 6. Compact Accessibility Status */}
            <AccessibilityRouteCard />

            {/* 7. Why NOVA Recommendation Button */}
            <button
              type="button"
              onClick={() => setWhyJourneySheetOpen(true)}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-nova-coral-soft border border-nova-coral/30 hover:bg-nova-coral-soft/80 text-nova-coral font-heading font-semibold text-[13px] flex items-center justify-between transition-colors shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {isRecommended
                    ? `Why NOVA recommends ${selectedConfig.label}`
                    : `Why NOVA recommends ${recommendedConfig.label}`}
                </span>
              </span>
              <span className="text-[12px] font-heading font-bold uppercase tracking-wider">
                Learn why &rarr;
              </span>
            </button>

            {/* Mobile Map Toggle Option */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setMobileMapVisible(!mobileMapVisible)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-secondary hover:text-nova-text-primary text-[13px] font-heading font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-nova-green" />
                  <span>
                    {mobileMapVisible ? "Hide corridor map" : "View corridor map"}
                  </span>
                </span>
                {mobileMapVisible ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {mobileMapVisible && (
                <div className="mt-3 animate-in fade-in duration-200">
                  <JourneyRouteMap />
                </div>
              )}
            </div>

            {/* 8. Mobile Primary CTA */}
            <div className="bg-white rounded-panel border border-nova-border/70 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-[13px] font-heading font-medium">
                <span className="flex items-center gap-1.5 text-nova-green font-semibold">
                  <span className="w-2 h-2 rounded-full bg-nova-green animate-pulse" />
                  Ready to leave
                </span>
                <span className="text-nova-text-secondary">
                  Departure {currentJourney.departureTime}
                </span>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handleStartJourney}
                icon={<ArrowRight className="w-5 h-5" />}
                className="shadow-md shadow-nova-green/20 text-[16px] h-13 min-h-[52px]"
              >
                Start journey
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop ~42%, Hidden on Mobile): Map, Guardian, Accessibility, Why NOVA, CTA */}
        <div className="hidden lg:flex lg:col-span-5 flex-col space-y-4 lg:sticky lg:top-20">
          <JourneyRouteMap />

          <JourneyGuardianCard />

          <AccessibilityRouteCard />

          <button
            type="button"
            onClick={() => setWhyJourneySheetOpen(true)}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-nova-coral-soft border border-nova-coral/30 hover:bg-nova-coral-soft/80 text-nova-coral font-heading font-semibold text-[13px] flex items-center justify-between transition-colors shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {isRecommended
                  ? `Why NOVA recommends ${selectedConfig.label}`
                  : `Why NOVA recommends ${recommendedConfig.label}`}
              </span>
            </span>
            <span className="text-[12px] font-heading font-bold uppercase tracking-wider">
              Learn why &rarr;
            </span>
          </button>

          <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-[13px] font-heading font-medium">
              <span className="flex items-center gap-1.5 text-nova-green font-semibold">
                <span className="w-2 h-2 rounded-full bg-nova-green animate-pulse" />
                Ready to leave
              </span>
              <span className="text-nova-text-secondary">
                Departure {currentJourney.departureTime}
              </span>
            </div>

            <Button
              size="lg"
              fullWidth
              onClick={handleStartJourney}
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-md shadow-nova-green/20 text-[16px] h-13 min-h-[52px]"
            >
              Start journey
            </Button>
          </div>
        </div>
      </div>

      {/* Why NOVA Chose This Route Sheet */}
      <WhyJourneySheet />
    </div>
  );
}
