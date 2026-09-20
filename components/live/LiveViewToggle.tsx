"use client";

import React from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

interface LiveViewToggleProps {
  className?: string;
}

export function LiveViewToggle({ className }: LiveViewToggleProps) {
  const { liveMode, setLiveMode } = useJourney();

  return (
    <div
      className={cn(
        "pointer-events-auto shadow-dock rounded-full bg-white/95 backdrop-blur-xs",
        className,
      )}
    >
      <SegmentedControl
        options={[
          { value: "map", label: "Map" },
          { value: "instructions", label: "Instructions" },
        ]}
        value={liveMode}
        onChange={setLiveMode}
        size="md"
        layoutId="live-mode-toggle"
      />
    </div>
  );
}
