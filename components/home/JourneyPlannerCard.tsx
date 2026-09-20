"use client";

import React from "react";
import {
  Accessibility,
  BusFront,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Plane,
  Sparkles,
  TrainFront,
} from "lucide-react";
import { useJourney } from "@/context/JourneyContext";
import { DEFAULT_ORIGIN, DESTINATIONS } from "@/data/destinations";
import { cn } from "@/lib/utils";

export function JourneyPlannerCard() {
  const {
    destination,
    routeStyle,
    preferences,
    setDestination,
    setRouteStyle,
    updatePreferences,
  } = useJourney();
  const [origin, setOrigin] = React.useState(DEFAULT_ORIGIN.name);
  const [transport, setTransport] = React.useState<string[]>(["recommended"]);
  const [departureTime, setDepartureTime] = React.useState("09:00");

  const transportModes = [
    { id: "recommended", label: "Recommended", icon: Sparkles },
    { id: "pod", label: "Pod", icon: CarFront },
    { id: "rail", label: "HyperRail", icon: TrainFront },
    { id: "aero", label: "AeroLink", icon: Plane },
    { id: "road", label: "Smart Road", icon: BusFront },
  ];

  const routeStyles = [
    { id: "fastest" as const, label: "Fastest" },
    { id: "calmest" as const, label: "Calmest" },
    { id: "eco" as const, label: "Eco" },
    { id: "low_walking" as const, label: "Low walking" },
  ];

  const mobilityOptions = [
    { key: "stepFree" as const, label: "Step-free" },
    { key: "reduceWalking" as const, label: "Reduce walking" },
    { key: "avoidSteep" as const, label: "Avoid steep paths" },
  ];

  const toggleTransport = (modeId: string) => {
    if (modeId === "recommended") {
      setTransport(["recommended"]);
      return;
    }

    setTransport((current) => {
      const concreteModes = current.filter((id) => id !== "recommended");
      return concreteModes.includes(modeId)
        ? concreteModes.length > 1
          ? concreteModes.filter((id) => id !== modeId)
          : concreteModes
        : [...concreteModes, modeId];
    });
  };

  return (
    <div className="w-full bg-white rounded-card p-4 sm:p-5 border border-nova-border/70 shadow-card space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted">Start</span>
          <span className="relative block">
            <select value={origin} onChange={(event) => setOrigin(event.target.value)} className="w-full min-h-11 appearance-none rounded-xl border border-nova-border bg-[#FAF8FC] px-3 pr-9 text-[14px] font-heading font-medium text-nova-text-primary focus:border-nova-green focus:outline-none">
              <option>{DEFAULT_ORIGIN.name}</option>
              {DESTINATIONS.map((item) => <option key={`origin-${item.id}`}>{item.name}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-nova-text-muted" />
          </span>
        </label>
        <label className="space-y-1.5">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted">Destination</span>
          <span className="relative block">
            <select value={destination.id} onChange={(event) => { const next = DESTINATIONS.find((item) => item.id === event.target.value); if (next) setDestination(next); }} className="w-full min-h-11 appearance-none rounded-xl border border-nova-border bg-[#FAF8FC] px-3 pr-9 text-[14px] font-heading font-medium text-nova-text-primary focus:border-nova-green focus:outline-none">
              {DESTINATIONS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-nova-text-muted" />
          </span>
        </label>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted">Preferred transport</span>
          <span className="text-[12px] text-nova-green">Choose one or more</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {transportModes.map((mode) => {
            const Icon = mode.icon;
            const selected = transport.includes(mode.id);
            return <button key={mode.id} type="button" aria-pressed={selected} onClick={() => toggleTransport(mode.id)} className={cn("min-h-11 rounded-xl border px-2 py-2 text-[12px] font-heading font-semibold transition-colors", selected ? "border-nova-green bg-nova-green-soft text-nova-green" : "border-nova-border bg-white text-nova-text-secondary hover:bg-nova-surface")}>{Icon && <Icon className="mx-auto mb-1 h-3.5 w-3.5" />}<span>{mode.label}</span></button>;
          })}
        </div>
      </div>

      <div className="grid gap-5 border-t border-nova-divider pt-4 sm:grid-cols-2">
        <div className="space-y-2.5">
          <span className="text-[12px] font-heading font-semibold text-nova-text-muted">Mobility options</span>
          <div className="flex flex-wrap gap-2">
            {mobilityOptions.map((option) => { const selected = preferences[option.key]; return <button key={option.key} type="button" aria-pressed={selected} onClick={() => updatePreferences({ [option.key]: !selected })} className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-[12px] font-heading font-semibold", selected ? "border-nova-green bg-nova-green-soft text-nova-green" : "border-nova-border bg-white text-nova-text-secondary")}>{selected && <Check className="h-3.5 w-3.5" />}{option.label}</button>; })}
          </div>
        </div>
        <label className="space-y-2.5">
          <span className="flex items-center gap-1.5 text-[12px] font-heading font-semibold text-nova-text-muted"><Clock3 className="h-3.5 w-3.5" /> Start time</span>
          <input type="time" value={departureTime} onChange={(event) => setDepartureTime(event.target.value)} className="min-h-11 w-full rounded-xl border border-nova-border bg-[#FAF8FC] px-3 text-[14px] font-heading font-semibold text-nova-text-primary focus:border-nova-green focus:outline-none" />
        </label>
      </div>

      <div className="space-y-2.5 border-t border-nova-divider pt-4">
        <span className="flex items-center gap-1.5 text-[12px] font-heading font-semibold text-nova-text-muted"><Accessibility className="h-3.5 w-3.5" /> Route style</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {routeStyles.map((style) => <button key={style.id} type="button" aria-pressed={routeStyle === style.id} onClick={() => setRouteStyle(style.id)} className={cn("min-h-10 rounded-xl border px-2 text-[12px] font-heading font-semibold", routeStyle === style.id ? "border-nova-green bg-nova-green-soft text-nova-green" : "border-nova-border bg-white text-nova-text-secondary")}>{style.label}</button>)}
        </div>
      </div>
    </div>
  );
}
