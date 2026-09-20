"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Sliders,
  ShieldCheck,
  Bell,
  Plus,
  Trash2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Accessibility,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { TravelerAvatar } from "@/components/shared/TravelerAvatar";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS } from "@/data/destinations";
import { SavedPlace } from "@/data/places";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const {
    preferences,
    savePreferences,
    savedPlaces,
    removeSavedPlace,
    addSavedPlace,
    setDestination,
    startPlanning,
    setPreferencesSheetOpen,
    setAssistanceSheetOpen,
  } = useJourney();

  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [isAddingPlace, setIsAddingPlace] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceDistrict, setNewPlaceDistrict] = useState("");
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);

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
    setShowAllPlaces(true);
  };

  const handleRouteToPlace = (place: SavedPlace) => {
    const target =
      DESTINATIONS.find((d) =>
        d.name.toLowerCase().includes(place.name.toLowerCase()),
      ) || DESTINATIONS[0];
    setDestination(target);
    startPlanning(() => {
      router.push("/journey");
    });
  };

  // Determine which places to show initially (top 3 by default)
  const visiblePlaces = showAllPlaces ? savedPlaces : savedPlaces.slice(0, 3);

  // Preference pills to show dynamically
  const activePreferencesSummary: string[] = [];
  if (preferences.routeStyle === "low_walking" || preferences.reduceWalking) {
    activePreferencesSummary.push("Low walking");
  } else if (preferences.routeStyle === "calmest") {
    activePreferencesSummary.push("Calmest");
  } else if (preferences.routeStyle === "fastest") {
    activePreferencesSummary.push("Fastest");
  } else if (preferences.routeStyle === "eco") {
    activePreferencesSummary.push("Eco");
  }
  if (preferences.stepFree) {
    activePreferencesSummary.push("Step-free routes");
  }
  if (preferences.extraTransferTime) {
    activePreferencesSummary.push("Extra transfer time");
  }
  if (preferences.avoidSteep) {
    activePreferencesSummary.push("Avoid steep ramps");
  }
  if (preferences.simpleInstructions) {
    activePreferencesSummary.push("Simple instructions");
  }

  return (
    <main className="flex-1 flex flex-col space-y-6 max-w-[1040px] mx-auto w-full">
      {/* Page Header */}
      <PageHeader
        title="Profile"
        subtitle="Your places and travel preferences"
      />

      {/* 1. Passenger Identity Summary Card */}
      <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <TravelerAvatar size={80} />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <h2 className="font-heading font-bold text-[18px] sm:text-[20px] text-nova-text-primary tracking-tight whitespace-nowrap">
                NOVA Traveler
              </h2>
              <span className="self-start px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/40 text-[12px] font-heading font-bold uppercase tracking-wider">
                Preferences synced
              </span>
            </div>
            <p className="text-[13px] font-heading text-nova-text-secondary mt-0.5">
              Personal mobility profile
            </p>
          </div>
        </div>
      </div>

      {/* 2. Responsive 2-Column Grid (Left: Saved Places, Right: Summaries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 6 cols): Saved Places */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                    Saved places
                  </h3>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Fast 1-click journey routing
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingPlace((prev) => !prev)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                aria-expanded={isAddingPlace}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add place</span>
              </button>
            </div>

            {/* Add Place Inline Form */}
            {isAddingPlace && (
              <form
                onSubmit={handleAddCustomPlace}
                className="p-4 rounded-2xl bg-nova-surface/80 border border-nova-border/80 space-y-3"
              >
                <p className="text-[13px] font-heading font-bold text-nova-text-primary">
                  New saved location
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Place label (e.g. Studio, Gym)"
                    value={newPlaceName}
                    onChange={(e) => setNewPlaceName(e.target.value)}
                    required
                    className="h-11 px-3 rounded-xl bg-white border border-nova-border/70 text-[13px] font-heading focus:outline-hidden focus:ring-2 focus:ring-nova-green"
                  />
                  <input
                    type="text"
                    placeholder="District / Area"
                    value={newPlaceDistrict}
                    onChange={(e) => setNewPlaceDistrict(e.target.value)}
                    className="h-11 px-3 rounded-xl bg-white border border-nova-border/70 text-[13px] font-heading focus:outline-hidden focus:ring-2 focus:ring-nova-green"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingPlace(false)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg text-[12px] font-heading text-nova-text-secondary hover:text-nova-text-primary inline-flex items-center justify-center cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-4 py-2 rounded-lg bg-nova-green text-white text-[12px] font-heading font-bold shadow-xs hover:bg-nova-green-hover inline-flex items-center justify-center cursor-pointer"
                  >
                    Save location
                  </button>
                </div>
              </form>
            )}

            {/* Saved Places List */}
            <div className="space-y-2.5" role="list">
              {visiblePlaces.map((place) => (
                <div
                  key={place.id}
                  role="listitem"
                  className="p-3.5 rounded-2xl bg-[#FBF9FD] hover:bg-[#F8F5FB] border border-nova-border/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-nova-border/60 flex items-center justify-center text-nova-green shadow-xs shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-[14px] text-nova-text-primary truncate">
                        {place.name}
                      </p>
                      <p className="text-[12px] font-heading text-nova-text-secondary truncate mt-0.5">
                        {place.district}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRouteToPlace(place)}
                      aria-label={`Route to ${place.name}`}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-nova-border/70 group-hover:bg-nova-green group-hover:text-white group-hover:border-nova-green text-[12px] font-heading font-semibold text-nova-text-primary inline-flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {showAllPlaces && place.tag === "custom" && (
                      <button
                        type="button"
                        onClick={() => removeSavedPlace(place.id)}
                        aria-label={`Delete ${place.name}`}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl text-nova-text-muted hover:text-nova-error hover:bg-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View all / Show fewer places Toggle */}
            {savedPlaces.length > 3 && (
              <div className="pt-2 border-t border-nova-border/50">
                <button
                  type="button"
                  onClick={() => setShowAllPlaces((prev) => !prev)}
                  className="min-h-[44px] w-full py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>
                    {showAllPlaces
                      ? "Show fewer places"
                      : `View all saved places (${savedPlaces.length})`}
                  </span>
                  {showAllPlaces ? (
                    <ChevronUp className="w-3.5 h-3.5 text-nova-text-muted" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-nova-text-muted" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Desktop 6 cols): Journey Preferences, Accessibility, Notifications */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* 3. Journey Preferences Summary Card */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                  Journey preferences
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Active routing rules configured for your trips
                </p>
              </div>
            </div>

            {/* Active Preferences Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {activePreferencesSummary.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full bg-nova-surface border border-nova-border/70 text-[12px] font-heading font-semibold text-nova-text-primary"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-nova-border/50">
              <button
                type="button"
                onClick={() => setPreferencesSheetOpen(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Change preferences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. Accessibility Summary Card */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                  Accessibility
                </h3>
                <p className="text-[12px] font-heading text-nova-text-secondary">
                  Station assistance and physical travel accommodations
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF9FD] border border-nova-border/40">
                <span className="text-[13px] font-heading font-medium text-nova-text-primary">
                  Step-free travel
                </span>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[12px] font-heading font-bold",
                    preferences.stepFree
                      ? "bg-nova-green-soft text-nova-green border border-nova-green/30"
                      : "bg-nova-surface text-nova-text-muted",
                  )}
                >
                  {preferences.stepFree ? "On" : "Off"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF9FD] border border-nova-border/40">
                <span className="text-[13px] font-heading font-medium text-nova-text-primary">
                  Simple instructions
                </span>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[12px] font-heading font-bold",
                    preferences.simpleInstructions
                      ? "bg-nova-green-soft text-nova-green border border-nova-green/30"
                      : "bg-nova-surface text-nova-text-muted",
                  )}
                >
                  {preferences.simpleInstructions ? "On" : "Off"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF9FD] border border-nova-border/40">
                <span className="text-[13px] font-heading font-medium text-nova-text-primary">
                  Audio guidance
                </span>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[12px] font-heading font-bold",
                    preferences.audioGuidance
                      ? "bg-nova-green-soft text-nova-green border border-nova-green/30"
                      : "bg-nova-surface text-nova-text-muted",
                  )}
                >
                  {preferences.audioGuidance ? "On" : "Off"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-nova-border/50 flex-wrap">
              <button
                type="button"
                onClick={() => setPreferencesSheetOpen(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Manage accessibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setAssistanceSheetOpen(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-nova-green-soft hover:bg-nova-green-soft/80 text-nova-green border border-nova-green/30 text-[12px] font-heading font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request mobility assistance</span>
              </button>
            </div>
          </div>

          {/* 5. Notifications Summary Card */}
          <div className="bg-white rounded-panel border border-nova-border/70 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-nova-green-soft text-nova-green">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[17px] text-nova-text-primary tracking-tight">
                    Notifications
                  </h3>
                  <p className="text-[12px] font-heading text-nova-text-secondary">
                    Journey updates & proactive alerts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNotificationOptions((prev) => !prev)}
                aria-expanded={showNotificationOptions}
                className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-nova-surface hover:bg-nova-surface-hover text-nova-text-primary border border-nova-border/70 text-[12px] font-heading font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{showNotificationOptions ? "Close" : "Change"}</span>
                {showNotificationOptions ? (
                  <ChevronUp className="w-3.5 h-3.5 text-nova-text-muted" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-nova-text-muted" />
                )}
              </button>
            </div>

            {/* Default Clean Summary Row */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF9FD] border border-nova-border/40">
              <span className="text-[13px] font-heading text-nova-text-primary">
                Journey changes & transfer reminders
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-nova-green-soft text-nova-green border border-nova-green/30 text-[12px] font-heading font-bold">
                On
              </span>
            </div>

            {/* Expandable Notification Details (Progressive Disclosure) */}
            {showNotificationOptions && (
              <div className="space-y-3 pt-1 border-t border-nova-border/40">
                <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/40">
                  <div>
                    <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                      Quiet notifications
                    </p>
                    <p className="text-[12px] font-heading text-nova-text-secondary">
                      Subtle haptics instead of audio chimes
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={preferences.quietNotifications}
                    onChange={(val) => handleToggle("quietNotifications", val)}
                    ariaLabel="Quiet notifications"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/40">
                  <div>
                    <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                      Reduced motion interface
                    </p>
                    <p className="text-[12px] font-heading text-nova-text-secondary">
                      Minimizes animations for vestibular comfort
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={preferences.reducedMotion}
                    onChange={(val) => handleToggle("reducedMotion", val)}
                    ariaLabel="Reduced motion interface"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-nova-surface/60 border border-nova-border/40">
                  <div>
                    <p className="font-heading font-bold text-[13px] text-nova-text-primary">
                      Calm display mode
                    </p>
                    <p className="text-[12px] font-heading text-nova-text-secondary">
                      Suppresses non-essential statistics during journeys
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={preferences.lessVisualInfo}
                    onChange={(val) => handleToggle("lessVisualInfo", val)}
                    ariaLabel="Calm display mode"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
