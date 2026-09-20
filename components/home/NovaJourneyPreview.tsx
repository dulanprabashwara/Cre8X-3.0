"use client";

import React from "react";
import {
  CarFront,
  TrainFront,
  Plane,
  Footprints,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react";

export function NovaJourneyPreview() {
  const routeStops = [
    { name: "KDU Mobility Hub", type: "Origin", mode: "Pod", icon: CarFront },
    {
      name: "Ratmalana District",
      type: "Transfer",
      mode: "HyperRail",
      icon: TrainFront,
    },
    {
      name: "Central Skyport",
      type: "Transfer",
      mode: "AeroLink",
      icon: Plane,
    },
    {
      name: "Colombo Skyport",
      type: "Destination",
      mode: "Walk",
      icon: Footprints,
    },
  ];

  return (
    <div className="bg-white rounded-panel border border-nova-border/70 p-6 shadow-sm flex flex-col justify-between space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-text-muted">
            NOVA Journey Preview
          </p>
          <h2 className="font-heading font-bold text-[20px] text-nova-text-primary tracking-tight mt-0.5">
            Your journey at a glance
          </h2>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nova-green-soft border border-nova-green/30 text-[12px] font-heading font-semibold text-nova-green">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Network operating normally</span>
        </div>
      </div>

      {/* Abstract Route Flow Illustration */}
      <div className="bg-[#FAF8FC] border border-nova-border/70 rounded-2xl p-5 relative overflow-hidden">
        {/* Subtle background track */}
        <div className="space-y-4 relative">
          {routeStops.map((stop, index) => {
            const Icon = stop.icon;
            const isLast = index === routeStops.length - 1;

            return (
              <div key={stop.name} className="flex items-start gap-4 relative">
                {/* Node indicator & connecting line */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-white border border-nova-border shadow-2xs flex items-center justify-center text-nova-green shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 h-7 bg-gradient-to-b from-nova-green to-nova-coral my-1 rounded-full opacity-60" />
                  )}
                </div>

                {/* Stop info */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-[15px] text-nova-text-primary truncate">
                      {stop.name}
                    </h3>
                    <span className="text-[12px] font-heading font-medium text-nova-text-muted">
                      {stop.type}
                    </span>
                  </div>
                  <p className="text-[12px] font-heading text-nova-text-secondary mt-0.5">
                    Via {stop.mode} corridor
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reassurances & Compact Insights */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Accessibility Confirmation */}
        <div className="p-3.5 rounded-xl bg-nova-surface/70 border border-nova-border/60 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-nova-green shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-heading font-semibold text-[13px] text-nova-text-primary leading-tight">
              Step-free route ready
            </p>
            <p className="text-[12px] text-nova-text-secondary mt-0.5 leading-snug">
              Elevators & level boarding confirmed
            </p>
          </div>
        </div>

        {/* Departure & Arrival Insight */}
        <div className="p-3.5 rounded-xl bg-nova-coral-soft/50 border border-nova-coral/20 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-nova-coral shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-heading font-semibold text-[13px] text-nova-text-primary leading-tight">
              Best departure: 09:18
            </p>
            <p className="text-[12px] text-nova-text-secondary mt-0.5 leading-snug">
              Estimated arrival: 09:42 (24 min)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
