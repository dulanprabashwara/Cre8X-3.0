"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Route,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  MapPin,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { TRIPS_DATA, TripItem } from "@/data/trips";
import { DESTINATIONS } from "@/data/destinations";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

type TripTab = "active" | "upcoming" | "past";

export default function TripsPage() {
  const router = useRouter();
  const { setDestination, startPlanning, showToast } = useJourney();

  const [activeTab, setActiveTab] = useState<TripTab>("active");
  const [selectedTripId, setSelectedTripId] = useState<string>("trip-active-01");

  const tabOptions = [
    { value: "active", label: "Active" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past" },
  ];

  const displayedTrips = TRIPS_DATA.filter((t) => t.status === activeTab);

  const selectedTrip =
    TRIPS_DATA.find((t) => t.id === selectedTripId) || displayedTrips[0] || TRIPS_DATA[0];

  const handleContinueLive = () => {
    router.push("/live");
  };

  const handleViewJourney = (trip: TripItem) => {
    const dest =
      DESTINATIONS.find((d) => d.name.toLowerCase().includes(trip.destination.toLowerCase())) ||
      DESTINATIONS[0];
    setDestination(dest);
    router.push("/journey");
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
        subtitle="Manage active, scheduled and completed multimodal itineraries"
      />

      {/* Tab Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="w-full sm:w-80">
          <SegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={(val) => {
              const newTab = val as TripTab;
              setActiveTab(newTab);
              const firstInTab = TRIPS_DATA.find((t) => t.status === newTab);
              if (firstInTab) setSelectedTripId(firstInTab.id);
            }}
            size="md"
          />
        </div>

        <span className="text-[13px] font-heading font-medium text-nova-text-secondary hidden sm:inline">
          Showing {displayedTrips.length} {activeTab} {displayedTrips.length === 1 ? "journey" : "journeys"}
        </span>
      </div>

      {/* Main Responsive Layout: Mobile Stacked / Desktop Master-Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Master List Column (Desktop 5 cols, Mobile full) */}
        <div className="lg:col-span-5 flex flex-col space-y-3.5">
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
                        trip.status === "active" && "bg-nova-green-soft text-nova-green border border-nova-green/40",
                        trip.status === "upcoming" && "bg-nova-surface text-nova-text-secondary border border-nova-border/60",
                        trip.status === "past" && "bg-nova-surface text-nova-text-muted",
                      )}
                    >
                      {trip.status === "active" ? "In Progress" : trip.dateLabel}
                    </span>

                    <span className="text-[13px] font-heading font-semibold text-nova-text-primary">
                      {trip.durationMinutes} min
                    </span>
                  </div>

                  {/* Origin -> Destination */}
                  <div>
                    <h3 className="font-heading font-bold text-[17px] text-nova-text-primary group-hover:text-nova-green transition-colors">
                      {trip.destination}
                    </h3>
                    <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
                      From {trip.origin} · {trip.departureTime} → {trip.arrivalTime}
                    </p>
                  </div>

                  {/* Active trip special banner if in transit */}
                  {trip.status === "active" && trip.currentLeg && (
                    <div className="p-2.5 rounded-xl bg-nova-green-soft/70 border border-nova-green/30 flex items-center justify-between text-[12px] font-heading">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-nova-green animate-ping" />
                        <span className="font-bold text-nova-green">
                          {trip.currentLeg.vehicle}
                        </span>
                        <span className="text-nova-text-secondary">
                          Next: {trip.currentLeg.nextStop}
                        </span>
                      </div>
                      <span className="font-bold text-nova-green">
                        {trip.currentLeg.minutesToNext} min
                      </span>
                    </div>
                  )}

                  {/* Accessibility & Modes Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {trip.accessibilityBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-nova-surface border border-nova-border/50 text-[12px] font-heading font-medium text-nova-text-secondary"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Quick Action Button */}
                  <div className="pt-1 flex sm:hidden">
                    {trip.status === "active" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLive();
                        }}
                        className="w-full py-2.5 rounded-xl bg-nova-green text-white font-heading font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Continue Live Journey</span>
                      </button>
                    ) : trip.status === "upcoming" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewJourney(trip);
                        }}
                        className="w-full py-2.5 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5"
                      >
                        <span>View Journey Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRepeatJourney(trip);
                        }}
                        className="w-full py-2.5 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5"
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
        </div>

        {/* Right / Detail Inspector Column (Desktop 7 cols, Hidden on pure mobile if not selected) */}
        <div className="hidden sm:block lg:col-span-7 bg-white rounded-panel border border-nova-border/70 p-6 shadow-sm space-y-6">
          {/* Header row */}
          <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-nova-border/60">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[12px] font-heading font-bold uppercase tracking-wider",
                    selectedTrip.status === "active" && "bg-nova-green-soft text-nova-green border border-nova-green/40",
                    selectedTrip.status === "upcoming" && "bg-nova-surface text-nova-text-secondary border border-nova-border/60",
                    selectedTrip.status === "past" && "bg-nova-surface text-nova-text-muted",
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
                    Vehicle Connected: HyperRail H4
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
                Next action: Exit at Central Skyport. Doors open on the left.
              </p>
            </div>
          )}

          {/* Multimodal Corridor Segments */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-[15px] text-nova-text-primary tracking-tight">
              Multimodal Transit Route
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
                        {idx === 0
                          ? "Initial feeder boarding"
                          : idx === selectedTrip.modes.length - 1
                            ? "Final terminal arrival"
                            : "Step-free synchronized transfer"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[12px] font-heading font-semibold text-nova-green bg-nova-green-soft px-2 py-0.5 rounded-full border border-nova-green/30">
                    Confirmed
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
                : selectedTrip.status === "upcoming"
                  ? "Departure reminder set for 09:08"
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
            ) : selectedTrip.status === "upcoming" ? (
              <Button
                size="lg"
                onClick={() => handleViewJourney(selectedTrip)}
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md shadow-nova-green/20"
              >
                View Journey Details
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
