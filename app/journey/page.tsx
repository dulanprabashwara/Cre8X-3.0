"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, MoreVertical } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { JourneySummaryCard } from "@/components/journey/JourneySummaryCard";
import { RouteFlowBar } from "@/components/journey/RouteFlowBar";
import { ItineraryTimeline } from "@/components/journey/ItineraryTimeline";
import { JourneyRouteMap } from "@/components/journey/JourneyRouteMap";
import { Button } from "@/components/ui/Button";

export default function JourneyPage() {
  const router = useRouter();
  const { currentJourney, showToast } = useJourney();

  const handleStartJourney = () => {
    router.push("/live");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen relative pb-28 md:pb-8">
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
              From {currentJourney.origin}
            </p>
          </div>
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <JourneyRouteMap />
          <RouteFlowBar />
        </div>

        <div className="lg:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-20">
          <JourneySummaryCard />
          <ItineraryTimeline />

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
    </div>
  );
}
