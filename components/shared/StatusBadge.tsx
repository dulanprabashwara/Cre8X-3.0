"use client";

import React from "react";

export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nova-surface/80 border border-nova-border/50 text-[13px] font-heading font-medium text-nova-text-secondary select-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-nova-green" />
      </span>
      <span>City network operating normally</span>
    </div>
  );
}
