"use client";

import React, { useState } from "react";
import { Activity, Radio, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkTopologyMapProps {
  selectedSystemId: string | null;
  onSelectSystem: (id: string | null) => void;
}

export function NetworkTopologyMap({
  selectedSystemId,
  onSelectSystem,
}: NetworkTopologyMapProps) {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] bg-[#F5EFF8] rounded-panel border border-nova-border/70 overflow-hidden select-none shadow-sm flex flex-col justify-between">
      {/* Top Floating Info Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none flex-wrap gap-2">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-nova-border/80 shadow-xs flex items-center gap-2">
          <Activity className="w-4 h-4 text-nova-green" />
          <span className="text-[12px] font-heading font-bold text-nova-text-primary">
            Citywide Topology Grid
          </span>
          <span className="px-2 py-0.5 rounded-full bg-nova-green-soft text-nova-green text-[12px] font-heading font-bold">
            99.4% Online
          </span>
        </div>

        {/* Advisory Tag Indicator */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-nova-border/80 shadow-xs flex items-center gap-1.5 text-[12px] font-heading font-semibold text-nova-coral">
          <span className="w-2 h-2 rounded-full bg-nova-coral animate-ping" />
          <span>AeroLink A12 Coastal Crosswind Zone</span>
        </div>
      </div>

      {/* SVG City Network Schematic */}
      <svg
        viewBox="0 0 640 440"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="net-trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2FAE63" />
            <stop offset="60%" stopColor="#2FAE63" />
            <stop offset="100%" stopColor="#E85F8E" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="net-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Grid Matrix */}
        <g stroke="#E8E0EE" strokeWidth="0.8" opacity="0.55">
          {[80, 160, 240, 320, 400, 480, 560].map((x) => (
            <line key={`nvx-${x}`} x1={x} y1="0" x2={x} y2="440" />
          ))}
          {[80, 160, 240, 320, 400].map((y) => (
            <line key={`nhy-${y}`} x1="0" y1={y} x2="640" y2={y} />
          ))}
        </g>

        {/* Coastline shape */}
        <path
          d="M 60 440 C 140 360, 220 300, 290 200 C 360 110, 460 60, 640 20 L 640 0 L 0 0 L 0 440 Z"
          fill="#ECE5F2"
          opacity="0.5"
        />

        {/* Weather Advisory Zone (Coral circle overlay) */}
        <g opacity="0.75">
          <circle
            cx="490"
            cy="110"
            r="64"
            fill="#FFF0F4"
            stroke="#E85F8E"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <text
            x="490"
            y="55"
            textAnchor="middle"
            fill="#E85F8E"
            fontSize="10"
            fontWeight="700"
            fontFamily="var(--font-space-grotesk)"
          >
            AeroLink Wind Buffer Area
          </text>
        </g>

        {/* 1. Pod Feeder Network (Green dashed lines) */}
        <g
          className={cn(
            "transition-opacity duration-300",
            selectedSystemId && selectedSystemId !== "pods" ? "opacity-25" : "opacity-100",
          )}
        >
          <path
            d="M 110 350 L 190 280 M 110 350 L 150 410 M 190 280 L 260 360 M 330 210 L 370 290"
            fill="none"
            stroke="#2FAE63"
            strokeWidth="3"
            strokeDasharray="4 3"
          />
        </g>

        {/* 2. HyperRail Trunk System (Heavy primary line) */}
        <g
          className={cn(
            "transition-opacity duration-300",
            selectedSystemId && selectedSystemId !== "hyperrail" ? "opacity-30" : "opacity-100",
          )}
        >
          <path
            d="M 110 350 Q 190 280, 330 210 T 490 110"
            fill="none"
            stroke="#DFD8E6"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 110 350 Q 190 280, 330 210 T 490 110"
            fill="none"
            stroke="url(#net-trunk-grad)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        {/* 3. AeroLink Aerial Corridors (Coral Lines) */}
        <g
          className={cn(
            "transition-opacity duration-300",
            selectedSystemId && selectedSystemId !== "aerolink" ? "opacity-30" : "opacity-100",
          )}
        >
          <path
            d="M 330 210 Q 420 130, 490 110"
            fill="none"
            stroke="#E85F8E"
            strokeWidth="4"
            strokeDasharray="6 4"
          />
          {/* Active AeroLink shuttle */}
          <circle cx="430" cy="142" r="5" fill="#E85F8E" className="animate-ping" opacity="0.7" />
          <circle cx="430" cy="142" r="4" fill="#E85F8E" />
        </g>

        {/* 4. Smart Roads (Purple/Gray synchronized tracks) */}
        <g
          className={cn(
            "transition-opacity duration-300",
            selectedSystemId && selectedSystemId !== "smartroads" ? "opacity-25" : "opacity-100",
          )}
        >
          <path
            d="M 190 280 Q 230 200, 250 140 M 330 210 L 250 140"
            fill="none"
            stroke="#655D6F"
            strokeWidth="3"
            strokeDasharray="5 3"
          />
        </g>

        {/* Primary Station Hubs */}
        {[
          { name: "KDU Mobility Hub", x: 110, y: 350, code: "KDU", status: "ok" },
          { name: "Ratmalana District", x: 190, y: 280, code: "RAT", status: "ok" },
          { name: "Central Skyport", x: 330, y: 210, code: "CTR", status: "ok" },
          { name: "Port City Ocean Hub", x: 250, y: 140, code: "PCO", status: "ok" },
          { name: "Colombo Skyport", x: 490, y: 110, code: "CSK", status: "advisory" },
        ].map((hub) => {
          const isAdvisory = hub.status === "advisory";

          return (
            <g key={hub.code} className="cursor-pointer">
              {/* Outer circle */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r="16"
                fill={isAdvisory ? "#E85F8E" : "#2FAE63"}
                opacity={isAdvisory ? "0.2" : "0.15"}
              />

              {/* Node core */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r="8"
                fill="#FFFFFF"
                stroke={isAdvisory ? "#E85F8E" : "#2FAE63"}
                strokeWidth="3.5"
                filter="url(#net-glow)"
              />

              {/* Station Label */}
              <rect
                x={hub.x - 56}
                y={hub.y + 14}
                width="112"
                height="22"
                rx="6"
                fill="#FFFFFF"
                fillOpacity="0.95"
                stroke="#DDD6E3"
                strokeWidth="1"
                className="shadow-xs"
              />
              <text
                x={hub.x}
                y={hub.y + 28}
                textAnchor="middle"
                fill="#231D2B"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-space-grotesk)"
              >
                {hub.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Bottom Mode Filter Pills Row */}
      <div className="p-3 bg-white/95 backdrop-blur-md border-t border-nova-border/70 flex items-center justify-between gap-2 z-20 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted px-1">
            Focus System:
          </span>
          <button
            onClick={() => onSelectSystem(null)}
            className={cn(
              "px-3 py-1 rounded-full text-[12px] font-heading font-semibold transition-colors shrink-0",
              selectedSystemId === null
                ? "bg-nova-text-primary text-white"
                : "bg-nova-surface text-nova-text-secondary hover:bg-nova-surface-hover",
            )}
          >
            All Lines
          </button>
          {[
            { id: "pods", label: "Pods" },
            { id: "hyperrail", label: "HyperRail" },
            { id: "aerolink", label: "AeroLink" },
            { id: "smartroads", label: "Smart Roads" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => onSelectSystem(selectedSystemId === mode.id ? null : mode.id)}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-heading font-semibold transition-colors shrink-0",
                selectedSystemId === mode.id
                  ? "bg-nova-green text-white"
                  : "bg-nova-surface text-nova-text-secondary hover:bg-nova-surface-hover",
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[12px] font-heading font-medium text-nova-text-secondary pr-1 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-nova-green" />
            Normal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-nova-warning" />
            High Load
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-nova-coral" />
            Advisory
          </span>
        </div>
      </div>
    </div>
  );
}
