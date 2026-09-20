"use client";

import React, { useState } from "react";
import {
  Car,
  Train,
  Plane,
  Route,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Map,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { NetworkTopologyMap } from "@/components/network/NetworkTopologyMap";
import { TRANSPORT_SYSTEMS, NETWORK_ADVISORIES } from "@/data/network";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export default function NetworkPage() {
  const { setPreferencesSheetOpen } = useJourney();
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [expandedSystemId, setExpandedSystemId] = useState<string | null>(null);
  const [showAdvisoryDetails, setShowAdvisoryDetails] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Primary primary advisory for quick scanning
  const primaryAdvisory =
    NETWORK_ADVISORIES.find((a) => a.systemId === "aerolink") ||
    NETWORK_ADVISORIES[0];

  const systemRows = [
    {
      id: "pods",
      name: "Autonomous Pods",
      statusText: "Operational",
      statusType: "normal" as const,
      icon: Car,
      data: TRANSPORT_SYSTEMS.find((s) => s.id === "pods"),
    },
    {
      id: "hyperrail",
      name: "HyperRail",
      statusText: "High demand after 09:30",
      statusType: "warning" as const,
      icon: Train,
      data: TRANSPORT_SYSTEMS.find((s) => s.id === "hyperrail"),
    },
    {
      id: "aerolink",
      name: "AeroLink",
      statusText: "A12 delayed by 6 min",
      statusType: "advisory" as const,
      icon: Plane,
      data: TRANSPORT_SYSTEMS.find((s) => s.id === "aerolink"),
    },
    {
      id: "smartroads",
      name: "Smart Roads",
      statusText: "Clear",
      statusType: "normal" as const,
      icon: Route,
      data: TRANSPORT_SYSTEMS.find((s) => s.id === "smartroads"),
    },
  ];

  const toggleRowExpand = (id: string) => {
    setExpandedSystemId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="flex-1 flex flex-col space-y-6">
      {/* Page Header */}
      <PageHeader
        title="City Network"
        subtitle="Live service status and disruptions"
      />

      {/* A. OVERALL STATUS CARD */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-nova-green-soft border border-nova-green/30 flex items-center justify-center text-nova-green shrink-0">
            <span className="w-3.5 h-3.5 rounded-full bg-nova-green shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nova-green inline-block" />
              <h2 className="font-heading font-bold text-[18px] sm:text-[20px] text-nova-text-primary tracking-tight">
                Network operating normally
              </h2>
            </div>
            <p className="text-[13px] font-heading text-nova-text-secondary mt-0.5">
              All major services are running.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-nova-border/50">
          <span className="px-3 py-1 rounded-full bg-nova-coral-soft text-nova-coral border border-nova-coral/30 text-[12px] font-heading font-bold">
            1 service advisory
          </span>
          <button
            type="button"
            onClick={() => {
              setShowAdvisoryDetails(true);
              const el = document.getElementById("service-advisory");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View advisory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Map Toggle (< 1024px) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setShowMobileMap((prev) => !prev)}
          aria-expanded={showMobileMap}
          className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-nova-border/70 shadow-xs flex items-center justify-between text-nova-text-primary font-heading font-semibold text-[14px] hover:bg-nova-surface transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Map className="w-4 h-4 text-nova-green" />
            <span>{showMobileMap ? "Hide network map" : "View network map"}</span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-nova-text-muted transition-transform duration-200",
              showMobileMap && "rotate-180",
            )}
          />
        </button>
        {showMobileMap && (
          <div className="mt-3">
            <NetworkTopologyMap
              selectedSystemId={selectedSystemId}
              onSelectSystem={setSelectedSystemId}
            />
          </div>
        )}
      </div>

      {/* Responsive Main Layout: Desktop 55% / 45% Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (~55% / 7 cols): Service Status, Advisory, Accessibility */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* B. SERVICE STATUS SECTION */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                Service status
              </h3>
              <span className="text-[12px] font-heading text-nova-text-muted">
                Tap row for details
              </span>
            </div>

            <div className="space-y-2.5" role="list">
              {systemRows.map((sys) => {
                const isExpanded = expandedSystemId === sys.id;
                const IconComponent = sys.icon;

                return (
                  <div
                    key={sys.id}
                    role="listitem"
                    className="rounded-2xl border border-nova-border/60 bg-[#FBF9FD] overflow-hidden transition-all"
                  >
                    {/* Primary Row Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleRowExpand(sys.id)}
                      aria-expanded={isExpanded}
                      className="w-full min-h-[52px] p-2.5 sm:p-3.5 flex items-center justify-between gap-2 text-left hover:bg-[#F6F2FA] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-nova-border/60 flex items-center justify-center text-nova-text-primary shrink-0 shadow-xs">
                          <IconComponent className="w-4 h-4 text-nova-text-secondary" />
                        </div>
                        <span className="font-heading font-bold text-[13px] sm:text-[14px] text-nova-text-primary whitespace-nowrap">
                          {sys.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[12px] font-heading font-bold inline-flex items-center gap-1.5 whitespace-nowrap",
                            sys.statusType === "normal" &&
                              "bg-nova-green-soft text-nova-green border border-nova-green/30",
                            sys.statusType === "warning" &&
                              "bg-nova-warning/15 text-nova-warning border border-nova-warning/30",
                            sys.statusType === "advisory" &&
                              "bg-nova-coral-soft text-nova-coral border border-nova-coral/30",
                          )}
                        >
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full",
                              sys.statusType === "normal" && "bg-nova-green",
                              sys.statusType === "warning" && "bg-nova-warning",
                              sys.statusType === "advisory" && "bg-nova-coral",
                            )}
                          />
                          <span>{sys.statusText}</span>
                        </span>

                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-nova-text-muted shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expandable Details (Progressive Disclosure) */}
                    {isExpanded && sys.data && (
                      <div className="p-4 pt-1 bg-white border-t border-nova-border/40 space-y-3">
                        <p className="text-[13px] font-heading text-nova-text-secondary">
                          {sys.data.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-nova-border/40 text-center">
                          <div className="p-2.5 rounded-xl bg-nova-surface">
                            <span className="block text-[12px] font-heading font-medium text-nova-text-secondary">
                              Vehicles available
                            </span>
                            <span className="font-heading font-bold text-[15px] text-nova-text-primary mt-0.5 block">
                              {sys.data.activeVehicles}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-nova-surface">
                            <span className="block text-[12px] font-heading font-medium text-nova-text-secondary">
                              Service frequency
                            </span>
                            <span className="font-heading font-bold text-[15px] text-nova-text-primary mt-0.5 block">
                              Every {sys.data.avgFrequencySeconds} sec
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-nova-surface">
                            <span className="block text-[12px] font-heading font-medium text-nova-text-secondary">
                              Running on time
                            </span>
                            <span className="font-heading font-bold text-[15px] text-nova-text-primary mt-0.5 block">
                              {Math.round(sys.data.punctualityRate)}%
                            </span>
                          </div>
                        </div>

                        {sys.data.corridorNote && (
                          <div className="p-2.5 rounded-xl bg-[#FBF9FD] border border-nova-border/50 text-[12px] font-heading text-nova-text-primary flex items-start gap-2">
                            <Info className="w-4 h-4 text-nova-green shrink-0 mt-0.5" />
                            <span>{sys.data.corridorNote}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. SERVICE ADVISORY CARD */}
          <div
            id="service-advisory"
            className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-3.5 scroll-mt-24"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
                Service advisory
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-nova-coral-soft text-nova-coral border border-nova-coral/30 text-[12px] font-heading font-bold">
                6 min delay
              </span>
            </div>

            <div>
              <h4 className="font-heading font-bold text-[16px] text-nova-text-primary">
                AeroLink A12
              </h4>
              <p className="text-[13px] font-heading text-nova-text-secondary mt-1">
                NOVA is already accounting for this delay in affected journeys.
              </p>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvisoryDetails((prev) => !prev)}
                aria-expanded={showAdvisoryDetails}
                className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{showAdvisoryDetails ? "Hide details" : "More details"}</span>
                {showAdvisoryDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 text-nova-text-muted" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-nova-text-muted" />
                )}
              </button>
            </div>

            {/* Expandable Advisory Details */}
            {showAdvisoryDetails && (
              <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-nova-coral/30 space-y-2 mt-2">
                <div className="flex items-center justify-between text-[12px] font-heading">
                  <span className="font-bold text-nova-coral">
                    Coastal Crosswinds · Approach Vector
                  </span>
                  <span className="font-medium text-nova-text-muted">
                    Lines: {primaryAdvisory.affectedLines.join(", ")}
                  </span>
                </div>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  {primaryAdvisory.description}
                </p>
                <div className="p-2 rounded-xl bg-white/90 border border-nova-coral/20 text-[12px] font-heading text-nova-text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-nova-coral shrink-0" />
                  <span>{primaryAdvisory.recommendedAction}</span>
                </div>
              </div>
            )}
          </div>

          {/* D. ACCESSIBILITY SUMMARY CARD */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-nova-green" />
              <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                Accessibility
              </h3>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] font-heading text-nova-text-primary">
                <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
                <span>Elevators operating</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-heading text-nova-text-primary">
                <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
                <span>Step-free stations available</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-heading text-nova-text-primary">
                <CheckCircle2 className="w-4 h-4 text-nova-green shrink-0" />
                <span>Mobility assistance available</span>
              </div>
            </div>

            <div className="pt-2 border-t border-nova-border/50">
              <button
                type="button"
                onClick={() => setPreferencesSheetOpen(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Accessibility preferences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (~45% / 5 cols): Desktop Network Map */}
        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <NetworkTopologyMap
            selectedSystemId={selectedSystemId}
            onSelectSystem={setSelectedSystemId}
          />
        </div>
      </div>
    </main>
  );
}
