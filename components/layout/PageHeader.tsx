"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Accessibility, User, Activity } from "lucide-react";
import Link from "next/link";
import { useJourney } from "@/context/JourneyContext";
import { StatusBadge } from "@/components/shared/StatusBadge";

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
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
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
        {/* Network Status pill - hidden on mobile if already on network page */}
        <div className="hidden sm:block">
          <StatusBadge />
        </div>

        {/* Accessibility Quick Preferences */}
        <button
          onClick={() => setPreferencesSheetOpen(true)}
          title="Accessibility & Preferences"
          aria-label="Journey & Accessibility Preferences"
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-secondary hover:text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95"
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
            className="relative w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-gradient-to-br from-[#231D2B] to-[#3B3247] p-0.5 shadow-xs flex items-center justify-center active:scale-95 transition-transform"
          >
            <div className="w-full h-full rounded-[10px] bg-[#2A2333] flex items-center justify-center text-white/90">
              <User className="w-4 h-4 text-white/80" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-nova-green border-2 border-white shadow-xs" />
          </Link>
        </div>
      </div>
    </header>
  );
}
