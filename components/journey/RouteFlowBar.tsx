"use client";

import React from "react";
import { CarFront, TrainFront, Plane, BusFront, Check } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function RouteFlowBar() {
  const { currentJourney, selectedMethod } = useJourney();
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
    <div className="w-full bg-white rounded-card p-4 sm:p-5 border border-nova-border/70 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
          Route Flow
        </span>
        <span className="text-[12px] sm:text-[13px] font-heading font-semibold text-nova-green flex items-center gap-1">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Direct {config.label} · No transfers</span>
        </span>
      </div>

      {/* 3-Step Direct Route Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
        {/* Step 1: Origin */}
        <div className="p-3 rounded-xl border border-nova-border bg-[#FAF8FC] flex flex-col justify-between min-h-[76px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
              Start
            </span>
            <span className="text-[12px] font-heading font-bold text-nova-green">
              {currentJourney.departureTime}
            </span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
              {currentJourney.origin}
            </h4>
            <p className="text-[12px] font-heading text-nova-text-secondary truncate">
              {currentJourney.originDetail}
            </p>
          </div>
        </div>

        {/* Step 2: Single Selected Transport Method */}
        <div className="p-3 rounded-xl border-2 border-nova-green bg-nova-green-soft/50 flex flex-col justify-between min-h-[76px] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-green flex items-center gap-1">
              <MethodIcon className="w-3.5 h-3.5" />
              <span>{config.label}</span>
            </span>
            <span className="text-[12px] font-heading font-bold text-nova-text-primary">
              {currentJourney.durationMinutes} min
            </span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
              {currentJourney.segments[0]?.vehicleCode || config.baseCode}
            </h4>
            <p className="text-[12px] font-heading text-nova-text-secondary truncate">
              Non-stop point-to-point transit
            </p>
          </div>
        </div>

        {/* Step 3: Destination */}
        <div className="p-3 rounded-xl border border-nova-border bg-[#FAF8FC] flex flex-col justify-between min-h-[76px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
              Destination
            </span>
            <span className="text-[12px] font-heading font-bold text-nova-coral">
              {currentJourney.arrivalTime}
            </span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
              {currentJourney.destination}
            </h4>
            <p className="text-[12px] font-heading text-nova-text-secondary truncate">
              {currentJourney.destinationDetail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
