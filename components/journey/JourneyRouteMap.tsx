"use client";

import React from "react";
import { Route, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export function JourneyRouteMap() {
  const { currentJourney } = useJourney();

  const stops = [
    { name: "KDU Mobility Hub", time: "09:18", mode: "Pod P17", x: 60, y: 150 },
    { name: "Ratmalana Station", time: "09:24", mode: "Transfer (3m)", x: 170, y: 110 },
    { name: "Central Skyport", time: "09:35", mode: "Gate 04 (3m)", x: 290, y: 70 },
    { name: "Colombo Skyport", time: "09:42", mode: "Arrival", x: 410, y: 40 },
  ];

  return (
    <div className="bg-white rounded-panel border border-nova-border/70 p-4 sm:p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-nova-green-soft text-nova-green">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[15px] text-nova-text-primary tracking-tight">
              Synchronized Corridor Map
            </h3>
            <p className="text-[12px] font-heading text-nova-text-secondary">
              Direct connection via HyperRail H4 & AeroLink
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold uppercase tracking-wider">
          Arrival Protected
        </span>
      </div>

      {/* SVG Corridor Visualization */}
      <div className="relative w-full h-[190px] bg-[#F5F0F8] rounded-xl overflow-hidden border border-nova-border/60 select-none">
        <svg
          viewBox="0 0 480 180"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="j-route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2FAE63" />
              <stop offset="65%" stopColor="#2FAE63" />
              <stop offset="100%" stopColor="#E85F8E" />
            </linearGradient>
            <filter id="j-node-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <g stroke="#E8E2EE" strokeWidth="0.8" opacity="0.6">
            {[60, 120, 180, 240, 300, 360, 420].map((x) => (
              <line key={`jx-${x}`} x1={x} y1="0" x2={x} y2="180" />
            ))}
            {[45, 90, 135].map((y) => (
              <line key={`jy-${y}`} x1="0" y1={y} x2="480" y2={y} />
            ))}
          </g>

          {/* Background Corridor line */}
          <path
            d="M 60 150 Q 170 110, 290 70 T 410 40"
            fill="none"
            stroke="#DFD8E6"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Active Gradient Line */}
          <path
            d="M 60 150 Q 170 110, 290 70 T 410 40"
            fill="none"
            stroke="url(#j-route-grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Active vehicle indicator */}
          <circle cx="210" cy="98" r="5" fill="#2FAE63" className="animate-ping" opacity="0.75" />
          <circle cx="210" cy="98" r="4" fill="#2FAE63" />

          {/* Stations / Hubs */}
          {stops.map((stop, idx) => (
            <g key={idx}>
              {/* Outer halo */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r="12"
                fill={idx === stops.length - 1 ? "#E85F8E" : "#2FAE63"}
                opacity="0.15"
              />
              {/* Core */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r="6"
                fill="#FFFFFF"
                stroke={idx === stops.length - 1 ? "#E85F8E" : "#2FAE63"}
                strokeWidth="3"
                filter="url(#j-node-glow)"
              />
              {/* Station name text */}
              <text
                x={stop.x}
                y={stop.y < 90 ? stop.y + 22 : stop.y - 12}
                textAnchor="middle"
                fill="#231D2B"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-space-grotesk)"
              >
                {stop.name.split(" ")[0]}
              </text>
              <text
                x={stop.x}
                y={stop.y < 90 ? stop.y + 32 : stop.y - 2}
                textAnchor="middle"
                fill="#655D6F"
                fontSize="9"
                fontWeight="500"
                fontFamily="var(--font-inter)"
              >
                {stop.time}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend overlay */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-nova-border/60 text-[12px] font-heading font-medium text-nova-text-secondary flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-nova-green" />
            Pod & HyperRail
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-nova-coral" />
            AeroLink Shuttle
          </span>
        </div>
      </div>
    </div>
  );
}
