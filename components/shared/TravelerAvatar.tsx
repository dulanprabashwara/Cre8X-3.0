"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TravelerAvatarProps {
  size?: "sm" | "md" | "lg" | number;
  showStatus?: boolean;
  className?: string;
  alt?: string;
}

export function TravelerAvatar({
  size = "md",
  showStatus = true,
  className,
  alt = "NOVA Traveler profile",
}: TravelerAvatarProps) {
  let pixelSize = 42;
  let statusDotClass = "w-2.5 h-2.5 -bottom-0.5 -right-0.5 border-2";

  if (typeof size === "number") {
    pixelSize = size;
    if (size >= 64) {
      statusDotClass = "w-3.5 h-3.5 -bottom-1 -right-1 border-2";
    }
  } else if (size === "sm") {
    pixelSize = 36;
    statusDotClass = "w-2.5 h-2.5 -bottom-0.5 -right-0.5 border-2";
  } else if (size === "md") {
    pixelSize = 42;
    statusDotClass = "w-2.5 h-2.5 -bottom-0.5 -right-0.5 border-2";
  } else if (size === "lg") {
    pixelSize = 80;
    statusDotClass = "w-3.5 h-3.5 -bottom-1 -right-1 border-2";
  }

  return (
    <div
      className={cn(
        "relative shrink-0 select-none rounded-full flex items-center justify-center bg-white/40 shadow-xs",
        className,
      )}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <div className="w-full h-full rounded-full overflow-hidden border border-white/80 shadow-2xs relative">
        <Image
          src="/images/profile/nova-traveler-avatar.png"
          alt={alt}
          width={pixelSize * 2}
          height={pixelSize * 2}
          className="w-full h-full object-cover"
          priority={pixelSize >= 40}
        />
      </div>

      {showStatus && (
        <span
          className={cn(
            "absolute rounded-full bg-nova-green border-white shadow-xs",
            statusDotClass,
          )}
        />
      )}
    </div>
  );
}
