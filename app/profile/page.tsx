"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  ShieldCheck,
  MapPin,
  Sliders,
  Accessibility,
  Bell,
  Eye,
  Sun,
  LifeBuoy,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS } from "@/data/destinations";
import { SavedPlace } from "@/data/places";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const {
    preferences,
    updatePreferences,
    savePreferences,
    savedPlaces,
    removeSavedPlace,
    addSavedPlace,
    setDestination,
    startPlanning,
    setAssistanceSheetOpen,
    showToast,
  } = useJourney();

  const [isAddingPlace, setIsAddingPlace] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceDistrict, setNewPlaceDistrict] = useState("");

  const handleToggle = (key: keyof typeof preferences, value: boolean) => {
    const updated = { ...preferences, [key]: value };
    savePreferences(updated);
  };

  const handleAddCustomPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceName.trim()) return;

    const newPlace: SavedPlace = {
      id: `place-${Date.now()}`,
      name: newPlaceName.trim(),
      address: newPlaceDistrict.trim() || "Colombo Transit Sector",
      district: newPlaceDistrict.trim() || "Central District",
      tag: "custom",
      iconType: "star",
      coordinates: { x: 260, y: 220 },
    };

    addSavedPlace(newPlace);
    setNewPlaceName("");
    setNewPlaceDistrict("");
    setIsAddingPlace(false);
  };

  const handleRouteToPlace = (place: SavedPlace) => {
    const target =
      DESTINATIONS.find((d) => d.name.toLowerCase().includes(place.name.toLowerCase())) ||
      DESTINATIONS[0];
    setDestination(target);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  return (
    <main className="flex-1 flex flex-col space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Profile & Preferences"
        subtitle="Personal multimodal travel parameters, accessibility settings & saved places"
      />

      {/* Passenger Identity Summary Card */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Neutral Passenger Monogram Initials Avatar */}
          <div className="relative w-16 h-16 min-w-[64px] rounded-2xl bg-gradient-to-br from-[#231D2B] via-[#332A3E] to-[#453754] p-1 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-[12px] bg-[#2A2333] flex items-center justify-center text-white">
              <span className="font-heading font-extrabold text-[22px] tracking-wider text-white">
                NT
              </span>
            </div>
            {/* Active Status Dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-nova-green border-2 border-white shadow-xs" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-[20px] text-nova-text-primary tracking-tight">
                NOVA Traveler
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold uppercase tracking-wider">
                Preferences Synced
              </span>
            </div>
            <p className="text-[13px] font-heading text-nova-text-secondary mt-0.5">
              Personal mobility profile · Universal Transit Network
            </p>
          </div>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-3 self-start sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-nova-border/60">
          <div className="p-2 rounded-xl bg-nova-surface text-[12px] font-heading text-nova-text-secondary">
            <span className="font-bold text-nova-text-primary">NOVA Pearl</span> Bioluminescent
          </div>
        </div>
      </div>

      {/* Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 6 cols): Saved Places & Mobility Assistance */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* 1. Saved Places Section */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                    Saved Places
                  </h3>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Fast 1-click journey routing
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingPlace(!isAddingPlace)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Place</span>
              </button>
            </div>

            {/* Add Place Inline Form */}
            {isAddingPlace && (
              <form
                onSubmit={handleAddCustomPlace}
                className="p-4 rounded-2xl bg-nova-surface/80 border border-nova-border/80 space-y-3"
              >
                <p className="text-[13px] font-heading font-bold text-nova-text-primary">
                  New Saved Location
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Place label (e.g. Studio, Gym)"
                    value={newPlaceName}
                    onChange={(e) => setNewPlaceName(e.target.value)}
                    required
                    className="h-11 px-3 rounded-xl bg-white border border-nova-border/70 text-[13px] font-heading focus:outline-none focus:border-nova-green"
                  />
                  <input
                    type="text"
                    placeholder="District / Area"
                    value={newPlaceDistrict}
                    onChange={(e) => setNewPlaceDistrict(e.target.value)}
                    className="h-11 px-3 rounded-xl bg-white border border-nova-border/70 text-[13px] font-heading focus:outline-none focus:border-nova-green"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingPlace(false)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg text-[12px] font-heading text-nova-text-secondary hover:text-nova-text-primary inline-flex items-center justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-4 py-2 rounded-lg bg-nova-green text-white text-[12px] font-heading font-bold shadow-xs hover:bg-nova-green-hover inline-flex items-center justify-center"
                  >
                    Save Location
                  </button>
                </div>
              </form>
            )}

            {/* Places List */}
            <div className="space-y-2.5">
              {savedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="p-3.5 rounded-2xl bg-nova-surface/60 hover:bg-nova-surface border border-nova-border/60 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-nova-border/70 flex items-center justify-center text-nova-green shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
                          {place.name}
                        </p>
                        <span className="px-2 py-0.2 rounded-full bg-white border border-nova-border/60 text-[12px] font-heading uppercase text-nova-text-muted">
                          {place.tag}
                        </span>
                      </div>
                      <p className="text-[12px] font-heading text-nova-text-secondary truncate mt-0.5">
                        {place.address} · {place.district}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleRouteToPlace(place)}
                      title={`Plan journey to ${place.name}`}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-nova-border/80 group-hover:bg-nova-green group-hover:text-white group-hover:border-nova-green text-[12px] font-heading font-semibold text-nova-text-primary inline-flex items-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {place.tag === "custom" && (
                      <button
                        type="button"
                        onClick={() => removeSavedPlace(place.id)}
                        title="Delete place"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl text-nova-text-muted hover:text-nova-error hover:bg-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Accessibility & Mobility Assistance Section */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Accessibility & Mobility Support
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Specialized boarding, physical assistance & instruction modes
                </p>
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Step-Free Route Guarantee
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Strictly routes through elevators, ramps and zero-step transfers
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.stepFree}
                  onChange={(val) => handleToggle("stepFree", val)}
                  ariaLabel="Step-free route guarantee"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Simple Instructions Mode
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    High contrast, simplified language, one step at a time
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.simpleInstructions}
                  onChange={(val) => handleToggle("simpleInstructions", val)}
                  ariaLabel="Simple instructions mode"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Audio Guidance
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Continuous binaural chimes and voice transfers
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.audioGuidance}
                  onChange={(val) => handleToggle("audioGuidance", val)}
                  ariaLabel="Audio guidance"
                />
              </div>

              {/* Direct Mobility Staff Dispatch CTA */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-nova-green-soft via-white to-nova-surface border border-nova-green/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-nova-green shrink-0" />
                  <div>
                    <p className="font-heading font-bold text-[14px] text-nova-text-primary">
                      Request Station Mobility Staff
                    </p>
                    <p className="text-[12px] font-heading text-nova-text-secondary">
                      Trained escorts dispatched to your arrival platform (&lt;90s)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAssistanceSheetOpen(true)}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-nova-green text-white text-[12px] font-heading font-bold hover:bg-nova-green-hover transition-colors shrink-0 shadow-xs inline-flex items-center justify-center"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop 6 cols): Journey Preferences & System Experience */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* 3. Journey Routing Preferences */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Journey Optimization
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  How NOVA computes and balances multimodal transfers
                </p>
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Low Walking Tolerance
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Limits total walking distance to under 5 minutes per transfer
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.reduceWalking}
                  onChange={(val) => handleToggle("reduceWalking", val)}
                  ariaLabel="Low walking tolerance"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Extra Transfer Buffer Time
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Adds +5 min cushion at hubs to protect against missing connections
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.extraTransferTime}
                  onChange={(val) => handleToggle("extraTransferTime", val)}
                  ariaLabel="Extra transfer time"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Avoid Steep Ramps & Overpasses
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Selects level corridors and automated horizontal moving walks
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.avoidSteep}
                  onChange={(val) => handleToggle("avoidSteep", val)}
                  ariaLabel="Avoid steep ramps"
                />
              </div>
            </div>
          </div>

          {/* 4. Notifications & Alerts */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Proactive Notifications
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Autonomous alerts during active travel
                </p>
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Quiet Notifications
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Subtle haptics instead of prominent audio chimes
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.quietNotifications}
                  onChange={(val) => handleToggle("quietNotifications", val)}
                  ariaLabel="Quiet notifications"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Reduced Motion Interface
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Minimizes animations and map motion for vestibular comfort
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.reducedMotion}
                  onChange={(val) => handleToggle("reducedMotion", val)}
                  ariaLabel="Reduced motion"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/50">
                <div>
                  <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                    Calm Display Mode
                  </p>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Suppresses non-essential statistics during live journeys
                  </p>
                </div>
                <ToggleSwitch
                  checked={preferences.lessVisualInfo}
                  onChange={(val) => handleToggle("lessVisualInfo", val)}
                  ariaLabel="Less visual info"
                />
              </div>
            </div>
          </div>

          {/* 5. Appearance & System Architecture */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[16px] text-nova-text-primary tracking-tight">
                  Appearance & Design Language
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Approved visual system for UI/UX Competition
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-nova-surface/60 border border-nova-border/60 flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-[14px] text-nova-text-primary">
                  NOVA Pearl Bioluminescent
                </p>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Calm light theme (#F7F4FA) with luciferin green & quantum coral accents
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold">
                Active
              </span>
            </div>

            <p className="text-[12px] font-heading text-nova-text-muted pt-1">
              NOVA 2100 Universal Mobility Operating System · All preferences stored locally on client
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
