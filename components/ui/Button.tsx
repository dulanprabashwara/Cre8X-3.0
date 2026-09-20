"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  variant?:
    | "primary"
    | "secondary"
    | "inverted"
    | "outlined"
    | "coral"
    | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "right-edge";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      icon,
      iconPosition = "right",
      fullWidth = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-heading font-medium transition-colors focus-visible:outline-2 focus-visible:outline-nova-green focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-nova-green hover:bg-nova-green-hover text-white shadow-sm active:bg-nova-green-hover",
      secondary:
        "bg-nova-surface hover:bg-[#E5DFEA] text-nova-text-primary active:bg-[#DDD6E3]",
      inverted:
        "bg-nova-text-primary hover:bg-[#342C3E] text-white active:bg-[#1A1520]",
      outlined:
        "bg-white hover:bg-nova-bg text-nova-text-primary border border-nova-border active:bg-nova-surface",
      coral:
        "bg-nova-coral-soft text-nova-coral hover:bg-[#FFE5EC] border border-nova-coral/20 active:bg-nova-coral/20",
      ghost:
        "bg-transparent hover:bg-nova-surface text-nova-text-primary active:bg-nova-border/30",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-[14px] rounded-btn gap-2",
      md: "h-12 px-5 text-[15px] rounded-btn gap-2",
      lg: "h-[54px] px-6 text-[16px] rounded-btn gap-2.5 font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        <span
          className={cn(iconPosition === "right-edge" && "w-full text-center")}
        >
          {children}
        </span>
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        {icon && iconPosition === "right-edge" && (
          <span className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.14] flex items-center justify-center shrink-0 pointer-events-none">
            {icon}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
