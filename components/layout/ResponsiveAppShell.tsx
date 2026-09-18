"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DesktopSidebar } from "./DesktopSidebar";
import { TabletNavRail } from "./TabletNavRail";
import { MobileBottomNav } from "./MobileBottomNav";
import { cn } from "@/lib/utils";
import { JourneyPreferencesSheet } from "@/components/home/JourneyPreferencesSheet";
import { DestinationSearchSheet } from "@/components/home/DestinationSearchSheet";
import { VoiceSearchModal } from "@/components/shared/VoiceSearchModal";
import { AssistanceSheet } from "@/components/live/AssistanceSheet";
import { MobilityConfirmationDialog } from "@/components/live/MobilityConfirmationDialog";

interface ResponsiveAppShellProps {
  children: React.ReactNode;
}

export function ResponsiveAppShell({ children }: ResponsiveAppShellProps) {
  const pathname = usePathname();
  const isLive = pathname === "/live";

  return (
    <div className="min-h-screen w-full bg-nova-bg flex flex-col antialiased">
      {/* 1. Desktop 240px Sidebar (>= 1024px) */}
      <DesktopSidebar />

      {/* 2. Tablet 76px Navigation Rail (768px - 1023px) */}
      <TabletNavRail />

      {/* 3. Main Responsive Content Container */}
      <div
        className={cn(
          "flex-1 flex flex-col w-full transition-all duration-200",
          // Left padding for tablet and desktop navigation (prevents width overflow)
          "md:pl-[76px] lg:pl-[240px]",
          // Bottom padding for mobile floating dock (not on live)
          !isLive && "pb-24 md:pb-8",
        )}
      >
        <div
          className={cn(
            "w-full flex-1 flex flex-col",
            // For live view on desktop, let map expand cleanly
            isLive ? "p-0" : "max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-5",
          )}
        >
          {children}
        </div>
      </div>

      {/* 4. Mobile Floating Bottom Navigation (< 768px) */}
      <MobileBottomNav />

      {/* 5. Global Modals & Sheets accessible from any page */}
      <DestinationSearchSheet />
      <JourneyPreferencesSheet />
      <VoiceSearchModal />
      <AssistanceSheet />
      <MobilityConfirmationDialog />
    </div>
  );
}
