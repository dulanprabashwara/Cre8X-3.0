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
      className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 w-[220px] bg-white/95 backdrop-blur-md border-r border-nova-border/70 flex-col justify-between p-4 select-none shadow-xs"
    >
      <div className="space-y-5">
        <NovaLogo />

        <nav className="space-y-1" aria-label="Main Navigation">
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
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-heading font-medium transition-all duration-200",
                  isActive
                    ? "bg-nova-green-soft text-nova-green shadow-xs"
                    : "text-nova-text-secondary hover:bg-nova-surface hover:text-nova-text-primary",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg",
                      isActive ? "bg-nova-green text-white" : "bg-transparent",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-heading font-semibold",
                      isActive
                        ? "bg-nova-green/10 text-nova-green"
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
      </div>

      <div className="space-y-2 border-t border-nova-border/60 pt-3">
        <button
          onClick={() => setPreferencesSheetOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-heading font-medium text-nova-text-secondary transition-colors hover:bg-nova-surface hover:text-nova-text-primary"
        >
          <Accessibility className="w-4 h-4" />
          Accessibility
        </button>

        <button
          onClick={() => setAssistanceSheetOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-heading font-medium text-nova-text-secondary transition-colors hover:bg-nova-surface hover:text-nova-text-primary"
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </button>

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-heading font-medium text-nova-text-secondary transition-colors hover:bg-nova-surface hover:text-nova-text-primary"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#231D2B] to-[#3B3247] text-[11px] font-bold text-white">
            NT
          </div>
          Nove traveler
        </Link>
      </div>
    </aside>
  );
}
