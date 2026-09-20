"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function Toast() {
  const { toast } = useJourney();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {toast && (
        <div
          style={{
            top: "max(12px, calc(env(safe-area-inset-top, 0px) + 12px))",
          }}
          className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none px-3"
        >
          <motion.div
            key="global-toast"
            role="status"
            aria-live={toast.type === "warning" ? "assertive" : "polite"}
            aria-atomic="true"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, scale: 0.98 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto w-full max-w-[420px] sm:w-auto sm:max-w-[520px] px-4 py-3 rounded-2xl sm:rounded-full bg-nova-text-primary text-white text-[13px] sm:text-[14px] font-heading font-medium flex items-center gap-2.5 sm:gap-3 shadow-dock border border-white/10 select-none"
          >
            {toast.type === "warning" ? (
              <AlertCircle className="w-4 h-4 text-nova-warning shrink-0" />
            ) : toast.type === "info" ? (
              <Info className="w-4 h-4 text-nova-coral shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
            )}
            <span className="flex-1 min-w-0 whitespace-normal break-words leading-snug">
              {toast.message}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
