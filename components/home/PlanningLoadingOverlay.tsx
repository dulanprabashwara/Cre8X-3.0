"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CarFront, TrainFront, Plane, Sparkles } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function PlanningLoadingOverlay() {
  const { isPlanning } = useJourney();
  const [step, setStep] = useState(0);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    if (isPlanning) {
      setStep(0);
      t1 = setTimeout(() => setStep(1), 500);
      t2 = setTimeout(() => setStep(2), 1000);
      t3 = setTimeout(() => setStep(3), 1500);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isPlanning]);

  const stages = [
    { label: "Autonomous Pod P17 allocated", icon: CarFront },
    { label: "HyperRail H4 seat reserved", icon: TrainFront },
    { label: "AeroLink A12 corridor locked", icon: Plane },
  ];

  return (
    <AnimatePresence>
      {isPlanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-nova-text-primary/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-sm bg-white rounded-cardLg p-6 shadow-dock border border-nova-border flex flex-col items-center text-center"
          >
            {/* Header emblem */}
            <div className="w-12 h-12 rounded-2xl bg-nova-green-soft border border-nova-green/30 flex items-center justify-center text-nova-green mb-3 shadow-xs">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: "4s" }} />
            </div>

            <span className="text-[12px] font-heading font-semibold text-nova-green tracking-widest uppercase mb-1">
              Universal Mobility OS
            </span>

            <h3 className="font-heading font-bold text-[20px] text-nova-text-primary mb-5">
              Planning your journey…
            </h3>

            {/* Stage items */}
            <div className="w-full space-y-3 mb-4">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isComplete = step > idx;
                const isCurrent = step === idx;

                return (
                  <div
                    key={stage.label}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      isComplete
                        ? "bg-nova-green-soft/60 border-nova-green/40 text-nova-text-primary"
                        : isCurrent
                        ? "bg-[#FAF8FC] border-nova-coral/40 text-nova-text-primary shadow-xs"
                        : "bg-nova-surface/40 border-nova-border/40 text-nova-text-muted opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isComplete
                            ? "bg-nova-green text-white"
                            : isCurrent
                            ? "bg-nova-coral text-white"
                            : "bg-nova-border text-nova-text-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[14px] font-heading font-medium text-left">
                        {stage.label}
                      </span>
                    </div>

                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-nova-green shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-nova-coral animate-ping" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-nova-border" />
                    )}
                  </div>
                );
              })}
            </div>

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[14px] font-heading font-semibold text-nova-green flex items-center gap-1.5 mt-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Journey ready · Seamless transfers secured</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
