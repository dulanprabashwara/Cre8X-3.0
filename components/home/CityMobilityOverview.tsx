"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Route,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { TRANSPORT_SYSTEMS } from "@/data/network";
import { cn } from "@/lib/utils";

export function CityMobilityOverview() {
  const router = useRouter();
  const { setDestination, destination, startPlanning } = useJourney();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hubs = [
    {
      id: "kdu",
      name: "KDU Mobility Hub",
      role: "Origin / Feeder Terminal",
      x: 100,
      y: 330,
      color: "#2FAE63",
      isOrigin: true,
    },
    {
      id: "ratmalana",
      name: "Ratmalana District",
      role: "Residential Transit Sector",
      x: 180,
      y: 260,
      color: "#2FAE63",
      destId: "home-ratmalana",
    },
    {
      id: "central",
      name: "Central Skyport",
      role: "Trunk Transfer Terminal",
      x: 320,
      y: 190,
      color: "#2FAE63",
      destId: "central-district",
    },
    {
      id: "colombo",
      name: "Colombo Skyport",
      role: "Air Mobility Hub",
      x: 480,
      y: 110,
      color: "#E85F8E",
      destId: "colombo-skyport",
    },
  ];

  const handleSelectHub = (destId?: string) => {
    if (!destId) return;
    const target = DESTINATIONS.find((d) => d.id === destId);
    if (target) {
      setDestination(target);
    }
  };

  const handleQuickPlan = (dest: DestinationItem) => {
    setDestination(dest);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* 1. Interactive City Mobility Map Card */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-[18px] text-nova-text-primary tracking-tight">
                City Mobility Overview
              </h2>
              <p className="text-[12px] font-heading font-medium text-nova-text-secondary">
                Real-time active corridors & transit nodes
              </p>
            </div>
          </div>

          <Link
            href="/network"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nova-surface hover:bg-nova-surface-hover border border-nova-border/60 text-[12px] font-heading font-semibold text-nova-text-secondary hover:text-nova-text-primary transition-colors"
          >
            <span>Network Health</span>
            <ArrowRight className="w-3.5 h-3.5 text-nova-green" />
          </Link>
        </div>

        {/* SVG Custom City Map Canvas */}
        <div className="relative w-full h-[260px] sm:h-[300px] bg-[#F5F1F8] rounded-2xl overflow-hidden border border-nova-border/60 select-none">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="corridor-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2FAE63" />
                <stop offset="60%" stopColor="#2FAE63" />
                <stop offset="100%" stopColor="#E85F8E" />
              </linearGradient>

              <filter id="hub-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid Pattern Lines */}
            <g stroke="#E8E2EE" strokeWidth="0.8" opacity="0.6">
              {[80, 160, 240, 320, 400, 480, 560].map((x) => (
                <line key={`vx-${x}`} x1={x} y1="0" x2={x} y2="400" />
              ))}
              {[80, 160, 240, 320].map((y) => (
                <line key={`hy-${y}`} x1="0" y1={y} x2="600" y2={y} />
              ))}
            </g>

            {/* Coastline / Water Accent */}
            <path
              d="M 40 400 C 120 320, 200 280, 300 180 C 380 100, 460 60, 600 20 L 600 0 L 0 0 L 0 400 Z"
              fill="#EFE9F5"
              opacity="0.5"
            />

            {/* Main Multimodal Trunk Line */}
            <path
              d="M 100 330 Q 180 260, 320 190 T 480 110"
              fill="none"
              stroke="#E2DCE8"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 100 330 Q 180 260, 320 190 T 480 110"
              fill="none"
              stroke="url(#corridor-flow)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Secondary Corridors */}
            <path
              d="M 180 260 Q 240 340, 360 330"
              fill="none"
              stroke="#D4CDDD"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            <path
              d="M 320 190 Q 420 280, 520 250"
              fill="none"
              stroke="#D4CDDD"
              strokeWidth="3"
              strokeDasharray="4 4"
            />

            {/* Feeder Pods Pulse */}
            <circle cx="210" cy="240" r="4" fill="#2FAE63" className="animate-ping" opacity="0.6" />
            <circle cx="210" cy="240" r="3.5" fill="#2FAE63" />

            <circle cx="400" cy="150" r="4" fill="#E85F8E" className="animate-ping" opacity="0.6" />
            <circle cx="400" cy="150" r="3.5" fill="#E85F8E" />

            {/* Hub Nodes */}
            {hubs.map((hub) => {
              const isSelected = destination.name.toLowerCase().includes(hub.name.toLowerCase().split(" ")[0]);
              const isHovered = hoveredNode === hub.id;

              return (
                <g
                  key={hub.id}
                  role="button"
                  tabIndex={hub.destId ? 0 : -1}
                  aria-label={`Select hub ${hub.name}`}
                  className="cursor-pointer transition-transform focus:outline-hidden"
                  onMouseEnter={() => setHoveredNode(hub.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onFocus={() => setHoveredNode(hub.id)}
                  onBlur={() => setHoveredNode(null)}
                  onClick={() => handleSelectHub(hub.destId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectHub(hub.destId);
                    }
                  }}
                >
                  {/* Outer pulse */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected || isHovered ? 18 : 14}
                    fill={hub.color}
                    opacity={isSelected || isHovered ? 0.25 : 0.12}
                    className="transition-all duration-300"
                  />

                  {/* Node Circle */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected || isHovered ? 9 : 7}
                    fill="#FFFFFF"
                    stroke={hub.color}
                    strokeWidth={isSelected || isHovered ? 4 : 3}
                    filter="url(#hub-glow)"
                    className="transition-all duration-200"
                  />

                  {/* Hub Label Badge */}
                  <rect
                    x={hub.x - 55}
                    y={hub.y + 14}
                    width="110"
                    height="24"
                    rx="6"
                    fill="#FFFFFF"
                    fillOpacity="0.95"
                    stroke="#DDD6E3"
                    strokeWidth="1"
                    className="shadow-xs"
                  />
                  <text
                    x={hub.x}
                    y={hub.y + 29}
                    textAnchor="middle"
                    fill="#231D2B"
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="var(--font-space-grotesk)"
                  >
                    {hub.name.split(" ")[0]} Hub
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Map Legend */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-nova-border/60 shadow-xs flex items-center gap-3 text-[12px] font-heading font-medium text-nova-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-nova-green" />
              Optimal Line
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-nova-coral" />
              Dynamic AeroLink
            </span>
          </div>

          {/* Click to select hint */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-nova-border/60 shadow-xs text-[12px] font-heading font-semibold text-nova-green flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            <span>Interactive Nodes</span>
          </div>
        </div>

        {/* 2. System Modes Status Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          {TRANSPORT_SYSTEMS.map((sys) => {
            const isOptimal = sys.status === "operational";
            const isWarning = sys.status === "warning";

            return (
              <div
                key={sys.id}
                className="p-2.5 rounded-xl bg-nova-surface/80 border border-nova-border/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
                    {sys.shortCode}
                  </span>
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      isOptimal && "bg-nova-green",
                      isWarning && "bg-nova-warning animate-pulse",
                      sys.status === "advisory" && "bg-nova-coral",
                    )}
                  />
                </div>
                <div className="mt-1">
                  <p className="text-[12px] font-heading font-bold text-nova-text-primary truncate">
                    {sys.name.split(" ")[0]}
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary truncate">
                    {sys.statusText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Quick / Recent Destinations Grid */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nova-coral" />
            <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
              Frequent & Recommended Hubs
            </h3>
          </div>
          <Link
            href="/explore"
            className="text-[12px] font-heading font-semibold text-nova-green hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <button
              type="button"
              key={dest.id}
              className="p-3.5 rounded-2xl bg-nova-surface hover:bg-[#F2EDF7] border border-nova-border/60 transition-all flex items-center justify-between group cursor-pointer text-left w-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-nova-green"
              onClick={() => handleQuickPlan(dest)}
              aria-label={`Plan journey to ${dest.name}, ${dest.district}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-nova-border/70 flex items-center justify-center text-nova-green group-hover:scale-105 transition-transform shadow-xs shrink-0">
                  <Route className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
                    {dest.name}
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary truncate">
                    {dest.district} · {dest.durationMinutes} min
                  </p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="w-9 h-9 min-w-[36px] rounded-xl bg-white border border-nova-border/80 group-hover:bg-nova-green group-hover:text-white group-hover:border-nova-green text-nova-text-secondary flex items-center justify-center transition-all shadow-2xs shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Upcoming Journey Quick Banner */}
      <div className="bg-gradient-to-r from-nova-green-soft to-white rounded-panel border border-nova-green/30 p-4 sm:p-5 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nova-green text-white flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-green bg-white px-2 py-0.5 rounded-full border border-nova-green/30">
                Upcoming Trip
              </span>
              <span className="text-[12px] font-heading text-nova-text-secondary font-medium">
                Tomorrow · 09:18 AM
              </span>
            </div>
            <p className="font-heading font-bold text-[15px] text-nova-text-primary mt-0.5">
              Colombo Skyport · 24 min
            </p>
          </div>
        </div>

        <Link
          href="/trips"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-nova-border/80 hover:bg-nova-surface text-[13px] font-heading font-semibold text-nova-text-primary shadow-2xs transition-colors"
        >
          <span>View In Trips</span>
          <ArrowRight className="w-4 h-4 text-nova-green" />
        </Link>
      </div>
    </div>
  );
}
