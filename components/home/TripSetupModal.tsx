"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Route,
  Sparkles,
  TrainFront,
  Plane,
  Bike,
  Footprints,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS } from "@/data/destinations";
import { cn } from "@/lib/utils";

const travelModes = [
  { id: "Pod", label: "Pod", icon: TrainFront },
  { id: "HyperRail", label: "HyperRail", icon: Route },
  { id: "AeroLink", label: "AeroLink", icon: Plane },
  { id: "Bike", label: "Bike", icon: Bike },
  { id: "Walk", label: "Walk", icon: Footprints },
] as const;

export function TripSetupModal({
  isOpen,
  onComplete,
}: {
  isOpen: boolean;
  onComplete: () => void;
}) {
  const {
    currentLocation,
    setCurrentLocation,
    destination,
    setDestination,
    preferredModes,
    setPreferredModes,
    departureTime,
    setDepartureTime,
  } = useJourney();

  const [localCurrentLocation, setLocalCurrentLocation] = useState(
    currentLocation || "KDU Mobility Hub",
  );
  const [localDestination, setLocalDestination] = useState(
    destination?.name || DESTINATIONS[0].name,
  );
  const [localPreferredModes, setLocalPreferredModes] = useState<string[]>(
    preferredModes.length ? preferredModes : ["Pod", "HyperRail"],
  );
  const [localDepartureTime, setLocalDepartureTime] = useState(
    departureTime || "08:30",
  );

  useEffect(() => {
    if (!isOpen) return;

    setLocalCurrentLocation(currentLocation || "KDU Mobility Hub");
    setLocalDestination(destination?.name || DESTINATIONS[0].name);
    setLocalPreferredModes(
      preferredModes.length ? preferredModes : ["Pod", "HyperRail"],
    );
    setLocalDepartureTime(departureTime || "08:30");
  }, [isOpen, currentLocation, destination, preferredModes, departureTime]);

  const destinationOptions = useMemo(
    () => [
      { label: "KDU Mobility Hub", value: "KDU Mobility Hub" },
      ...DESTINATIONS.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    ],
    [],
  );

  const isReady =
    localCurrentLocation.trim().length > 0 &&
    localDestination.trim().length > 0 &&
    localPreferredModes.length > 0 &&
    localDepartureTime.trim().length > 0;

  const toggleMode = (mode: string) => {
    setLocalPreferredModes((prev) =>
      prev.includes(mode)
        ? prev.filter((item) => item !== mode)
        : [...prev, mode],
    );
  };

  const handleContinue = () => {
    if (!isReady) return;

    setCurrentLocation(localCurrentLocation);
    setDestination(
      DESTINATIONS.find((item) => item.name === localDestination) ||
        DESTINATIONS[0],
    );
    setPreferredModes(localPreferredModes);
    setDepartureTime(localDepartureTime);
    onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-nova-text-primary/30 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-nova-border/70 bg-white shadow-sheet"
          >
            <div className="bg-gradient-to-r from-nova-green-soft via-white to-nova-coral-soft px-5 pb-6 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-nova-green">
                    Trip setup
                  </p>
                  <h2 className="mt-2 font-heading text-[28px] font-bold text-nova-text-primary tracking-tight">
                    Start your next journey
                  </h2>
                </div>

                <div className="rounded-full border border-nova-border/80 bg-white px-3 py-1.5 text-[12px] font-medium text-nova-text-secondary shadow-2xs">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-nova-green" />
                    Personalized
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block rounded-card border border-nova-border/70 bg-nova-surface/30 p-3.5 shadow-2xs">
                  <span className="mb-2 flex items-center gap-2 text-[12px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
                    <MapPin className="h-3.5 w-3.5 text-nova-green" />
                    Current location
                  </span>
                  <select
                    value={localCurrentLocation}
                    onChange={(e) => setLocalCurrentLocation(e.target.value)}
                    className="w-full rounded-xl border border-nova-border bg-white px-3 py-2.5 text-[15px] text-nova-text-primary shadow-2xs outline-none transition focus:border-nova-green"
                  >
                    {destinationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block rounded-card border border-nova-border/70 bg-nova-surface/30 p-3.5 shadow-2xs">
                  <span className="mb-2 flex items-center gap-2 text-[12px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
                    <MapPin className="h-3.5 w-3.5 text-nova-coral" />
                    Destination
                  </span>
                  <select
                    value={localDestination}
                    onChange={(e) => setLocalDestination(e.target.value)}
                    className="w-full rounded-xl border border-nova-border bg-white px-3 py-2.5 text-[15px] text-nova-text-primary shadow-2xs outline-none transition focus:border-nova-green"
                  >
                    {DESTINATIONS.map((destination) => (
                      <option key={destination.id} value={destination.name}>
                        {destination.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-card border border-nova-border/70 bg-white p-3.5 shadow-2xs">
                <div className="mb-3 flex items-center gap-2 text-[12px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
                  <Route className="h-3.5 w-3.5 text-nova-green" />
                  Preferred methods of travel
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {travelModes.map(({ id, label, icon: Icon }) => {
                    const selected = localPreferredModes.includes(id);

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleMode(id)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-heading font-medium transition-all",
                          selected
                            ? "border-nova-green bg-nova-green-soft text-nova-text-primary shadow-2xs ring-1 ring-nova-green/25"
                            : "border-nova-border bg-nova-surface/40 text-nova-text-secondary hover:text-nova-text-primary",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            selected
                              ? "text-nova-green"
                              : "text-nova-text-secondary",
                          )}
                        />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block rounded-card border border-nova-border/70 bg-white p-3.5 shadow-2xs">
                <span className="mb-2 flex items-center gap-2 text-[12px] font-heading font-semibold uppercase tracking-[0.12em] text-nova-text-muted">
                  <Clock3 className="h-3.5 w-3.5 text-nova-coral" />
                  Starting time
                </span>
                <input
                  type="time"
                  value={localDepartureTime}
                  onChange={(e) => setLocalDepartureTime(e.target.value)}
                  className="w-full rounded-xl border border-nova-border bg-nova-surface/30 px-3 py-2.5 text-[15px] text-nova-text-primary shadow-2xs outline-none transition focus:border-nova-green"
                />
              </label>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-nova-divider bg-white/95 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onComplete}
                className="min-h-[44px] rounded-xl border border-nova-border bg-white px-4 py-2 text-[14px] font-heading font-semibold text-nova-text-secondary transition hover:bg-nova-surface hover:text-nova-text-primary"
              >
                Skip for now
              </button>

              <Button
                size="md"
                onClick={handleContinue}
                disabled={!isReady}
                icon={<ArrowRight className="h-4 w-4" />}
                className="shadow-sm shadow-nova-green/20"
              >
                Continue to homepage
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
