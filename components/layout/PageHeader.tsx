"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  actionSlot?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  actionSlot,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "w-full pb-4 pt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-nova-border/50 mb-4 sm:mb-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white border border-nova-border/70 hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-colors shadow-2xs active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div className="min-w-0 flex-1">
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

      {actionSlot && (
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          {actionSlot}
        </div>
      )}
    </header>
  );
}
