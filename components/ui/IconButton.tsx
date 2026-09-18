"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: React.ReactNode;
  variant?: "ghost" | "secondary" | "white" | "primary";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variantStyles = {
      ghost:
        "bg-transparent hover:bg-nova-surface text-nova-text-primary active:bg-nova-border/30",
      secondary:
        "bg-nova-surface hover:bg-[#E5DFEA] text-nova-text-primary active:bg-[#DDD6E3]",
      white:
        "bg-white hover:bg-nova-bg text-nova-text-primary border border-nova-border shadow-xs",
      primary: "bg-nova-green hover:bg-nova-green-hover text-white shadow-sm",
    };

    const sizeStyles = {
      sm: "w-9 h-9 min-w-[36px] rounded-full text-[16px]",
      md: "w-11 h-11 min-w-[44px] rounded-xl text-[18px]",
      lg: "w-12 h-12 min-w-[48px] rounded-2xl text-[20px]",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.94 }}
        transition={{ duration: 0.12 }}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-nova-green focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

IconButton.displayName = "IconButton";
