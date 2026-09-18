"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Compass,
  Route,
  Activity,
  User,
  Accessibility,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NovaLogo } from "@/components/shared/NovaLogo";
import { useJourney } from "@/context/JourneyContext";

interface NavItem {
  href: string;
  label: string;
  badge?: string;
  icon: React.ElementType;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trips", label: "Trips", badge: "1 Active", icon: Route },
  { href: "/network", label: "Network", badge: "Normal", icon: Activity },
  { href: "/profile", label: "Profile", icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();
  const { setPreferencesSheetOpen, setAssistanceSheetOpen } = useJourney();

  return (
    <aside
      aria-label="Desktop Navigation Sidebar"
      className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 w-[240px] bg-white/95 backdrop-blur-md border-r border-nova-border/70 flex-col justify-between p-5 select-none shadow-xs"
    >
      {/* Top Section: Brand & System Badge */}
      <div className="space-y-6">
        <div>
          <NovaLogo />
          {/* Subtitle status badge */}
          <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-nova-surface border border-nova-border/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nova-green" />
            </span>
            <span className="text-[12px] font-heading font-medium text-nova-text-secondary truncate">
              Network Operating Normally
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          <p className="px-2 pb-1 text-[12px] font-heading font-semibold uppercase tracking-wider text-nova-text-muted">
            Menu
          </p>
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-heading font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-nova-green-soft text-nova-green font-semibold shadow-xs"
                    : "text-nova-text-secondary hover:text-nova-text-primary hover:bg-nova-surface",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1 rounded-lg transition-colors",
                      isActive
                        ? "bg-nova-green text-white"
                        : "text-nova-text-secondary group-hover:text-nova-text-primary",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[12px] font-heading font-semibold tracking-wide",
                      isActive
                        ? "bg-nova-green/20 text-nova-green"
                        : item.badge === "1 Active"
                          ? "bg-nova-coral-soft text-nova-coral border border-nova-coral/30"
                          : "bg-nova-surface text-nova-text-muted",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* System & Support Utilities */}
        <div className="pt-2 space-y-1.5 border-t border-nova-border/60">
          <p className="px-2 pb-1 text-[12px] font-heading font-semibold uppercase tracking-wider text-nova-text-muted">
            Preferences & Support
          </p>
          <button
            onClick={() => setPreferencesSheetOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-heading font-medium text-nova-text-secondary hover:text-nova-text-primary hover:bg-nova-surface transition-colors text-left"
          >
            <div className="p-1 rounded-lg text-nova-text-secondary">
              <Accessibility className="w-4 h-4" />
            </div>
            <span>Accessibility & Travel</span>
          </button>

          <button
            onClick={() => setAssistanceSheetOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-heading font-medium text-nova-text-secondary hover:text-nova-text-primary hover:bg-nova-surface transition-colors text-left"
          >
            <div className="p-1 rounded-lg text-nova-text-secondary">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span>Mobility Assistance</span>
          </button>
        </div>
      </div>

      {/* Bottom: Passenger Profile Card */}
      <div className="pt-4 border-t border-nova-border/60">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-nova-surface transition-colors group"
        >
          <div className="relative w-10 h-10 min-w-[40px] rounded-xl bg-gradient-to-br from-[#231D2B] to-[#3B3247] p-0.5 shadow-xs flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-[#2A2333] flex items-center justify-center text-white/90">
              <span className="text-[12px] font-heading font-bold tracking-wider text-white">
                PX
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-nova-green border-2 border-white shadow-xs" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-heading font-bold text-nova-text-primary truncate group-hover:text-nova-green transition-colors">
              Passenger 8492-X
            </p>
            <p className="text-[12px] font-heading text-nova-text-muted truncate">
              Biometric Transit Pass
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
