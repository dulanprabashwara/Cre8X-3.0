"use client";

import React, { useState } from "react";
import { TrainFront, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export function ItineraryTimeline() {
  const { currentJourney, showToast } = useJourney();
  const [expandedSegment, setExpandedSegment] = useState<string | null>("seg-2"); // HyperRail expanded by default as in screenshot

  const toggleExpand = (id: string) => {
    setExpandedSegment((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white rounded-card p-5 border border-nova-border/70 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-[18px] text-nova-text-primary">
          Itinerary Details
        </h3>
        <span className="text-[12px] font-heading font-medium text-nova-text-muted">
          Tap segment for details
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-6">
        {/* Continuous background vertical connector line */}
        <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-nova-border" />

        {currentJourney.segments.map((seg, index) => {
          const isExpanded = expandedSegment === seg.id;
          const isFirst = index === 0;
          const isHyperRail = seg.id === "seg-2";
          const isAero = seg.id === "seg-3";
          const isLast = index === currentJourney.segments.length - 1;

          return (
            <div
              key={seg.id}
              className="relative cursor-pointer select-none group"
              onClick={() => toggleExpand(seg.id)}
            >
              {/* Timeline node icon / marker */}
              <div
                className={cn(
                  "absolute -left-6 top-1 w-3.5 h-3.5 rounded-full z-10 transition-transform group-hover:scale-110",
                  isFirst && "border-2 border-nova-green bg-white ring-4 ring-white",
                  isHyperRail && "border-2 border-nova-text-primary bg-white ring-4 ring-white",
                  isAero && "border-2 border-nova-coral bg-white ring-4 ring-white",
                  isLast && "bg-nova-coral ring-4 ring-white"
                )}
              />

              {/* Time & Badges Row */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-heading font-semibold text-[15px]",
                    isFirst ? "text-nova-green" : "text-nova-text-primary"
                  )}
                >
                  {seg.departureTime}
                </span>

                {seg.badgeText && (
                  <span
                    className={cn(
                      "text-[12px] font-heading font-semibold",
                      seg.statusColor === "green" && "text-nova-green",
                      seg.statusColor === "coral" && "text-nova-coral",
                      seg.statusColor === "neutral" && "text-nova-text-secondary"
                    )}
                  >
                    {seg.badgeText}
                  </span>
                )}
              </div>

              {/* Segment Title & Subtext */}
              <div className="mt-0.5">
                <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight">
                  {seg.vehicleCode}
                </h4>
                <p className="text-[13px] text-nova-text-secondary mt-0.5">
                  {seg.originStation}
                  {seg.destinationStation && ` → ${seg.destinationStation}`}
                </p>
              </div>

              {/* Expandable Details Container (HyperRail Boarding Guide) */}
              <AnimatePresence>
                {isExpanded && seg.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="p-3 bg-[#FAF8FC] border border-nova-border/70 rounded-xl flex items-center justify-between text-[13px] shadow-2xs">
                      <div className="flex items-center gap-2 text-nova-text-primary">
                        <TrainFront className="w-4 h-4 text-nova-text-secondary shrink-0" />
                        <span className="font-heading font-medium">
                          Boarding {seg.details.boardingTime} • {seg.details.car}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast("Platform 06 Station Guide opened");
                        }}
                        className="inline-flex items-center gap-0.5 font-heading font-semibold text-nova-green hover:text-nova-green-hover transition-colors"
                      >
                        <span>Station guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {seg.details.expandedNote && (
                      <p className="text-[12px] text-nova-text-muted mt-2 pl-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-nova-green shrink-0" />
                        <span>{seg.details.expandedNote}</span>
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
