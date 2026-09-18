"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  Route,
  Headphones,
  Sliders,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useJourney } from "@/context/JourneyContext";
import { LiveMap } from "@/components/live/LiveMap";
import { InstructionModeView } from "@/components/live/InstructionModeView";
import { LiveJourneySheet } from "@/components/live/LiveJourneySheet";
import { AssistanceSheet } from "@/components/live/AssistanceSheet";
import { MobilityConfirmationDialog } from "@/components/live/MobilityConfirmationDialog";
import { JourneyPreferencesSheet } from "@/components/home/JourneyPreferencesSheet";

export default function LivePage() {
  const router = useRouter();
  const {
    liveMode,
    triggerApproachingTransfer,
    triggerNetworkChange,
    setPreferencesSheetOpen,
    showToast,
  } = useJourney();

  const [menuOpen, setMenuOpen] = useState(false);

  // Automatic simulation progression for competition review:
  // 0 sec: Live Journey opens normally
  // 8 sec: Approaching transfer state
  // 16 sec: Network change appears (remains until passenger acts)
  useEffect(() => {
    const timerTransfer = setTimeout(() => {
      triggerApproachingTransfer();
    }, 8000);

    const timerNetwork = setTimeout(() => {
      triggerNetworkChange();
    }, 16000);

    return () => {
      clearTimeout(timerTransfer);
      clearTimeout(timerNetwork);
    };
  }, [triggerApproachingTransfer, triggerNetworkChange]);

  return (
    <div className="flex-1 flex flex-col min-h-screen relative bg-nova-bg">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 pt-3.5 pb-3 border-b border-nova-border/50 flex items-center justify-between">
        {/* Back button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/journey")}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
            aria-label="Back to journey details"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-heading font-bold text-[18px] sm:text-[20px] text-nova-text-primary leading-tight">
              Live journey
            </h1>
            <p className="hidden sm:block text-[12px] font-heading font-medium text-nova-text-secondary">
              Active Multimodal Corridor Telemetry
            </p>
          </div>
        </div>

        {/* Live Journey Title & Connected State */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-nova-green-soft border border-nova-green/40 text-[12px] font-heading font-semibold text-nova-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nova-green" />
            </span>
            <span>Connected</span>
          </div>

          {/* More options button with passenger-appropriate menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
              aria-label="Journey options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Passenger Options Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-52 bg-white rounded-card shadow-dock border border-nova-border p-1.5 space-y-1"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/journey");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[14px] font-heading font-medium text-nova-text-primary hover:bg-nova-surface rounded-xl transition-colors text-left"
                    >
                      <Route className="w-4 h-4 text-nova-green" />
                      <span>Journey details</span>
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        showToast(
                          "Audio guidance active for next transfer",
                          "info",
                        );
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[14px] font-heading font-medium text-nova-text-primary hover:bg-nova-surface rounded-xl transition-colors text-left"
                    >
                      <Headphones className="w-4 h-4 text-nova-green" />
                      <span>Audio guidance</span>
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setPreferencesSheetOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[14px] font-heading font-medium text-nova-text-primary hover:bg-nova-surface rounded-xl transition-colors text-left"
                    >
                      <Sliders className="w-4 h-4 text-nova-green" />
                      <span>Journey preferences</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Responsive View: Mobile Vertical Stack / Desktop 62/38 True Split-Screen */}
      <main className="flex-1 flex flex-col lg:flex-row relative">
        {/* Left Column (Desktop 62% / Mobile top): Map or Turn-by-Turn View */}
        <div className="flex-1 lg:w-[62%] relative">
          {liveMode === "map" ? <LiveMap /> : <InstructionModeView />}
        </div>

        {/* Right Column (Desktop 38% / Mobile bottom sheet): Live Guidance Panel */}
        <div className="w-full lg:w-[38%] mt-auto lg:mt-0 bg-white lg:border-l border-nova-border/70 overflow-y-auto lg:max-h-[calc(100vh-75px)] shadow-xs">
          <LiveJourneySheet />
        </div>
      </main>

      {/* Assistance, Confirmation & Preferences Overlays */}
      <AssistanceSheet />
      <MobilityConfirmationDialog />
      <JourneyPreferencesSheet />
    </div>
  );
}
