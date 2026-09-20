"use client";

import React from "react";
import Link from "next/link";
import { Accessibility } from "lucide-react";
import { NovaLogo } from "./NovaLogo";
import { TravelerAvatar } from "./TravelerAvatar";
import { useJourney } from "@/context/JourneyContext";

interface AppHeaderProps {
  onProfileClick?: () => void;
}

export function AppHeader({ onProfileClick }: AppHeaderProps) {
  const { setPreferencesSheetOpen } = useJourney();

  return (
    <header className="w-full pt-1 pb-3 flex items-center justify-between">
      <NovaLogo variant="horizontal" priority />

      <div className="flex items-center gap-2">
        {/* Accessibility & Travel Preferences action */}
        <button
          onClick={() => setPreferencesSheetOpen(true)}
          aria-label="Journey and accessibility preferences"
          title="Journey & Accessibility Preferences"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-secondary hover:text-nova-text-primary flex items-center justify-center transition-colors shadow-xs active:scale-95"
        >
          <Accessibility className="w-5 h-5 text-nova-text-secondary" />
        </button>

        {/* Profile Avatar */}
        <Link
          href="/profile"
          aria-label="User profile"
          className="block min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
        >
          <TravelerAvatar size={44} />
        </Link>
      </div>
    </header>
  );
}
