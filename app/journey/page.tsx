"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { JourneySummaryCard } from "@/components/journey/JourneySummaryCard";
import { JourneyGuardianCard } from "@/components/journey/JourneyGuardianCard";
import { RouteFlowBar } from "@/components/journey/RouteFlowBar";
import { ItineraryTimeline } from "@/components/journey/ItineraryTimeline";
import { TransferConfidenceCard } from "@/components/journey/TransferConfidenceCard";
import { AccessibilityRouteCard } from "@/components/journey/AccessibilityRouteCard";
import { WhyJourneySheet } from "@/components/journey/WhyJourneySheet";
import { JourneyRouteMap } from "@/components/journey/JourneyRouteMap";
import { Button } from "@/components/ui/Button";

export default function JourneyPage() {
  const router = useRouter();
  const { currentJourney, setWhyJourneySheetOpen, showToast } = useJourney();

  const handleStartJourney = () => {
    router.push("/live");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen relative pb-28 md:pb-8">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-nova-bg/95 backdrop-blur-md pb-3 pt-1 border-b border-nova-border/40 flex items-center justify-between mb-4">
        {/* Back Button */}
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
              From {currentJourney.origin} · Multimodal Synchronization
            </p>
          </div>
        </div>

        {/* More Actions */}
        <button
          onClick={() =>
            showToast(
              "Journey options: Share, Export itinerary, Cancel reservations",
              "info",
            )
          }
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          aria-label="More journey options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Responsive Main Layout: Mobile Stacked / Tablet & Desktop Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 7 cols / 55%, Mobile 100%): Information & Timeline */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Estimated Transit Summary */}
          <JourneySummaryCard />

          {/* Journey Guardian Live Monitoring */}
          <JourneyGuardianCard />

          {/* Route Flow Multi-Segment Bar (Mobile view) */}
          <div className="lg:hidden">
            <RouteFlowBar />
          </div>

          {/* Itinerary Details Interactive Timeline */}
          <ItineraryTimeline />

          {/* Mobile-only secondary cards */}
          <div className="flex flex-col space-y-4 lg:hidden">
            <TransferConfidenceCard />
            <AccessibilityRouteCard />

            {/* Why Did NOVA Choose This */}
            <button
              onClick={() => setWhyJourneySheetOpen(true)}
              className="w-full py-3.5 px-4 rounded-card bg-white hover:bg-[#FAF8FC] border border-nova-coral/30 shadow-2xs flex items-center justify-center gap-2 text-nova-coral hover:text-nova-coral-mid transition-all select-none active:scale-98 group"
            >
              <Sparkles className="w-4 h-4 text-nova-coral group-hover:rotate-12 transition-transform" />
              <span className="font-heading font-semibold text-[14px]">
                Why did NOVA choose this?
              </span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column (Desktop 5 cols / 45%, Hidden on mobile): Route Context Panel */}
        <div className="hidden lg:flex lg:col-span-5 flex-col space-y-4 sticky top-20">
          {/* Lightweight SVG Corridor Map */}
          <JourneyRouteMap />

          {/* Multi-Segment Flow Bar */}
          <RouteFlowBar />

          {/* Transfer Confidence Indicator */}
          <TransferConfidenceCard />

          {/* Accessibility Route Preference Card */}
          <AccessibilityRouteCard />

          {/* Why Did NOVA Choose This */}
          <button
            onClick={() => setWhyJourneySheetOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#FAF8FC] border border-nova-coral/30 shadow-2xs flex items-center justify-center gap-2 text-nova-coral hover:text-nova-coral-mid transition-all select-none active:scale-98 group"
          >
            <Sparkles className="w-4 h-4 text-nova-coral group-hover:rotate-12 transition-transform" />
            <span className="font-heading font-semibold text-[13px]">
              Why did NOVA choose this route?
            </span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Desktop Primary Start Journey CTA Card */}
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
              className="shadow-md shadow-nova-green/20 text-[16px] h-13"
            >
              Start journey
            </Button>
          </div>
        </div>
      </div>

      {/* Why This Journey Explanation Sheet */}
      <WhyJourneySheet />

      {/* Mobile Sticky Bottom CTA Bar (< 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-white/95 backdrop-blur-md border-t border-nova-border/80 px-4 pt-3 pb-5 shadow-dock">
        <div className="w-full max-w-[480px] flex flex-col space-y-2">
          {/* Status Row */}
          <div className="flex items-center justify-between text-[13px] font-heading font-medium">
            <span className="flex items-center gap-1.5 text-nova-green font-semibold">
              <span className="w-2 h-2 rounded-full bg-nova-green" />
              Ready to leave
            </span>
            <span className="text-nova-text-secondary">
              Departure {currentJourney.departureTime}
            </span>
          </div>

          {/* Primary Action Button */}
          <Button
            size="lg"
            fullWidth
            onClick={handleStartJourney}
            icon={<ArrowRight className="w-5 h-5" />}
            className="shadow-md shadow-nova-green/20"
          >
            Start journey
          </Button>
        </div>
      </div>
    </div>
  );
}
