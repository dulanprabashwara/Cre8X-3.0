"use client";

import React from "react";
import { TrainFront, LogOut, CheckCircle2, CarFront, Plane, BusFront, MapPin } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function InstructionModeView() {
  const { liveState, routeVariant, selectedMethod } = useJourney();
  const config = METHOD_CONFIGS[selectedMethod];

  const MethodIcon =
    selectedMethod === "pod"
      ? CarFront
      : selectedMethod === "rail"
        ? TrainFront
        : selectedMethod === "aero"
          ? Plane
          : BusFront;

  return (
    <div className="w-full bg-[#FAF8FC] p-5 border-b border-nova-border/70 flex flex-col space-y-3.5">
      <div className="flex items-center justify-between pb-1">
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
          Turn-by-Turn Guidance
        </span>
        <span className="text-[12px] font-heading font-semibold text-nova-green flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Step-free confirmed
        </span>
      </div>

      {/* 1. NOW */}
      <div className="p-4 rounded-card bg-white border-2 border-nova-green shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-nova-green text-white flex items-center justify-center shrink-0">
          <MethodIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[12px] font-heading font-bold uppercase tracking-widest text-nova-green">
            NOW
          </span>
          <h4 className="font-heading font-bold text-[17px] text-nova-text-primary leading-tight mt-0.5">
            Stay on {liveState.vehicleCode}
          </h4>
          <p className="text-[13px] text-nova-text-secondary mt-0.5">
            {liveState.minutesRemaining} min remaining · {config.label} direct transit
          </p>
        </div>
      </div>

      {/* 2. NEXT */}
      <div className="p-4 rounded-card bg-white border border-nova-border shadow-2xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-nova-surface text-nova-text-primary flex items-center justify-center shrink-0">
          <LogOut className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[12px] font-heading font-bold uppercase tracking-widest text-nova-text-muted">
            NEXT
          </span>
          <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight mt-0.5">
            Prepare to exit at {liveState.destination}
          </h4>
          <p className="text-[13px] text-nova-text-secondary mt-0.5">
            Doors open on the left · Automated step-free ramp deployed
          </p>
        </div>
      </div>

      {/* 3. AFTER THAT */}
      <div className="p-4 rounded-card bg-white border border-nova-border shadow-2xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-nova-coral-soft text-nova-coral flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[12px] font-heading font-bold uppercase tracking-widest text-nova-coral">
            AFTER THAT
          </span>
          <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight mt-0.5">
            Arrive at {liveState.destination} Concourse
          </h4>
          <p className="text-[13px] text-nova-text-secondary mt-0.5">
            {routeVariant === "rerouted"
              ? "Express bypass arrival complete · Arrival time protected"
              : "Step-free pathway directly to arrival exits and sky lounge"}
          </p>
        </div>
      </div>
    </div>
  );
}
