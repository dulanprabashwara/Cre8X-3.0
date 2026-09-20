"use client";

import React from "react";
import { Route } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { METHOD_CONFIGS } from "@/lib/journeyPlanner";

export function JourneyRouteMap() {
  const { currentJourney, selectedMethod } = useJourney();
  const config = METHOD_CONFIGS[selectedMethod];

  const stops = [
    {
      name: currentJourney.origin,
      time: currentJourney.departureTime,
      mode: "Start",
      x: 80,
      y: 130,
    },
    {
      name: config.vehicleName,
      time: "Non-stop",
      mode: config.label,
      x: 240,
      y: 90,
    },
    {
      name: currentJourney.destination,
      time: currentJourney.arrivalTime,
      mode: "Arrival",
      x: 400,
      y: 50,
    },
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
              Direct Corridor Map
            </h3>
            <p className="text-[12px] font-heading text-nova-text-secondary">
              Direct connection via {config.label}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold uppercase tracking-wider">
          Arrival Protected
        </span>
      </div>

      {/* SVG Corridor Visualization */}
      <div className="relative w-full h-[180px] bg-[#F5F0F8] rounded-xl overflow-hidden border border-nova-border/60 select-none">
        <svg
          viewBox="0 0 480 180"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="j-route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2FAE63" />
              <stop offset="65%" stopColor="#2FAE63" />
              <stop offset="100%" stopColor="#EE6F72" />
            </linearGradient>
            <filter
              id="j-node-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <g stroke="#E8E0EC" strokeWidth="1" strokeDasharray="3 4">
            <line x1="0" y1="40" x2="480" y2="40" />
            <line x1="0" y1="90" x2="480" y2="90" />
            <line x1="0" y1="140" x2="480" y2="140" />
            <line x1="120" y1="0" x2="120" y2="180" />
            <line x1="240" y1="0" x2="240" y2="180" />
            <line x1="360" y1="0" x2="360" y2="180" />
          </g>

          {/* Direct Route Corridor Path */}
          <path
            d="M 80,130 C 160,110 320,70 400,50"
            fill="none"
            stroke="url(#j-route-grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Animated Glow Dash overlay */}
          <path
            d="M 80,130 C 160,110 320,70 400,50"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Stops */}
          {stops.map((stop, i) => {
            const isFirst = i === 0;
            const isMid = i === 1;
            const isLast = i === stops.length - 1;

            return (
              <g key={stop.name}>
                {/* Outer halo */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isMid ? 6 : 9}
                  fill={isLast ? "#EE6F72" : "#2FAE63"}
                  opacity="0.2"
                />

                {/* Main node */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isMid ? 4.5 : 6.5}
                  fill={isLast ? "#EE6F72" : isFirst ? "#2FAE63" : "#FFFFFF"}
                  stroke={isMid ? "#2FAE63" : "#FFFFFF"}
                  strokeWidth="2"
                  filter="url(#j-node-glow)"
                />

                {/* Stop time */}
                <text
                  x={stop.x}
                  y={stop.y + (isMid ? -16 : 22)}
                  textAnchor="middle"
                  className="text-[12px] font-heading font-bold"
                  fill={isLast ? "#EE6F72" : isFirst ? "#2FAE63" : "#625B71"}
                >
                  {stop.time}
                </text>

                {/* Stop name */}
                <text
                  x={stop.x}
                  y={stop.y + (isMid ? -28 : 36)}
                  textAnchor="middle"
                  className="text-[12px] font-heading font-semibold"
                  fill="#1C1B1F"
                >
                  {stop.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Corridor Summary Badges */}
      <div className="flex items-center justify-between text-[12px] text-nova-text-secondary pt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-nova-green" />
          <span>{currentJourney.durationMinutes} min non-stop transit</span>
        </span>
        <span className="font-heading font-medium text-nova-text-primary">
          Step-free boarding confirmed
        </span>
      </div>
    </div>
  );
}
