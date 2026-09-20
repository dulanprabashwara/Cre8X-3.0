"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  CarFront,
  TrainFront,
  Plane,
  BusFront,
  Sparkles,
} from "lucide-react";
import { NovaLogo } from "@/components/shared/NovaLogo";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function PlanningLoadingOverlay() {
  const { isPlanning, selectedMethod } = useJourney();
  const [step, setStep] = useState(0);

  const config = METHOD_CONFIGS[selectedMethod];

  const MethodIcon =
    selectedMethod === "pod"
      ? CarFront
      : selectedMethod === "rail"
        ? TrainFront
        : selectedMethod === "aero"
          ? Plane
          : BusFront;

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    if (isPlanning) {
      setStep(0);
      t1 = setTimeout(() => setStep(1), 400);
      t2 = setTimeout(() => setStep(2), 800);
      t3 = setTimeout(() => setStep(3), 1200);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isPlanning]);

  const stages = [
    { label: "Direct corridor clearance verified", icon: Sparkles },
    { label: `${config.vehicleName} reserved`, icon: MethodIcon },
    { label: "Step-free automated boarding locked", icon: CheckCircle2 },
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
            {/* Spinning Brand Icon */}
            <div className="relative mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-2 border-dashed border-nova-green flex items-center justify-center"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <NovaLogo size={32} />
              </div>
            </div>

            <h3 className="font-heading font-bold text-[18px] text-nova-text-primary">
              Securing your direct journey
            </h3>
            <p className="text-[13px] font-heading font-medium text-nova-text-secondary mt-1">
              Coordinating {config.label} corridor
            </p>

            {/* Checklist progression */}
            <div className="w-full mt-5 space-y-2.5">
              {stages.map((stage, i) => {
                const Icon = stage.icon;
                const isComplete = step > i;
                const isCurrent = step === i;

                return (
                  <div
                    key={stage.label}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isComplete
                        ? "bg-nova-green-soft border-nova-green/30 text-nova-text-primary"
                        : isCurrent
                          ? "bg-white border-nova-coral shadow-2xs text-nova-text-primary"
                          : "bg-nova-surface/40 border-nova-border/40 text-nova-text-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isComplete
                            ? "bg-nova-green text-white"
                            : isCurrent
                              ? "bg-nova-coral text-white"
                              : "bg-nova-border text-nova-text-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] font-heading font-medium text-left truncate">
                        {stage.label}
                      </span>
                    </div>

                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
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
                className="text-[13px] font-heading font-semibold text-nova-green flex items-center gap-1.5 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Journey ready · Direct route secured</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
