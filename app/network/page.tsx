"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Info,
  Sliders,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { NetworkTopologyMap } from "@/components/network/NetworkTopologyMap";
import {
  TRANSPORT_SYSTEMS,
  NETWORK_ADVISORIES,
  ACCESSIBILITY_METRICS,
  TransportModeSystem,
} from "@/data/network";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export default function NetworkPage() {
  const { setPreferencesSheetOpen } = useJourney();
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);

  const selectedSystem: TransportModeSystem | undefined = TRANSPORT_SYSTEMS.find(
    (s) => s.id === selectedSystemId,
  );

  return (
    <main className="flex-1 flex flex-col space-y-6">
      {/* Page Header */}
      <PageHeader
        title="City Network"
        subtitle="Live service status, disruptions and accessibility"
      />

      {/* Top Unified Network Status Card */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl bg-nova-green-soft border border-nova-green/40 flex items-center justify-center text-nova-green shadow-xs shrink-0">
            <Activity className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-nova-green border-2 border-white shadow-xs animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-[18px] sm:text-[20px] text-nova-text-primary tracking-tight">
                City Network Operating Normally
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold uppercase tracking-wider">
                99.4% On-Time
              </span>
            </div>
            <p className="text-[13px] font-heading text-nova-text-secondary mt-0.5">
              4 Multimodal transport systems active · 1 Minor weather speed advisory on Line A12
            </p>
          </div>
        </div>

        {/* Quick stat indicators */}
        <div className="flex items-center gap-4 sm:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-nova-border/60">
          <div>
            <p className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
              Active Fleet
            </p>
            <p className="font-heading font-bold text-[18px] text-nova-text-primary">
              882 Vehicles
            </p>
          </div>
          <div>
            <p className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
              Average Headway
            </p>
            <p className="font-heading font-bold text-[18px] text-nova-green">
              75 sec
            </p>
          </div>
          <div>
            <p className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
              Elevator Uptime
            </p>
            <p className="font-heading font-bold text-[18px] text-nova-text-primary">
              100%
            </p>
          </div>
        </div>
      </div>

      {/* 4 Primary Transport System Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRANSPORT_SYSTEMS.map((sys) => {
          const isSelected = selectedSystemId === sys.id;
          const isOperational = sys.status === "operational";
          const isWarning = sys.status === "warning";
          const isAdvisory = sys.status === "advisory";

          return (
            <button
              type="button"
              key={sys.id}
              onClick={() => setSelectedSystemId(isSelected ? null : sys.id)}
              aria-pressed={isSelected}
              className={cn(
                "p-4 rounded-panel border transition-all cursor-pointer flex flex-col justify-between space-y-3 group text-left w-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-nova-green",
                isSelected
                  ? "bg-white border-nova-green/50 shadow-md ring-1 ring-nova-green/20"
                  : "bg-white/90 hover:bg-white border-nova-border/70 shadow-xs",
              )}
            >
              {/* Top Mode Header */}
              <div className="flex items-center justify-between w-full">
                <span className="px-2.5 py-0.5 rounded-full bg-nova-surface text-[12px] font-heading font-bold text-nova-text-muted uppercase tracking-wider">
                  {sys.shortCode}
                </span>

                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[12px] font-heading font-bold tracking-wide",
                    isOperational && "bg-nova-green-soft text-nova-green border border-nova-green/40",
                    isWarning && "bg-nova-warning/15 text-nova-warning border border-nova-warning/30",
                    isAdvisory && "bg-nova-coral-soft text-nova-coral border border-nova-coral/30",
                  )}
                >
                  {sys.statusText}
                </span>
              </div>

              {/* Title & Description */}
              <div className="w-full">
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary group-hover:text-nova-green transition-colors">
                  {sys.name}
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5 line-clamp-2">
                  {sys.description}
                </p>
              </div>

              {/* Bottom Metrics */}
              <div className="pt-2 border-t border-nova-border/50 flex items-center justify-between text-[12px] font-heading text-nova-text-secondary w-full">
                <span>{sys.activeVehicles} active</span>
                <span>{sys.avgFrequencySeconds}s headway</span>
                <span className="font-bold text-nova-text-primary">{sys.punctualityRate}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Responsive Main Layout: Desktop 60/40 Split, Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Network Topology Map (Desktop 7 cols / 60%) */}
        <div className="lg:col-span-7">
          <NetworkTopologyMap
            selectedSystemId={selectedSystemId}
            onSelectSystem={setSelectedSystemId}
          />
        </div>

        {/* Right: Status Panel, Advisories & Accessibility (Desktop 5 cols / 40%) */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          {/* Selected System Inspector or General Service Advisories */}
          {selectedSystem ? (
            <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-nova-green" />
                  <h3 className="font-heading font-bold text-[16px] text-nova-text-primary">
                    {selectedSystem.name} Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSystemId(null)}
                  className="text-[12px] font-heading font-semibold text-nova-green hover:underline"
                >
                  Show All
                </button>
              </div>

              <p className="text-[13px] font-heading text-nova-text-secondary">
                {selectedSystem.details}
              </p>

              {selectedSystem.corridorNote && (
                <div className="p-3 rounded-xl bg-nova-surface border border-nova-border/60 text-[12px] font-heading text-nova-text-primary flex items-start gap-2">
                  <Info className="w-4 h-4 text-nova-green shrink-0 mt-0.5" />
                  <span>{selectedSystem.corridorNote}</span>
                </div>
              )}
            </div>
          ) : null}

          {/* Real-time Service Advisories Card */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-nova-warning" />
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Active Service Advisories
                </h3>
              </div>
              <span className="text-[12px] font-heading font-bold px-2 py-0.5 rounded-full bg-nova-surface text-nova-text-secondary">
                {NETWORK_ADVISORIES.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {NETWORK_ADVISORIES.map((adv) => (
                <div
                  key={adv.id}
                  className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-nova-coral/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-heading font-bold uppercase text-nova-coral tracking-wide">
                      {adv.systemName} · {adv.timestamp}
                    </span>
                    <span className="text-[12px] font-heading font-bold px-2 py-0.5 rounded-md bg-white border border-nova-coral/30 text-nova-coral">
                      Lines: {adv.affectedLines.join(", ")}
                    </span>
                  </div>

                  <p className="font-heading font-bold text-[14px] text-nova-text-primary">
                    {adv.title}
                  </p>

                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    {adv.description}
                  </p>

                  <div className="p-2 rounded-xl bg-white/80 border border-nova-coral/20 text-[12px] font-heading text-nova-text-primary flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-nova-coral shrink-0" />
                    <span>{adv.recommendedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Infrastructure Health */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-nova-green" />
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Universal Accessibility Health
                </h3>
              </div>
              <button
                onClick={() => setPreferencesSheetOpen(true)}
                className="text-[12px] font-heading font-semibold text-nova-green hover:underline flex items-center gap-1"
              >
                <span>Preferences</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACCESSIBILITY_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-nova-surface/70 border border-nova-border/50 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-heading font-semibold text-nova-text-muted truncate">
                      {metric.title}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-nova-green shrink-0" />
                  </div>
                  <p className="font-heading font-bold text-[15px] text-nova-text-primary">
                    {metric.value}
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary truncate">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
