"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { NovaLogo } from "@/components/shared/NovaLogo";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function PlanningLoadingOverlay() {
  const { isPlanning, selectedMethod, currentJourney, preferences } =
    useJourney();
  const [step, setStep] = useState(0);

  const config = METHOD_CONFIGS[selectedMethod];
  const isReducedMotion = preferences.reducedMotion;

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    if (isPlanning) {
      setStep(0);
      // Status progression within total 1050ms
      t1 = setTimeout(() => setStep(1), 380);
      t2 = setTimeout(() => setStep(2), 760);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPlanning]);

  const statusMessages = [
    "Checking live network…",
    "Confirming accessibility…",
    "Journey ready",
  ];

  return (
    <AnimatePresence>
      {isPlanning && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Planning your journey"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-[2px]"
        >
          {/* Compact Centered Loading Card */}
          <motion.div
            initial={{
              opacity: 0,
              scale: isReducedMotion ? 1 : 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: isReducedMotion ? 1 : 0.97,
            }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="w-[calc(100vw-32px)] sm:w-[340px] max-w-[350px] bg-white rounded-2xl p-6 shadow-xl border border-nova-border/70 flex flex-col items-center text-center select-none"
          >
            {/* Logo with subtle ambient pulse */}
            <div className="relative flex items-center justify-center">
              {!isReducedMotion && (
                <motion.div
                  animate={{
                    scale: [1, 1.14, 1],
                    opacity: [0.35, 0.7, 0.35],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-12 h-12 rounded-full bg-nova-green/15"
                />
              )}
              <NovaLogo variant="mark" size={36} />
            </div>

            {/* Title */}
            <h3 className="font-heading font-bold text-[18px] text-nova-text-primary leading-tight mt-3.5">
              Planning your journey
            </h3>

            {/* Subtext: Selected method · duration · Direct */}
            <p className="text-[13px] font-heading font-medium text-nova-text-secondary mt-1">
              {config.label} · {currentJourney.durationMinutes} min · Direct
            </p>

            {/* Subtle Progress Line */}
            <div className="w-full h-1 bg-nova-surface rounded-full overflow-hidden mt-4 mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-nova-green via-nova-green to-nova-green-hover rounded-full"
                initial={{ width: "10%" }}
                animate={{
                  width: step === 0 ? "40%" : step === 1 ? "80%" : "100%",
                }}
                transition={{
                  duration: isReducedMotion ? 0 : 0.35,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Status message transition */}
            <div className="h-5 flex items-center justify-center text-[12px] sm:text-[13px] font-heading font-medium">
              <AnimatePresence mode="wait">
                {step < 2 ? (
                  <motion.span
                    key={`status-${step}`}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.12 }}
                    className="text-nova-text-secondary"
                  >
                    {statusMessages[step]}
                  </motion.span>
                ) : (
                  <motion.span
                    key="status-ready"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.14 }}
                    className="text-nova-green font-semibold flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    <span>Journey ready</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
