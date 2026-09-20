"use client";

import React, { useState } from "react";
import {
  TrainFront,
  CarFront,
  Plane,
  BusFront,
  ChevronRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function ItineraryTimeline() {
  const { currentJourney, selectedMethod, showToast } = useJourney();
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  const config = METHOD_CONFIGS[selectedMethod];
  const seg = currentJourney.segments[0];

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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-[18px] text-nova-text-primary">
          Itinerary Details
        </h3>
        <span className="text-[12px] font-heading font-medium text-nova-text-muted">
          Direct journey
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-6">
        {/* Continuous vertical connector line */}
        <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-gradient-to-b from-nova-green via-nova-green to-nova-coral" />

        {/* 1. Origin Node */}
        <div className="relative">
          <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full z-10 border-2 border-nova-green bg-white ring-4 ring-white" />

          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-[15px] text-nova-green">
              {currentJourney.departureTime}
            </span>
            <span className="text-[12px] font-heading font-semibold text-nova-green bg-nova-green-soft px-2 py-0.5 rounded-md border border-nova-green/30">
              Boarding ready
            </span>
          </div>

          <div className="mt-1">
            <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight">
              {currentJourney.origin}
            </h4>
            <p className="text-[13px] text-nova-text-secondary mt-0.5">
              {currentJourney.originDetail} · Departure point
            </p>
          </div>
        </div>

        {/* 2. Transit Vehicle Step */}
        <div className="relative">
          <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full z-10 border-2 border-nova-text-primary bg-white ring-4 ring-white" />

          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-[15px] text-nova-text-primary">
              Non-stop Transit
            </span>
            <span className="text-[12px] font-heading font-semibold text-nova-text-secondary">
              {currentJourney.durationMinutes} min
            </span>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-2">
              <MethodIcon className="w-4 h-4 text-nova-green shrink-0" />
              <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight">
                {seg?.vehicleCode || config.baseCode}
              </h4>
            </div>
            <p className="text-[13px] text-nova-text-secondary mt-0.5">
              {seg?.badgeText || config.badgeLabel} · Direct service to
              destination
            </p>
          </div>

          {/* Expandable Details Container */}
          <div className="mt-3">
            <div className="p-3 bg-[#FAF8FC] border border-nova-border/70 rounded-xl flex items-center justify-between text-[13px] shadow-2xs">
              <div className="flex items-center gap-2 text-nova-text-primary">
                <MethodIcon className="w-4 h-4 text-nova-text-secondary shrink-0" />
                <span className="font-heading font-medium">
                  {seg?.details?.car
                    ? `${seg.details.car} · Boarding ${seg.departureTime}`
                    : seg?.details?.platform
                      ? `${seg.details.platform} · Boarding ${seg.departureTime}`
                      : `Boarding ${seg.departureTime}`}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    `${seg?.details?.platform || "Bay"} Boarding Guide opened`,
                  )
                }
                className="inline-flex items-center gap-0.5 font-heading font-semibold text-nova-green hover:text-nova-green-hover transition-colors min-h-[44px] px-2"
              >
                <span>Station guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {seg?.details?.expandedNote && (
              <p className="text-[12px] text-nova-text-secondary mt-2 pl-1 flex items-center gap-1.5 font-heading">
                <CheckCircle2 className="w-3.5 h-3.5 text-nova-green shrink-0" />
                <span>{seg.details.expandedNote}</span>
              </p>
            )}
          </div>
        </div>

        {/* 3. Destination Node */}
        <div className="relative">
          <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full z-10 bg-nova-coral ring-4 ring-white" />

          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-[15px] text-nova-coral">
              {currentJourney.arrivalTime}
            </span>
            <span className="text-[12px] font-heading font-semibold text-nova-coral bg-nova-coral-soft px-2 py-0.5 rounded-md border border-nova-coral/30">
              Arrival
            </span>
          </div>

          <div className="mt-1">
            <h4 className="font-heading font-bold text-[16px] text-nova-text-primary leading-tight">
              {currentJourney.destination}
            </h4>
            <p className="text-[13px] text-nova-text-secondary mt-0.5">
              {currentJourney.destinationDetail} · Final destination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
