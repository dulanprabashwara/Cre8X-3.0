"use client";

import React from "react";
import Link from "next/link";
import { Accessibility, User } from "lucide-react";
import { NovaLogo } from "./NovaLogo";
import { useJourney } from "@/context/JourneyContext";

interface AppHeaderProps {
  onProfileClick?: () => void;
}

export function AppHeader({ onProfileClick }: AppHeaderProps) {
  const { setPreferencesSheetOpen, showToast } = useJourney();

  return (
    <header className="w-full pt-1 pb-3 flex items-center justify-between">
      <NovaLogo />

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
          className="relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-gradient-to-br from-[#231D2B] to-[#3B3247] p-0.5 shadow-xs flex items-center justify-center active:scale-95 transition-transform"
        >
          <div className="w-full h-full rounded-[10px] bg-[#2A2333] flex items-center justify-center text-white/90">
            <User className="w-5 h-5 text-white/80" />
          </div>
          {/* Active online status beacon */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-nova-green border-2 border-white shadow-xs" />
        </Link>
      </div>
    </header>
  );
}
