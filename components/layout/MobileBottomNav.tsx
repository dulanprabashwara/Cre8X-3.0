"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Compass, Route, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide global navigation during Live Journey
  if (pathname === "/live") {
    return null;
  }

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-4 pt-1 px-3 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-nova-border/80 rounded-full py-1 px-2 shadow-dock flex items-center gap-1 max-w-[420px] w-full justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2.5 rounded-full transition-all duration-200 select-none",
                isActive
                  ? "bg-nova-green-soft text-nova-green font-semibold"
                  : "text-nova-text-muted hover:text-nova-text-primary",
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-full transition-colors",
                  isActive && "bg-nova-green text-white shadow-xs",
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-heading font-medium tracking-wide leading-none mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
