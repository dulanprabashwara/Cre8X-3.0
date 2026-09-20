"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Route,
  Clock,
  ShieldCheck,
  Play,
  RotateCcw,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA, TripItem } from "@/data/trips";
import { DESTINATIONS } from "@/data/destinations";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

type TripTab = "active" | "past";

export default function TripsPage() {
  const router = useRouter();
  const { setDestination, startPlanning, activeTrip } = useJourney();

  const [activeTab, setActiveTab] = useState<TripTab>("active");
  const [selectedTripId, setSelectedTripId] = useState<string>("trip-active-01");

  const tabOptions: { value: TripTab; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "past", label: "Past" },
  ];

  const allTrips = [
    activeTrip,
    ...TRIPS_DATA.filter((t) => t.id !== "trip-active-01"),
  ];

  const displayedTrips = allTrips.filter((t) => t.status === activeTab);

  const selectedTrip =
    allTrips.find((t) => t.id === selectedTripId) || displayedTrips[0] || activeTrip;

  const handleContinueLive = () => {
    router.push("/live");
  };

  const handleRepeatJourney = (trip: TripItem) => {
    const dest =
      DESTINATIONS.find((d) => d.name.toLowerCase().includes(trip.destination.toLowerCase())) ||
      DESTINATIONS[0];
    setDestination(dest);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col space-y-5">
      {/* Page Header */}
      <PageHeader
        title="My Journeys"
        subtitle="View your current journey and recent travel history"
      />

      {/* Tab Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="w-full sm:w-64">
          <SegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={(val) => {
              const newTab = val as TripTab;
              setActiveTab(newTab);
              const firstInTab = allTrips.find((t) => t.status === newTab);
              if (firstInTab) setSelectedTripId(firstInTab.id);
            }}
            size="md"
            layoutId="trips-tab-pill"
          />
        </div>

        <span className="text-[13px] font-heading font-medium text-nova-text-secondary hidden sm:inline">
          Showing {displayedTrips.length} {activeTab} {displayedTrips.length === 1 ? "journey" : "journeys"}
        </span>
      </div>

      {/* Main Responsive Layout: Mobile Stacked / Desktop Master-Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Master List Column (Desktop 4 cols ~36-40%, Mobile full) */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5">
          {displayedTrips.length === 0 ? (
            <div className="bg-white rounded-panel border border-nova-border/70 p-8 text-center space-y-2">
              <Route className="w-8 h-8 text-nova-text-muted mx-auto" />
              <p className="font-heading font-bold text-[16px] text-nova-text-primary">
                No {activeTab} journeys
              </p>
              <p className="text-[13px] font-heading text-nova-text-secondary">
                Plan a new journey to see it listed here.
              </p>
            </div>
          ) : (
            displayedTrips.map((trip) => {
              const isSelected = selectedTrip.id === trip.id;

              return (
                <div
                  key={trip.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Select journey to ${trip.destination}`}
                  onClick={() => setSelectedTripId(trip.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedTripId(trip.id);
                    }
                  }}
                  className={cn(
                    "p-4 rounded-panel border transition-all cursor-pointer flex flex-col space-y-3 group text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-nova-green",
                    isSelected
                      ? "bg-white border-nova-green/50 shadow-md ring-1 ring-nova-green/20"
                      : "bg-white/90 hover:bg-white border-nova-border/70 shadow-xs",
                  )}
                >
                  {/* Top Status & Date Row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[12px] font-heading font-bold tracking-wide uppercase",
                        trip.status === "active"
                          ? "bg-nova-green-soft text-nova-green border border-nova-green/40"
                          : "bg-nova-surface text-nova-text-muted",
                      )}
                    >
                      {trip.status === "active" ? "Active Live" : trip.dateLabel}
                    </span>

                    <span className="text-[12px] font-heading font-semibold text-nova-text-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trip.durationMinutes} min
                    </span>
                  </div>

                  {/* Route & Times */}
                  <div>
                    <h3 className="font-heading font-bold text-[17px] text-nova-text-primary leading-tight group-hover:text-nova-green transition-colors">
                      {trip.destination}
                    </h3>
                    <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
                      {trip.origin} → {trip.destination}
                    </p>
                    <p className="text-[12px] font-heading font-medium text-nova-green mt-1">
                      {trip.departureTime} → {trip.arrivalTime}
                    </p>
                  </div>

                  {/* Modes / Legs Summary */}
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-nova-border/40">
                    {trip.modes.map((mode, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-nova-surface text-[12px] font-heading text-nova-text-secondary"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA within card */}
                  <div className="pt-2">
                    {trip.status === "active" ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLive();
                        }}
                        className="w-full min-h-[44px] py-2.5 rounded-xl bg-nova-green hover:bg-nova-green-hover text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5 shadow-sm shadow-nova-green/20 active:scale-95 transition-transform"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Continue Live Journey</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRepeatJourney(trip);
                        }}
                        className="w-full min-h-[44px] py-2.5 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Repeat This Journey</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Contextual Journey Guardian Status Card (Active tab only) */}
          {activeTab === "active" && (
            <div className="p-4 rounded-panel bg-[#FBF9FD] border border-nova-border/70 flex items-start gap-3 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-nova-green-soft text-nova-green flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Journey Guardian
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-nova-green" />
                </div>
                <p className="font-heading font-semibold text-[13px] text-nova-green mt-0.5">
                  Arrival monitored
                </p>
                <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5 leading-snug">
                  Direct service. NOVA is monitoring your arrival in real time.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right / Detail Inspector Column (Desktop 8 cols ~60-64%, Hidden on pure mobile if not selected) */}
        <div className="hidden sm:block lg:col-span-8 bg-white rounded-panel border border-nova-border/70 p-6 shadow-sm space-y-6">
          {/* Header row */}
          <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-nova-border/60">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[12px] font-heading font-bold uppercase tracking-wider",
                    selectedTrip.status === "active"
                      ? "bg-nova-green-soft text-nova-green border border-nova-green/40"
                      : "bg-nova-surface text-nova-text-muted",
                  )}
                >
                  {selectedTrip.status === "active" ? "Active Live Journey" : selectedTrip.dateLabel}
                </span>
                {selectedTrip.confidenceScore && (
                  <span className="text-[12px] font-heading font-semibold text-nova-green flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {selectedTrip.confidenceScore}% Route Reliability
                  </span>
                )}
              </div>

              <h2 className="font-heading font-bold text-[24px] text-nova-text-primary tracking-tight mt-2">
                {selectedTrip.destination}
              </h2>
              <p className="text-[13px] font-heading font-medium text-nova-text-secondary">
                {selectedTrip.destinationDistrict} · Origin: {selectedTrip.origin}
              </p>
            </div>

            {/* Time & Duration badge */}
            <div className="text-right">
              <span className="font-heading font-bold text-[28px] text-nova-text-primary leading-none">
                {selectedTrip.durationMinutes}
              </span>
              <span className="font-heading text-[14px] font-medium text-nova-text-muted ml-1">
                min
              </span>
              <p className="text-[12px] font-heading text-nova-text-secondary mt-1">
                {selectedTrip.departureTime} → {selectedTrip.arrivalTime}
              </p>
            </div>
          </div>

          {/* Active Live Progress Callout (if active) */}
          {selectedTrip.status === "active" && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-nova-green-soft via-white to-nova-coral-soft/50 border border-nova-green/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nova-green" />
                  </span>
                  <span className="font-heading font-bold text-[14px] text-nova-green">
                    Vehicle Connected: {selectedTrip.modes[0] || "HyperRail H4"}
                  </span>
                </div>
                <span className="text-[12px] font-heading font-semibold text-nova-text-primary">
                  Next Stop in 4 min
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-nova-border/50">
                <div
                  className="h-full bg-gradient-to-r from-nova-green to-nova-coral transition-all"
                  style={{ width: "68%" }}
                />
              </div>

              <p className="text-[12px] font-heading text-nova-text-secondary">
                Next action: Prepare to arrive at {selectedTrip.destination}. Step-free ramp deployed.
              </p>
            </div>
          )}

          {/* Direct Route Transit Corridor */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[15px] text-nova-text-primary tracking-tight">
              Transit Route
            </h3>

            <div className="space-y-2.5">
              {selectedTrip.modes.map((mode, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-nova-surface/70 border border-nova-border/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-nova-border/70 flex items-center justify-center text-nova-green font-bold text-[12px]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                        {mode}
                      </p>
                      <p className="text-[12px] font-heading text-nova-text-secondary">
                        Direct service corridor · Step-free boarding
                      </p>
                    </div>
                  </div>

                  <span className="text-[12px] font-heading font-semibold text-nova-green bg-nova-green-soft px-2 py-0.5 rounded-full border border-nova-green/30">
                    {selectedTrip.status === "active" ? "Confirmed" : "Completed"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Button Bar */}
          <div className="pt-2 border-t border-nova-border/60 flex items-center justify-between gap-3">
            <div className="text-[12px] font-heading text-nova-text-muted">
              {selectedTrip.status === "active"
                ? "NOVA Guardian auto-monitoring enabled"
                : "Recorded in passenger history"}
            </div>

            {selectedTrip.status === "active" ? (
              <Button
                size="lg"
                onClick={handleContinueLive}
                icon={<Play className="w-4 h-4 fill-white" />}
                className="shadow-md shadow-nova-green/20"
              >
                Continue Live Journey
              </Button>
            ) : (
              <Button
                size="md"
                variant="secondary"
                onClick={() => handleRepeatJourney(selectedTrip)}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Repeat Journey
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
