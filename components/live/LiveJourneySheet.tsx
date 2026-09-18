"use client";

import React from "react";
import {
  Footprints,
  CheckCircle2,
  Headphones,
  Volume2,
  ArrowRightLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { ApproachingTransferBanner } from "./ApproachingTransferBanner";
import { NetworkChangeCard } from "./NetworkChangeCard";

export function LiveJourneySheet() {
  const {
    liveState,
    simulationPhase,
    setAssistanceSheetOpen,
    triggerApproachingTransfer,
    triggerNetworkChange,
    resetSimulation,
    showToast,
  } = useJourney();

  const handleRepeatInstruction = () => {
    showToast(
      `“${liveState.nextAction.title}. ${liveState.nextAction.description}.”`,
      "info"
    );
  };

  return (
    <div className="w-full bg-white rounded-t-sheet shadow-sheet border-t border-nova-border/70 p-5 pb-8 space-y-4 relative z-20">
      {/* Top Drag Pill */}
      <div className="w-full flex justify-center -mt-2 mb-1">
        <div className="w-12 h-1 bg-nova-border rounded-full" />
      </div>

      {/* Header Info Area */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Green Vehicle Pill Badge */}
          <span className="px-3 py-1 rounded-full bg-nova-green-soft border border-nova-green/40 text-[12px] font-heading font-bold text-nova-green uppercase tracking-wider">
            {liveState.vehicleCode}
          </span>
          <span className="font-heading font-semibold text-[16px] text-nova-text-primary">
            to {liveState.destination}
          </span>
        </div>

        {/* Minutes Remaining */}
        <div className="flex items-baseline gap-1">
          <span className="font-heading font-bold text-[24px] text-nova-text-primary leading-none">
            {liveState.minutesRemaining}
          </span>
          <span className="font-heading text-[13px] font-medium text-nova-text-muted">
            min
          </span>
        </div>
      </div>

      {/* Route Progress Bar (Green to Coral Gradient) */}
      <div className="w-full h-1.5 bg-nova-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-nova-green via-nova-coral-mid to-nova-coral transition-all duration-700"
          style={{ width: `${liveState.progressPercent}%` }}
        />
      </div>

      {/* Approaching Transfer Notice (if in approaching phase) */}
      {simulationPhase === "approaching_transfer" && (
        <ApproachingTransferBanner />
      )}

      {/* Network Change Card (Signature AI Wow Interaction) */}
      <NetworkChangeCard />

      {/* Main Card: NEXT IMMEDIATE ACTION */}
      <div className="w-full p-4 rounded-card bg-[#FAF8FC] border border-nova-border/70 shadow-2xs">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-heading font-bold text-nova-green tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-nova-green" />
              <span>Next Immediate Action</span>
            </div>

            {/* Instruction Title */}
            <h3 className="font-heading font-bold text-[19px] text-nova-text-primary leading-tight mt-1">
              {liveState.nextAction.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[14px] text-nova-text-secondary mt-0.5">
              {liveState.nextAction.description}
            </p>
          </div>

          {/* Transfer Icon */}
          <div className="w-12 h-12 rounded-xl bg-nova-green-soft border border-nova-green/30 text-nova-green flex items-center justify-center shrink-0 shadow-2xs">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-nova-divider my-3" />

        {/* Secured connection verification */}
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-1.5 text-nova-text-primary font-heading font-medium">
            <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0 stroke-[2.2]" />
            <span>{liveState.nextAction.securedConnection}</span>
          </div>

          <span className="px-2.5 py-1 rounded-md bg-white border border-nova-border text-nova-text-secondary text-[12px] font-heading font-medium">
            {liveState.nextAction.walkingTimeTag}
          </span>
        </div>
      </div>

      {/* 3-Column Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Current */}
        <div className="p-3 rounded-xl bg-white border border-nova-border/80 shadow-2xs flex flex-col justify-between min-h-[72px]">
          <span className="text-[10px] font-heading font-bold tracking-wider text-nova-text-muted uppercase">
            Current
          </span>
          <div>
            <h5 className="font-heading font-bold text-[14px] text-nova-text-primary leading-tight">
              {liveState.vehicleCode}
            </h5>
            <p className="text-[12px] text-nova-text-secondary mt-0.5">
              {liveState.car}
            </p>
          </div>
        </div>

        {/* Next Stop */}
        <div className="p-3 rounded-xl bg-white border border-nova-border/80 shadow-2xs flex flex-col justify-between min-h-[72px]">
          <span className="text-[10px] font-heading font-bold tracking-wider text-nova-text-muted uppercase">
            Next Stop
          </span>
          <div>
            <h5 className="font-heading font-bold text-[14px] text-nova-text-primary leading-tight">
              {liveState.nextStop}
            </h5>
            <p className="text-[12px] text-nova-text-secondary mt-0.5">
              {liveState.nextStopPlatform}
            </p>
          </div>
        </div>

        {/* Estimated */}
        <div className="p-3 rounded-xl bg-white border border-nova-border/80 shadow-2xs flex flex-col justify-between min-h-[72px]">
          <span className="text-[10px] font-heading font-bold tracking-wider text-nova-text-muted uppercase">
            Estimated
          </span>
          <div>
            <h5 className="font-heading font-bold text-[14px] text-nova-text-primary leading-tight">
              {liveState.estimatedArrival}
            </h5>
            <p className="text-[12px] font-heading font-semibold text-nova-green mt-0.5">
              On schedule
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => setAssistanceSheetOpen(true)}
          className="h-12 rounded-xl bg-white hover:bg-nova-surface border border-nova-border shadow-2xs flex items-center justify-center gap-2 text-[14px] font-heading font-semibold text-nova-text-primary transition-colors active:scale-98"
        >
          <Headphones className="w-4 h-4 text-nova-green" />
          <span>Assistance</span>
        </button>

        <button
          type="button"
          onClick={handleRepeatInstruction}
          className="h-12 rounded-xl bg-white hover:bg-nova-surface border border-nova-border shadow-2xs flex items-center justify-center gap-2 text-[14px] font-heading font-semibold text-nova-text-primary transition-colors active:scale-98"
        >
          <Volume2 className="w-4 h-4 text-nova-green" />
          <span>Repeat instruction</span>
        </button>
      </div>

      {/* Discrete Simulation Controls Bar (for Presentation & Testing) */}
      <div className="pt-2 border-t border-nova-divider flex items-center justify-between text-[11px] font-heading text-nova-text-muted">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-nova-coral" />
          Simulation Controls:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={triggerApproachingTransfer}
            className="px-2 py-0.5 rounded bg-nova-surface hover:bg-[#E5DFEA] text-nova-text-secondary transition-colors"
          >
            Transfer (2m)
          </button>
          <button
            type="button"
            onClick={triggerNetworkChange}
            className="px-2 py-0.5 rounded bg-nova-coral-soft hover:bg-nova-coral/20 text-nova-coral font-semibold transition-colors"
          >
            Network Change
          </button>
          <button
            type="button"
            onClick={resetSimulation}
            className="px-2 py-0.5 rounded hover:bg-nova-surface text-nova-text-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
