"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Route, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJourney } from "@/context/JourneyContext";

export function BottomNav() {
  const pathname = usePathname();
  const { showToast } = useJourney();

  const isHome = pathname === "/";
  const isJourney = pathname === "/journey" || pathname === "/live";

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-5 pt-2 px-4 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-nova-border/80 rounded-full py-1.5 px-3 shadow-dock flex items-center gap-1.5 max-w-[360px] w-full justify-around">
        {/* Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-200 select-none",
            isHome
              ? "bg-nova-green-soft text-nova-green"
              : "text-nova-text-muted hover:text-nova-text-primary"
          )}
        >
          <div className={cn("p-1 rounded-full", isHome && "bg-nova-green text-white")}>
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-semibold tracking-wider uppercase mt-0.5">
            Home
          </span>
        </Link>

        {/* Journey */}
        <Link
          href="/journey"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-200 select-none",
            isJourney
              ? "bg-nova-green-soft text-nova-green"
              : "text-nova-text-muted hover:text-nova-text-primary"
          )}
        >
          <div className={cn("p-1 rounded-full", isJourney && "bg-nova-green text-white")}>
            <Route className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-semibold tracking-wider uppercase mt-0.5">
            Journey
          </span>
        </Link>

        {/* Profile */}
        <button
          onClick={() => showToast("Passenger Profile: Citizen ID 8492-X", "info")}
          className="flex flex-col items-center justify-center py-1 px-4 rounded-full text-nova-text-muted hover:text-nova-text-primary transition-all duration-200 select-none"
        >
          <div className="p-1 rounded-full">
            <User className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-heading font-semibold tracking-wider uppercase mt-0.5">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
}
