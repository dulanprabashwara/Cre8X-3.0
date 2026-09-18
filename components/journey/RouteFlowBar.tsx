"use client";

import React from "react";
import { CarFront, TrainFront, Plane, Footprints } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export function RouteFlowBar() {
  const { currentJourney } = useJourney();

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
          Route Flow
        </span>
        <span className="text-[13px] font-heading font-medium text-nova-text-secondary">
          {currentJourney.segments.length} segments · Transfers secured
        </span>
      </div>

      {/* 4 segments grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {currentJourney.segments.map((seg) => {
          const isPod = seg.type === "pod";
          const isRail = seg.type === "rail";
          const isAero = seg.type === "aero";
          const isWalk = seg.type === "walk";

          const Icon = isPod
            ? CarFront
            : isRail
              ? TrainFront
              : isAero
                ? Plane
                : Footprints;

          return (
            <div
              key={seg.id}
              className={cn(
                "py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl border flex flex-col items-center text-center transition-colors select-none",
                isPod &&
                  "bg-nova-green-soft/70 border-nova-green/40 text-nova-green",
                isRail &&
                  "bg-white border-nova-border text-nova-text-primary shadow-2xs",
                isAero &&
                  "bg-nova-coral-soft/70 border-nova-coral/30 text-nova-coral",
                isWalk &&
                  "bg-nova-surface/50 border-nova-border/60 text-nova-text-secondary",
              )}
            >
              <Icon className="w-5 h-5 mb-1.5" />
              <span className="font-heading font-semibold text-[13px] capitalize leading-none">
                {seg.type === "pod"
                  ? "Pod"
                  : seg.type === "rail"
                    ? "Rail"
                    : seg.type === "aero"
                      ? "Aero"
                      : "Walk"}
              </span>
              <span className="text-[12px] font-medium opacity-80 mt-1">
                {seg.durationMinutes} min
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
