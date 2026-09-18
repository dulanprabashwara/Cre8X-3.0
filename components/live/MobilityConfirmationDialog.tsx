"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";

export function MobilityConfirmationDialog() {
  const { mobilityDialogOpen, setMobilityDialogOpen, showToast } = useJourney();

  const handleClose = () => {
    setMobilityDialogOpen(false);
    showToast("Assistance beacon active on Platform 2B");
  };

  return (
    <AnimatePresence>
      {mobilityDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-nova-text-primary/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-sm bg-white rounded-cardLg p-6 shadow-dock border border-nova-border flex flex-col items-center text-center select-none"
          >
            {/* Green beacon icon */}
            <div className="w-14 h-14 rounded-full bg-nova-green-soft border border-nova-green/30 text-nova-green flex items-center justify-center mb-3 shadow-xs">
              <Accessibility className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1 text-[12px] font-heading font-semibold text-nova-green tracking-wider uppercase mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Staff Dispatched</span>
            </div>

            <h3 className="font-heading font-bold text-[20px] text-nova-text-primary">
              Mobility assistance requested
            </h3>

            <div className="mt-3 p-3.5 rounded-xl bg-[#FAF8FC] border border-nova-border/70 text-[14px] text-nova-text-secondary leading-relaxed text-left space-y-2">
              <p>
                <strong>Central Skyport staff notified.</strong> A transit assistant will meet you directly at <strong>Platform 2B</strong> as your train arrives.
              </p>
              <div className="flex items-center justify-between text-[12px] text-nova-text-muted border-t border-nova-divider pt-2 font-medium">
                <span>Estimated meeting:</span>
                <span className="text-nova-green font-semibold">In approx 4 min</span>
              </div>
            </div>

            <div className="w-full mt-5">
              <Button size="lg" fullWidth onClick={handleClose}>
                Done
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
