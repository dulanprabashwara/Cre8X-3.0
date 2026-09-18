"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  id,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-nova-green focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-nova-green" : "bg-nova-border"
      )}
    >
      <span className="sr-only">{label || "Toggle setting"}</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "pointer-events-none flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      >
        {checked ? (
          <Check className="w-3.5 h-3.5 text-nova-green stroke-[3]" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-nova-muted" />
        )}
      </motion.span>
    </button>
  );
}
