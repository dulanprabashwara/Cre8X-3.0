"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Compass,
  ArrowRight,
  ShieldCheck,
  Plane,
  Building,
  Anchor,
  Home,
  Briefcase,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExploreMap } from "@/components/explore/ExploreMap";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

type ModeFilter = "All" | "Pod" | "HyperRail" | "AeroLink" | "Smart Road";

export default function ExplorePage() {
  const router = useRouter();
  const { setDestination, startPlanning } = useJourney();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState<ModeFilter>("All");
  const [selectedHubId, setSelectedHubId] = useState<string>("colombo-skyport");

  const modeFilters: ModeFilter[] = [
    "All",
    "Pod",
    "HyperRail",
    "AeroLink",
    "Smart Road",
  ];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMode =
        selectedMode === "All" || (item.modes && item.modes.includes(selectedMode));
      return matchesSearch && matchesMode;
    });
  }, [searchQuery, selectedMode]);

  const handleSelectAndPlan = (dest: DestinationItem) => {
    setDestination(dest);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  const getDestinationIcon = (type: string) => {
    switch (type) {
      case "airport":
        return <Plane className="w-4 h-4" />;
      case "building":
        return <Building className="w-4 h-4" />;
      case "ferry":
        return <Anchor className="w-4 h-4" />;
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <main className="flex-1 flex flex-col space-y-5">
      {/* Page Header */}
      <PageHeader
        title="Explore"
        subtitle="Discover future city mobility hubs, districts and corridors"
      />

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-4 shadow-sm space-y-3">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-nova-text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search districts, hubs or landmarks..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-nova-surface/70 border border-nova-border/60 focus:border-nova-green focus:bg-white focus:outline-none text-[14px] font-heading font-medium text-nova-text-primary placeholder:text-nova-text-muted transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 text-[12px] font-heading text-nova-text-muted hover:text-nova-text-primary"
            >
              Clear
            </button>
          )}
        </div>

        {/* Transport Mode Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted pr-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Mode:
          </span>
          {modeFilters.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSelectedMode(mode)}
              className={cn(
                "min-h-[44px] inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-heading font-semibold transition-all shrink-0 select-none",
                selectedMode === mode
                  ? "bg-nova-green text-white shadow-xs"
                  : "bg-nova-surface hover:bg-nova-surface-hover text-nova-text-secondary border border-nova-border/50",
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Layout: Mobile Stacked / Desktop Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 400px / 5 Cols, Mobile full width) */}
        <div className="lg:col-span-5 flex flex-col space-y-5 order-2 lg:order-1">
          {/* Popular Destinations List */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-nova-coral" />
                <h2 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Featured Destinations
                </h2>
              </div>
              <span className="text-[12px] font-heading text-nova-text-muted">
                {filteredDestinations.length} locations
              </span>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-nova-surface/60 border border-nova-border/60 space-y-2.5">
                <Compass className="w-8 h-8 text-nova-text-muted mx-auto" />
                <p className="font-heading font-bold text-[15px] text-nova-text-primary">
                  No destinations match “{selectedMode}”
                </p>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Try clearing the search query or switching to All modes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMode("All");
                    setSearchQuery("");
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white border border-nova-border/80 hover:bg-nova-surface text-[12px] font-heading font-semibold text-nova-green transition-colors inline-flex items-center justify-center"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredDestinations.map((item) => {
                  const isSelected = selectedHubId === item.id;

                  return (
                    <div
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedHubId(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedHubId(item.id);
                        }
                      }}
                      className={cn(
                        "p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group text-left",
                        isSelected
                          ? "bg-nova-green-soft/50 border-nova-green/40 shadow-xs"
                          : "bg-nova-surface/60 hover:bg-nova-surface border-nova-border/50",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0",
                            isSelected
                              ? "bg-nova-green text-white border-nova-green"
                              : "bg-white text-nova-green border-nova-border/70",
                          )}
                        >
                          {getDestinationIcon(item.iconType)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
                              {item.name}
                            </p>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full bg-nova-coral-soft text-nova-coral border border-nova-coral/30 text-[12px] font-heading font-bold tracking-wide shrink-0">
                                Fastest
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] font-heading text-nova-text-secondary truncate mt-0.5">
                            {item.district} · {item.durationMinutes} min
                          </p>
                          {item.modes && (
                            <p className="text-[12px] font-heading text-nova-green font-medium truncate mt-0.5">
                              {item.modes.join(" · ")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAndPlan(item);
                          }}
                          title={`Plan journey to ${item.name}`}
                          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-nova-border/80 group-hover:bg-nova-green group-hover:text-white group-hover:border-nova-green text-[12px] font-heading font-semibold text-nova-text-primary inline-flex items-center gap-1 transition-colors shadow-2xs"
                        >
                          <span>Plan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accessible Connections Panel */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-nova-green" />
              <h3 className="font-heading font-bold text-[15px] text-nova-text-primary tracking-tight">
                Accessible & Low-Walking Connections
              </h3>
            </div>
            <p className="text-[12px] font-heading text-nova-text-secondary">
              All highlighted destinations feature 100% step-free elevators, level platform boarding, and priority pod dispatch.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-nova-surface/70 border border-nova-border/50">
                <span className="text-[12px] font-heading font-bold text-nova-green uppercase tracking-wide">
                  Step-Free Hubs
                </span>
                <p className="text-[13px] font-heading font-semibold text-nova-text-primary mt-0.5">
                  5 of 5 Stations
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-nova-surface/70 border border-nova-border/50">
                <span className="text-[12px] font-heading font-bold text-nova-green uppercase tracking-wide">
                  Walking Average
                </span>
                <p className="text-[13px] font-heading font-semibold text-nova-text-primary mt-0.5">
                  &lt; 90 seconds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive City Map (Desktop 7 Cols / Mobile Top) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <ExploreMap
            selectedId={selectedHubId}
            onSelect={setSelectedHubId}
            modeFilter={selectedMode}
          />
        </div>
      </div>
    </main>
  );
}
