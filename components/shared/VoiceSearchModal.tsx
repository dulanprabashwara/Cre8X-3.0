"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Sparkles } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS } from "@/data/destinations";

export function VoiceSearchModal() {
  const { voiceModalOpen, setVoiceModalOpen, setDestination, showToast } =
    useJourney();
  const [spokenText, setSpokenText] = useState("Listening...");

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (voiceModalOpen) {
      setSpokenText("Listening for destination...");
      timer1 = setTimeout(() => {
        setSpokenText("“Take me to Colombo Skyport”");
      }, 1200);

      timer2 = setTimeout(() => {
        const target =
          DESTINATIONS.find((d) => d.name === "Colombo Skyport") ||
          DESTINATIONS[0];
        setDestination(target);
        showToast("Destination set: Colombo Skyport");
        setVoiceModalOpen(false);
      }, 2600);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [voiceModalOpen, setDestination, setVoiceModalOpen, showToast]);

  return (
    <AnimatePresence>
      {voiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVoiceModalOpen(false)}
            className="fixed inset-0 bg-nova-text-primary/40 backdrop-blur-sm"
          />

          {/* Voice Dialog */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-sm bg-white rounded-cardLg p-6 shadow-dock border border-nova-border flex flex-col items-center text-center"
          >
            <button
              onClick={() => setVoiceModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-nova-text-muted hover:text-nova-text-primary rounded-full"
              aria-label="Close voice search"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing animated pulsing microphone beacon */}
            <div className="relative my-6 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute w-24 h-24 rounded-full bg-nova-coral/20"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
                className="absolute w-18 h-18 rounded-full bg-nova-coral-mid/30"
              />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-nova-coral to-nova-coral-orange text-white flex items-center justify-center shadow-glowCoral">
                <Mic className="w-7 h-7 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-nova-coral font-heading text-[13px] font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voice Intelligence</span>
            </div>

            <h3 className="font-heading font-semibold text-[18px] text-nova-text-primary min-h-[50px] flex items-center justify-center px-2">
              {spokenText}
            </h3>

            <p className="text-[13px] text-nova-text-muted mt-2">
              Speak naturally to search any district, skyport, or transit
              station.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
