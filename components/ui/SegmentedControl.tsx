"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Option<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center bg-white p-1 rounded-full border border-nova-border/70 shadow-xs",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-4 py-1.5 text-[14px] font-heading font-medium rounded-full transition-colors select-none flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-nova-green focus-visible:outline-offset-1",
              size === "sm" ? "px-3 py-1 text-[13px]" : "px-4 py-2 text-[14px]",
              isSelected
                ? "text-white"
                : "text-nova-text-secondary hover:text-nova-text-primary"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-active-pill"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                className="absolute inset-0 bg-nova-green rounded-full z-0 shadow-xs"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
