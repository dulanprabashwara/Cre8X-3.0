"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function Toast() {
  const { toast } = useJourney();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-full bg-nova-text-primary text-white text-[14px] font-heading font-medium flex items-center gap-2.5 shadow-dock border border-white/10 max-w-[90vw] select-none"
        >
          {toast.type === "warning" ? (
            <AlertCircle className="w-4 h-4 text-nova-warning shrink-0" />
          ) : toast.type === "info" ? (
            <Info className="w-4 h-4 text-nova-coral shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
          )}
          <span className="truncate">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
