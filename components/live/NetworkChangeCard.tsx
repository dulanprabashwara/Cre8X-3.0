"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export function NetworkChangeCard() {
  const {
    simulationPhase,
    liveState,
    routeVariant,
    acceptReroute,
    undoReroute,
    resetSimulation,
    showToast,
  } = useJourney();

  const [reviewOpen, setReviewOpen] = useState(false);

  // If already accepted and confirmed
  if (routeVariant === "rerouted") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full p-4 rounded-card bg-[#EBF8EF] border-2 border-nova-green shadow-xs flex flex-col space-y-2 select-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-nova-green font-heading font-bold text-[14px]">
            <CheckCircle2 className="w-5 h-5" />
            <span>Route updated</span>
          </div>

          <span className="text-[12px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-nova-green text-white">
            ARRIVAL PROTECTED
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h4 className="font-heading font-bold text-[20px] text-nova-text-primary leading-tight">
              {liveState.estimatedArrival} On Schedule
            </h4>
            <p className="text-[13px] text-nova-text-secondary mt-0.5">
              Switched to {liveState.vehicleCode}. Arrival time protected.
            </p>
          </div>

          <button
            onClick={undoReroute}
            className="inline-flex items-center gap-1 text-[13px] font-heading font-medium text-nova-text-muted hover:text-nova-text-primary p-1.5 rounded-lg hover:bg-white/60 transition-colors"
            title="Undo Reroute"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // Active prompt when network change occurs
  if (simulationPhase === "network_change" && liveState.networkChange) {
    const { cause, solution, impact, originalVehicle, suggestedVehicle } =
      liveState.networkChange;

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full p-5 rounded-card bg-white border-2 border-nova-coral shadow-card relative overflow-hidden select-none"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-nova-coral/15 to-transparent pointer-events-none" />

        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nova-coral-soft border border-nova-coral/30 text-nova-coral text-[12px] font-heading font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NETWORK CHANGE</span>
          </div>

          <span className="text-[12px] font-heading font-semibold text-nova-coral">
            Adaptive Rerouting
          </span>
        </div>

        {/* Alert Information */}
        <div className="mt-3.5 space-y-1">
          <h4 className="font-heading font-bold text-[17px] text-nova-text-primary leading-tight">
            {cause}
          </h4>
          <p className="text-[14px] text-nova-text-secondary leading-relaxed">
            {solution}{" "}
            <strong className="text-nova-green font-semibold">{impact}</strong>
          </p>
        </div>

        {/* Optional Review Details Dropdown */}
        <AnimatePresence>
          {reviewOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 rounded-xl bg-[#FAF8FC] border border-nova-border/70 text-[13px] space-y-1.5"
            >
              <div className="flex justify-between">
                <span className="text-nova-text-muted">Standard track:</span>
                <span className="font-medium text-nova-text-secondary">
                  {originalVehicle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nova-text-muted">Express bypass:</span>
                <span className="font-medium text-nova-green">
                  {suggestedVehicle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nova-text-muted">Arrival impact:</span>
                <span className="font-medium text-nova-green">
                  On-schedule arrival preserved
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-nova-divider flex flex-col gap-2">
          {/* Primary Accept Reroute button */}
          <Button
            size="md"
            fullWidth
            onClick={acceptReroute}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Use {suggestedVehicle}
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => setReviewOpen(!reviewOpen)}
              className="py-2 px-3 rounded-xl border border-nova-border/70 bg-nova-surface/60 hover:bg-nova-surface text-nova-text-primary text-[13px] font-heading font-medium transition-colors"
            >
              {reviewOpen ? "Hide review" : "Review change"}
            </button>

            <button
              onClick={() => {
                resetSimulation();
                showToast("Current route maintained", "info");
              }}
              className="py-2 px-3 rounded-xl border border-nova-border/70 bg-nova-surface/60 hover:bg-nova-surface text-nova-text-muted hover:text-nova-text-primary text-[13px] font-heading font-medium transition-colors"
            >
              Keep current route
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
