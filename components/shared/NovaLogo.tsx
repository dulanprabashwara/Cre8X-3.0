"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NovaLogoProps {
  variant?: "full" | "mark" | "horizontal";
  size?: number;
  className?: string;
  priority?: boolean;
}

export function NovaLogo({
  variant = "horizontal",
  size,
  className,
  priority = false,
}: NovaLogoProps) {
  if (variant === "full") {
    const width = size || 155;
    return (
      <div className={cn("select-none flex flex-col items-start", className)}>
        <Image
          src="/images/brand/nova-logo.png"
          alt="NOVA Mobility OS 2100"
          width={width}
          height={width}
          className="w-auto object-contain"
          style={{ width: `${width}px`, height: "auto" }}
          priority={priority}
        />
      </div>
    );
  }

  if (variant === "mark") {
    const dim = size || 40;
    return (
      <div
        className={cn("relative shrink-0 select-none flex items-center justify-center", className)}
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/images/brand/nova-mark.png"
          alt="NOVA Mobility OS 2100"
          width={dim * 2}
          height={dim * 2}
          className="w-full h-full object-contain"
          priority={priority}
        />
      </div>
    );
  }

  // "horizontal" (mark + wordmark lockup)
  const markSize = size || 38;
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: markSize, height: markSize }}
      >
        <Image
          src="/images/brand/nova-mark.png"
          alt="NOVA Mobility OS 2100"
          width={markSize * 2}
          height={markSize * 2}
          className="w-full h-full object-contain"
          priority={priority}
        />
      </div>

      <div className="flex flex-col">
        <span className="font-heading font-bold text-[18px] leading-tight text-nova-text-primary tracking-tight">
          NOVA
        </span>
        <span className="font-heading text-[12px] font-medium tracking-[0.14em] text-nova-text-muted uppercase">
          Mobility OS 2100
        </span>
      </div>
    </div>
  );
}
