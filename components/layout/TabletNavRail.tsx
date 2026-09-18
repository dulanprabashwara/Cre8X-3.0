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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useJourney } from "@/context/JourneyContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trips", label: "Trips", icon: Route },
  { href: "/network", label: "Network", icon: Activity },
  { href: "/profile", label: "Profile", icon: User },
];

export function TabletNavRail() {
  const pathname = usePathname();
  const { setPreferencesSheetOpen } = useJourney();

  // On Live Journey, rail remains as a subtle anchor or can be minimized
  const isLive = pathname === "/live";

  return (
    <aside
      aria-label="Tablet Navigation Rail"
      className={cn(
        "hidden md:flex lg:hidden fixed top-0 left-0 bottom-0 z-40 w-[76px] bg-white/95 backdrop-blur-md border-r border-nova-border/70 flex-col items-center py-5 justify-between select-none shadow-xs",
        isLive && "opacity-90",
      )}
    >
      {/* Top: NOVA Bioluminescent Logo Mark */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/"
          aria-label="NOVA 2100 Home"
          className="w-11 h-11 rounded-2xl bg-white border border-nova-border/80 shadow-xs flex items-center justify-center group active:scale-95 transition-transform"
        >
          <div className="relative">
            <span className="font-heading font-extrabold text-[20px] text-nova-text-primary tracking-tighter">
              N
            </span>
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-nova-green shadow-sm animate-pulse" />
          </div>
        </Link>
      </div>

      {/* Middle: 5 Primary Navigation Icons */}
      <nav className="flex flex-col items-center gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              className={cn(
                "relative group w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl flex flex-col items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-nova-green-soft text-nova-green font-semibold shadow-xs"
                  : "text-nova-text-muted hover:text-nova-text-primary hover:bg-nova-surface",
              )}
            >
              {/* Active Green Indicator Bar */}
              {isActive && (
                <span className="absolute -left-1 w-1.5 h-6 bg-nova-green rounded-r-full" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[12px] font-heading font-medium tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>

              {/* Hover Tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 bg-nova-text-primary text-white text-[12px] font-heading rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md whitespace-nowrap z-50">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Accessibility & Profile */}
      <div className="flex flex-col items-center gap-2">
        {/* Accessibility quick modal */}
        <button
          onClick={() => setPreferencesSheetOpen(true)}
          title="Accessibility & Preferences"
          aria-label="Accessibility & Preferences"
          className="w-11 h-11 rounded-xl bg-nova-surface/80 border border-nova-border/60 hover:bg-nova-surface text-nova-text-secondary hover:text-nova-text-primary flex items-center justify-center transition-colors"
        >
          <Accessibility className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <Link
          href="/profile"
          title="Passenger Profile"
          aria-label="Passenger Profile"
          className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#231D2B] to-[#3B3247] p-0.5 shadow-xs flex items-center justify-center active:scale-95 transition-transform"
        >
          <div className="w-full h-full rounded-[10px] bg-[#2A2333] flex items-center justify-center text-white/90">
            <span className="text-[12px] font-heading font-bold tracking-wider text-white/90">
              PX
            </span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-nova-green border-2 border-white shadow-xs" />
        </Link>
      </div>
    </aside>
  );
}
