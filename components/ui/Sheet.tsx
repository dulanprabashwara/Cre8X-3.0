"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
}

export function Sheet({
  isOpen,
  onClose,
  children,
  className,
  footer,
}: SheetProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center md:p-6">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-nova-text-primary/30 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Bottom Sheet / Modal Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-[480px] md:max-w-[560px] bg-white rounded-t-sheet md:rounded-panel shadow-sheet md:shadow-dock z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden border-t md:border border-nova-border/60",
              className,
            )}
          >
            {/* Drag handle pill (mobile only) */}
            <div className="w-full pt-3 pb-1 flex md:hidden justify-center items-center cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-nova-border rounded-full hover:bg-nova-text-muted/40 transition-colors" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2 md:pt-4">
              {children}
            </div>

            {/* Sticky Footer */}
            {footer && (
              <div className="shrink-0 px-5 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-t border-nova-border/60">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
