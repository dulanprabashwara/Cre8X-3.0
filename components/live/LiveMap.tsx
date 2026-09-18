"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crosshair, Headphones } from "lucide-react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { VehicleMarker } from "./VehicleMarker";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export function LiveMap() {
  const { liveMode, setLiveMode, routeVariant, simulationPhase, showToast } =
    useJourney();

  const [audioActive, setAudioActive] = useState(false);

  const toggleAudio = () => {
    setAudioActive(!audioActive);
    showToast(
      !audioActive ? "Audio journey guidance enabled" : "Audio guidance muted",
      "info",
    );
  };

  const handleRecenter = () => {
    showToast("Map view centered on vehicle");
  };

  // Node coordinates on 400 x 480 canvas
  const kduPos = { x: 96, y: 420 };
  const ratmalanaPos = { x: 165, y: 322 };
  const centralSkyportPos = { x: 226, y: 236 };
  const colomboSkyportPos = { x: 304, y: 154 };

  // Vehicle position shifts based on simulation phase
  const vehiclePos =
    simulationPhase === "normal_travel"
      ? { x: 206, y: 264, angle: -38 }
      : simulationPhase === "approaching_transfer"
        ? { x: 220, y: 244, angle: -36 }
        : { x: 226, y: 236, angle: -42 };

  return (
    <div className="relative w-full h-[460px] sm:h-[500px] bg-[#F3EEF7] overflow-hidden select-none border-b border-nova-border/50">
      {/* Top Floating Controls Row */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Map / Instructions Segmented Control */}
        <div className="pointer-events-auto shadow-dock rounded-full">
          <SegmentedControl
            options={[
              { value: "map", label: "Map" },
              { value: "instructions", label: "Instructions" },
            ]}
            value={liveMode}
            onChange={setLiveMode}
            size="md"
          />
        </div>

        {/* Action Buttons (Recenter + Audio) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            aria-label="Recenter map"
            title="Recenter Map"
            className="w-11 h-11 rounded-full bg-white border border-nova-border/80 shadow-dock hover:bg-nova-surface text-nova-text-primary flex items-center justify-center transition-transform active:scale-95"
          >
            <Crosshair className="w-5 h-5 text-nova-text-secondary" />
          </button>

          {/* Audio Guidance Button */}
          <button
            onClick={toggleAudio}
            aria-label="Toggle audio guidance"
            title="Toggle Audio Guidance"
            className={cn(
              "w-11 h-11 rounded-full border shadow-dock flex items-center justify-center transition-all active:scale-95",
              audioActive
                ? "bg-nova-green border-nova-green text-white"
                : "bg-white border-nova-border/80 text-nova-text-secondary hover:bg-nova-surface hover:text-nova-text-primary",
            )}
          >
            <Headphones className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SVG Custom Map Render */}
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Coral Gradient for future route */}
          <linearGradient
            id="coral-future-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E85F8E" />
            <stop offset="52%" stopColor="#EE6F72" />
            <stop offset="100%" stopColor="#F28B5B" />
          </linearGradient>

          {/* New Reroute Gradient (Signature green -> coral transition) */}
          <linearGradient
            id="reroute-anim-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2FAE63" />
            <stop offset="50%" stopColor="#41C579" />
            <stop offset="100%" stopColor="#EE6F72" />
          </linearGradient>

          {/* Soft Drop Shadows for Labels & Cards */}
          <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* 1. Map Base Canvas */}
        <rect width="400" height="480" fill="#F3EEF7" />

        {/* 2. Secondary Regional Districts & Water Features */}
        <path
          d="M-20,120 Q120,90 200,160 T420,130 L420,0 L-20,0 Z"
          fill="#ECE6F1"
        />
        {/* Water Bay feature top right */}
        <path
          d="M240,-10 Q300,50 360,30 T430,70 L430,-20 Z"
          fill="#E4EEF0"
          opacity="0.85"
        />
        {/* District curved boundary bottom */}
        <path
          d="M-20,280 Q100,240 240,320 T420,380 L420,500 L-20,500 Z"
          fill="#ECE6F1"
          opacity="0.75"
        />

        {/* 3. Dotted Road / Transit Grid Networks */}
        <g stroke="#CFC7D5" strokeWidth="1" strokeDasharray="3 4" fill="none">
          <path d="M-10,380 C110,390 260,340 410,290" />
          <path d="M140,-10 C150,150 120,340 100,490" />
          <path d="M-20,220 C180,210 320,280 420,270" />
          <path d="M260,-10 C270,140 290,320 310,490" />
          <circle
            cx="230"
            cy="240"
            r="130"
            strokeOpacity="0.4"
            strokeDasharray="4 6"
          />
        </g>

        {/* 4. Futuristic City Architecture Blocks (Rounded buildings matching screenshot) */}
        <g fill="#E5DFE9" stroke="#D6CEDD" strokeWidth="1.2">
          {/* Top-right clusters near Colombo Skyport */}
          <rect x="264" y="148" width="56" height="68" rx="8" />
          <rect x="218" y="156" width="34" height="48" rx="7" />
          <rect x="230" y="270" width="40" height="36" rx="7" />

          {/* Central clusters */}
          <rect x="164" y="174" width="38" height="40" rx="7" />
          <rect x="214" y="96" width="36" height="42" rx="7" />
          <rect x="178" y="244" width="30" height="26" rx="6" />

          {/* West clusters */}
          <rect x="70" y="230" width="36" height="42" rx="7" />
          <rect x="118" y="242" width="26" height="38" rx="6" />
          <rect x="74" y="300" width="28" height="34" rx="6" />
          <rect x="106" y="306" width="24" height="24" rx="5" />
        </g>

        {/* 5. Transit Route Vectors */}
        {/* A. Travelled Route: KDU to Ratmalana (Muted translucent green) */}
        <path
          d={`M${kduPos.x},${kduPos.y} Q130,370 ${ratmalanaPos.x},${ratmalanaPos.y}`}
          stroke="rgba(47, 174, 99, 0.35)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* B. Active Route: Ratmalana to Central Skyport (Luciferin Green) */}
        <path
          d={`M${ratmalanaPos.x},${ratmalanaPos.y} Q195,280 ${centralSkyportPos.x},${centralSkyportPos.y}`}
          stroke="#2FAE63"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* C. Future Route: Central Skyport to Colombo Skyport */}
        {routeVariant === "original" ? (
          /* Original route: dashed Quantum Coral line */
          <motion.path
            key="original-future-path"
            d={`M${centralSkyportPos.x},${centralSkyportPos.y} Q265,195 ${colomboSkyportPos.x},${colomboSkyportPos.y}`}
            stroke="url(#coral-future-grad)"
            strokeWidth="3.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          /* Rerouted connection: Signature animated path transitioning green -> coral */
          <g key="rerouted-path-group">
            {/* Express alternate path */}
            <motion.path
              d={`M${centralSkyportPos.x},${centralSkyportPos.y} C280,210 270,170 ${colomboSkyportPos.x},${colomboSkyportPos.y}`}
              stroke="url(#reroute-anim-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
            {/* Ambient reroute pulse line */}
            <motion.path
              d={`M${centralSkyportPos.x},${centralSkyportPos.y} C280,210 270,170 ${colomboSkyportPos.x},${colomboSkyportPos.y}`}
              stroke="#2FAE63"
              strokeWidth="9"
              strokeOpacity="0.25"
              strokeLinecap="round"
              fill="none"
              animate={{ strokeOpacity: [0.15, 0.4, 0.15] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>
        )}

        {/* 6. Station Nodes & Badges */}
        {/* KDU Node */}
        <g transform={`translate(${kduPos.x}, ${kduPos.y})`}>
          <circle r="4" fill="#FFFFFF" stroke="#655D6F" strokeWidth="1.5" />
          <text
            x="8"
            y="3"
            fontSize="10"
            fontFamily="var(--font-space-grotesk)"
            fontWeight="600"
            fill="#655D6F"
          >
            KDU
          </text>
        </g>

        {/* Ratmalana Node */}
        <g transform={`translate(${ratmalanaPos.x}, ${ratmalanaPos.y})`}>
          <circle r="4.5" fill="#FFFFFF" stroke="#2FAE63" strokeWidth="2" />
          <text
            x="8"
            y="4"
            fontSize="11"
            fontFamily="var(--font-space-grotesk)"
            fontWeight="600"
            fill="#655D6F"
          >
            Ratmalana
          </text>
        </g>

        {/* Central Skyport Node & Floating Pill Badge */}
        <g
          transform={`translate(${centralSkyportPos.x}, ${centralSkyportPos.y})`}
        >
          {/* Node ring */}
          <circle r="6" fill="#FFFFFF" stroke="#2FAE63" strokeWidth="2.5" />
          <circle r="3" fill="#2FAE63" />

          {/* Prominent White Station Pill Badge */}
          <g transform="translate(10, -10)" filter="url(#map-shadow)">
            <rect
              width="82"
              height="22"
              rx="6"
              fill="#FFFFFF"
              stroke="#DDD6E3"
              strokeWidth="0.8"
            />
            <text
              x="8"
              y="15"
              fontSize="10"
              fontFamily="var(--font-space-grotesk)"
              fontWeight="700"
              fill="#231D2B"
            >
              Central Skyport
            </text>
          </g>
        </g>

        {/* Colombo Skyport Destination Node & Label */}
        <g
          transform={`translate(${colomboSkyportPos.x}, ${colomboSkyportPos.y})`}
        >
          {/* Target circular marker */}
          <circle r="7" fill="#FFFFFF" stroke="#E85F8E" strokeWidth="2" />
          <circle r="3.5" fill="#E85F8E" />

          {/* Label */}
          <text
            x="-40"
            y="-10"
            fontSize="10"
            fontFamily="var(--font-space-grotesk)"
            fontWeight="600"
            fill="#655D6F"
          >
            Colombo Skyport
          </text>
        </g>

        {/* 7. Live Vehicle Marker */}
        <VehicleMarker
          x={vehiclePos.x}
          y={vehiclePos.y}
          angle={vehiclePos.angle}
        />
      </svg>
    </div>
  );
}
