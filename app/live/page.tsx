"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical, Radio } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { LiveMap } from "@/components/live/LiveMap";
import { InstructionModeView } from "@/components/live/InstructionModeView";
import { LiveJourneySheet } from "@/components/live/LiveJourneySheet";
import { AssistanceSheet } from "@/components/live/AssistanceSheet";
import { MobilityConfirmationDialog } from "@/components/live/MobilityConfirmationDialog";

export default function LivePage() {
  const router = useRouter();
  const {
    liveMode,
    triggerApproachingTransfer,
    triggerNetworkChange,
    showToast,
  } = useJourney();

  // Automatic simulation progression for presentation / judge review
  useEffect(() => {
    const timerTransfer = setTimeout(() => {
      triggerApproachingTransfer();
    }, 18000);

    const timerNetwork = setTimeout(() => {
      triggerNetworkChange();
    }, 36000);

    return () => {
      clearTimeout(timerTransfer);
      clearTimeout(timerNetwork);
    };
  }, [triggerApproachingTransfer, triggerNetworkChange]);

  return (
    <div className="flex-1 flex flex-col min-h-screen relative bg-nova-bg">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 pt-4 pb-3 border-b border-nova-border/50 flex items-center justify-between">
        {/* Back button */}
        <button
          onClick={() => router.push("/journey")}
          className="w-10 h-10 rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          aria-label="Back to journey details"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Live Journey Title & Connected State */}
        <div className="text-center">
          <h1 className="font-heading font-bold text-[18px] text-nova-text-primary leading-tight">
            Live journey
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-[12px] font-heading font-semibold text-nova-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nova-green" />
            </span>
            <span>Connected</span>
          </div>
        </div>

        {/* More options button */}
        <button
          onClick={() =>
            showToast("Telemetry: Connected via Sri Lanka Smart Urban Transit Mesh", "info")
          }
          className="w-10 h-10 rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          aria-label="More live options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main View Area: Map or Instructions */}
      <main className="flex-1 flex flex-col relative">
        {liveMode === "map" ? <LiveMap /> : <InstructionModeView />}

        {/* Bottom Sheet Information */}
        <div className="mt-auto">
          <LiveJourneySheet />
        </div>
      </main>

      {/* Assistance & Confirmation Overlays */}
      <AssistanceSheet />
      <MobilityConfirmationDialog />
    </div>
  );
}
