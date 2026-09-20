"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Accessibility } from "lucide-react";
import Link from "next/link";
import { useJourney } from "@/context/JourneyContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TravelerAvatar } from "@/components/shared/TravelerAvatar";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  actionSlot?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  actionSlot,
}: PageHeaderProps) {
  const router = useRouter();
  const { setPreferencesSheetOpen } = useJourney();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="w-full pb-4 pt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-nova-border/50 mb-4 sm:mb-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div>
          <h1 className="font-heading font-bold text-[22px] sm:text-[26px] md:text-[28px] text-nova-text-primary tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] sm:text-[14px] font-heading font-medium text-nova-text-secondary mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Utility Actions */}
      <div className="flex items-center gap-2.5 self-start md:self-auto">
        {/* Network Status pill - visible on tablet, hidden on desktop where sidebar displays it */}
        <div className="hidden sm:block lg:hidden">
          <StatusBadge />
        </div>

        {/* Accessibility Quick Preferences */}
        <button
          onClick={() => setPreferencesSheetOpen(true)}
          title="Accessibility & Preferences"
          aria-label="Journey & Accessibility Preferences"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-secondary hover:text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
        >
          <Accessibility className="w-4 h-4" />
        </button>

        {/* Action Slot (optional custom button per page) */}
        {actionSlot}

        {/* Mobile-only profile avatar (tablet & desktop have it in rail/sidebar) */}
        <div className="md:hidden">
          <Link
            href="/profile"
            aria-label="Profile"
            className="block min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
          >
            <TravelerAvatar size={44} />
          </Link>
        </div>
      </div>
    </header>
  );
}
