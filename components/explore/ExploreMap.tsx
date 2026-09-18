"use client";

import React, { useState } from "react";
import {
  Navigation,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Check,
} from "lucide-react";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { SAVED_PLACES, SavedPlace } from "@/data/places";
import { useJourney } from "@/context/JourneyContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ExploreMapProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  modeFilter: string;
}

export function ExploreMap({ selectedId, onSelect, modeFilter }: ExploreMapProps) {
  const router = useRouter();
  const { setDestination, startPlanning, savedPlaces, addSavedPlace, removeSavedPlace } =
    useJourney();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hubs = [
    {
      id: "kdu-mobility-hub",
      name: "KDU Mobility Hub",
      district: "Origin Station",
      x: 100,
      y: 330,
      modes: ["Pod", "HyperRail"],
      stepFree: true,
      color: "#2FAE63",
      type: "hub",
    },
    {
      id: "home-ratmalana",
      name: "Ratmalana District",
      district: "Residential Sector",
      x: 180,
      y: 260,
      modes: ["Pod", "Smart Road"],
      stepFree: true,
      color: "#2FAE63",
      type: "district",
    },
    {
      id: "central-district",
      name: "Central District",
      district: "Colombo Core",
      x: 320,
      y: 190,
      modes: ["HyperRail", "AeroLink", "Pod"],
      stepFree: true,
      color: "#2FAE63",
      type: "hub",
    },
    {
      id: "port-city-ocean-hub",
      name: "Port City Ocean Hub",
      district: "Waterfront Transit District",
      x: 230,
      y: 130,
      modes: ["HyperRail", "Smart Road"],
      stepFree: true,
      color: "#2FAE63",
      type: "waterfront",
    },
    {
      id: "colombo-skyport",
      name: "Colombo Skyport",
      district: "Air Mobility Terminal",
      x: 480,
      y: 110,
      modes: ["AeroLink", "HyperRail"],
      stepFree: true,
      color: "#E85F8E",
      type: "skyport",
    },
  ];

  const activeHub = hubs.find((h) => h.id === selectedId) || hubs[4];
  const isSaved = savedPlaces.some((p) => p.id === `place-${activeHub.id}` || p.name.includes(activeHub.name.split(" ")[0]));

  const handlePlanJourney = () => {
    const dest =
      DESTINATIONS.find((d) => d.id === activeHub.id) ||
      DESTINATIONS[0];
    setDestination(dest);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedPlace(`place-${activeHub.id}`);
    } else {
      const newPlace: SavedPlace = {
        id: `place-${activeHub.id}`,
        name: activeHub.name,
        address: activeHub.district,
        district: activeHub.district,
        tag: "custom",
        iconType: "star",
        coordinates: { x: activeHub.x, y: activeHub.y },
      };
      addSavedPlace(newPlace);
    }
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[500px] bg-[#F4EEF7] rounded-panel border border-nova-border/70 overflow-hidden select-none shadow-sm flex flex-col justify-between">
      {/* Top Map Floating Badge */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-nova-border/80 shadow-xs flex items-center gap-2">
          <Compass className="w-4 h-4 text-nova-green animate-spin-slow" />
          <span className="text-[12px] font-heading font-bold text-nova-text-primary">
            Colombo 2100 Transit Grid
          </span>
        </div>

        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-nova-border/80 shadow-xs flex items-center gap-1.5 text-[12px] font-heading font-medium text-nova-text-secondary">
          <span className="w-2 h-2 rounded-full bg-nova-green" />
          <span>Active Filter: {modeFilter}</span>
        </div>
      </div>

      {/* Custom SVG Map Canvas */}
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="exp-corridor-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2FAE63" />
            <stop offset="50%" stopColor="#2FAE63" />
            <stop offset="100%" stopColor="#E85F8E" />
          </linearGradient>

          <filter id="exp-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Grid Lines */}
        <g stroke="#E7E1ED" strokeWidth="0.8" opacity="0.6">
          {[80, 160, 240, 320, 400, 480, 560].map((x) => (
            <line key={`exp-vx-${x}`} x1={x} y1="0" x2={x} y2="400" />
          ))}
          {[80, 160, 240, 320].map((y) => (
            <line key={`exp-hy-${y}`} x1="0" y1={y} x2="600" y2={y} />
          ))}
        </g>

        {/* Coastline Area */}
        <path
          d="M 60 400 C 140 330, 210 260, 270 170 C 330 90, 440 50, 600 20 L 600 0 L 0 0 L 0 400 Z"
          fill="#ECE6F2"
          opacity="0.45"
        />

        {/* Transit Corridors */}
        {/* HyperRail Trunk: KDU -> Ratmalana -> Central -> Colombo */}
        <g opacity={modeFilter === "All" || modeFilter === "HyperRail" ? 1 : 0.2} className="transition-opacity duration-300">
          <path
            d="M 100 330 Q 180 260, 320 190 T 480 110"
            fill="none"
            stroke="#E0DAE7"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 100 330 Q 180 260, 320 190 T 480 110"
            fill="none"
            stroke="url(#exp-corridor-flow)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* Port City Branch: Central -> Port City */}
        <g opacity={modeFilter === "All" || modeFilter === "HyperRail" || modeFilter === "Smart Road" ? 1 : 0.2} className="transition-opacity duration-300">
          <path
            d="M 320 190 Q 270 160, 230 130"
            fill="none"
            stroke="#2FAE63"
            strokeWidth="4"
            strokeDasharray="6 4"
          />
        </g>

        {/* SkyPod feeder: Ratmalana -> Waterfront */}
        <g opacity={modeFilter === "All" || modeFilter === "Pod" ? 1 : 0.2} className="transition-opacity duration-300">
          <path
            d="M 180 260 Q 200 180, 230 130"
            fill="none"
            stroke="#2FAE63"
            strokeWidth="3.5"
            strokeDasharray="4 4"
          />
        </g>

        {/* AeroLink High-Speed Aerial: Central -> Colombo Skyport */}
        <g opacity={modeFilter === "All" || modeFilter === "AeroLink" ? 1 : 0.2} className="transition-opacity duration-300">
          <path
            d="M 320 190 Q 390 120, 480 110"
            fill="none"
            stroke="#E85F8E"
            strokeWidth="4"
            strokeDasharray="5 5"
          />
          <circle cx="410" cy="145" r="4.5" fill="#E85F8E" className="animate-ping" opacity="0.8" />
        </g>

        {/* Hub Nodes */}
        {hubs.map((hub) => {
          const isSelected = hub.id === (selectedId || "colombo-skyport");
          const isHovered = hoveredNode === hub.id;
          const matchesMode = modeFilter === "All" || hub.modes.includes(modeFilter);

          return (
            <g
              key={hub.id}
              role="button"
              tabIndex={0}
              aria-label={`${hub.name} (${hub.district})`}
              className="cursor-pointer transition-transform focus:outline-none"
              opacity={matchesMode ? 1 : 0.35}
              onMouseEnter={() => setHoveredNode(hub.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelect(hub.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(hub.id);
                }
              }}
            >
              {/* Outer halo */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isSelected ? 20 : isHovered ? 16 : 12}
                fill={hub.color}
                opacity={isSelected ? 0.3 : isHovered ? 0.2 : 0.1}
                className="transition-all duration-300"
              />

              {/* Node Core */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={isSelected ? 9 : 7}
                fill="#FFFFFF"
                stroke={hub.color}
                strokeWidth={isSelected ? 4 : 3}
                filter="url(#exp-glow)"
                className="transition-all duration-200"
              />

              {/* Label */}
              <rect
                x={hub.x - 52}
                y={hub.y + 14}
                width="104"
                height="22"
                rx="6"
                fill="#FFFFFF"
                fillOpacity="0.95"
                stroke={isSelected ? hub.color : "#DDD6E3"}
                strokeWidth={isSelected ? "1.5" : "1"}
                className="shadow-xs"
              />
              <text
                x={hub.x}
                y={hub.y + 28}
                textAnchor="middle"
                fill="#231D2B"
                fontSize="11"
                fontWeight={isSelected ? "700" : "600"}
                fontFamily="var(--font-space-grotesk)"
              >
                {hub.name.split(" ")[0]} Hub
              </text>
            </g>
          );
        })}
      </svg>

      {/* Bottom Floating Hub Detail Panel */}
      <div className="p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-nova-border/70 flex items-center justify-between gap-3 z-20 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nova-green-soft border border-nova-green/40 flex items-center justify-center text-nova-green font-bold text-[14px]">
            {activeHub.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-heading font-bold text-[15px] text-nova-text-primary">
                {activeHub.name}
              </p>
              <span className="px-2 py-0.5 rounded-full bg-nova-surface text-[12px] font-heading font-medium text-nova-text-secondary">
                {activeHub.district}
              </span>
            </div>
            <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
              Modes: {activeHub.modes.join(" · ")} · Step-free guaranteed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleToggleSave}
            title={isSaved ? "Saved" : "Save Place"}
            className={cn(
              "px-3 py-2 rounded-xl border text-[12px] font-heading font-semibold flex items-center gap-1.5 transition-colors",
              isSaved
                ? "bg-nova-green-soft text-nova-green border-nova-green/40"
                : "bg-white border-nova-border/80 text-nova-text-secondary hover:text-nova-text-primary",
            )}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-nova-green" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? "Saved" : "Save Place"}</span>
          </button>

          <button
            onClick={handlePlanJourney}
            className="px-4 py-2 rounded-xl bg-nova-green text-white hover:bg-nova-green-hover text-[13px] font-heading font-bold flex items-center gap-1.5 shadow-sm shadow-nova-green/20 transition-all active:scale-95"
          >
            <span>Plan Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
