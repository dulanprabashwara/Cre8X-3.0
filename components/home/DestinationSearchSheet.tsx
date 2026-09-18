"use client";

import React, { useState } from "react";
import {
  Search,
  Mic,
  Home,
  Briefcase,
  Plane,
  Building2,
  Ship,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/context/JourneyContext";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { cn } from "@/lib/utils";

export function DestinationSearchSheet() {
  const {
    destinationSheetOpen,
    setDestinationSheetOpen,
    destination,
    setDestination,
    setVoiceModalOpen,
    showToast,
  } = useJourney();

  const [searchQuery, setSearchQuery] = useState(destination.name);
  const [selectedItem, setSelectedItem] =
    useState<DestinationItem>(destination);

  const handleSelect = (item: DestinationItem) => {
    setSelectedItem(item);
    setSearchQuery(item.name);
  };

  const handleConfirm = () => {
    setDestination(selectedItem);
    setDestinationSheetOpen(false);
    showToast(`Destination set to ${selectedItem.name}`);
  };

  const handleClearHistory = () => {
    showToast("Recent search history cleared", "info");
  };

  const filteredDestinations = DESTINATIONS.filter(
    (d) =>
      d.category === "recent" &&
      (d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <Sheet
      isOpen={destinationSheetOpen}
      onClose={() => setDestinationSheetOpen(false)}
    >
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div>
          <h2 className="font-heading font-bold text-[22px] text-nova-text-primary">
            Where do you want to go?
          </h2>
          <p className="text-[14px] text-nova-text-secondary mt-0.5">
            Search a place, station or landmark
          </p>
        </div>

        {/* Search Field */}
        <div className="relative flex items-center bg-[#FAF8FC] border border-nova-border rounded-xl px-3.5 py-3 shadow-2xs focus-within:border-nova-green focus-within:ring-2 focus-within:ring-nova-green/20 transition-all">
          <Search className="w-5 h-5 text-nova-text-secondary shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination..."
            className="flex-1 bg-transparent text-[15px] font-heading font-medium text-nova-text-primary placeholder:text-nova-text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setDestinationSheetOpen(false);
              setVoiceModalOpen(true);
            }}
            className="p-1.5 text-nova-green hover:bg-nova-green-soft rounded-full transition-colors"
            aria-label="Voice input"
            title="Voice Input"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Locations (Home / Work) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              const home = DESTINATIONS.find((d) => d.id === "home-ratmalana");
              if (home) handleSelect(home);
            }}
            className={cn(
              "p-3 rounded-xl border text-left flex items-center gap-3 transition-colors select-none",
              selectedItem.id === "home-ratmalana"
                ? "bg-nova-green-soft border-nova-green shadow-xs"
                : "bg-nova-surface/60 hover:bg-nova-surface border-nova-border/70",
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-nova-border/60 flex items-center justify-center text-nova-green shrink-0 shadow-2xs">
              <Home className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-[14px] text-nova-text-primary">
                Home
              </p>
              <p className="text-[12px] text-nova-text-muted truncate">
                Ratmalana Distr...
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              const work = DESTINATIONS.find((d) => d.id === "work-central");
              if (work) handleSelect(work);
            }}
            className={cn(
              "p-3 rounded-xl border text-left flex items-center gap-3 transition-colors select-none",
              selectedItem.id === "work-central"
                ? "bg-nova-green-soft border-nova-green shadow-xs"
                : "bg-nova-surface/60 hover:bg-nova-surface border-nova-border/70",
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-nova-border/60 flex items-center justify-center text-nova-green shrink-0 shadow-2xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-[14px] text-nova-text-primary">
                Work
              </p>
              <p className="text-[12px] text-nova-text-muted truncate">
                Colombo Central
              </p>
            </div>
          </button>
        </div>

        {/* Recent Destinations Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted">
            Recent Destinations
          </span>
          <button
            type="button"
            onClick={handleClearHistory}
            className="text-[13px] font-heading font-semibold text-nova-green hover:text-nova-green-hover transition-colors"
          >
            Clear history
          </button>
        </div>

        {/* Destinations List */}
        <div className="space-y-2.5">
          {filteredDestinations.map((item) => {
            const isSelected = selectedItem.id === item.id;
            const Icon =
              item.iconType === "airport"
                ? Plane
                : item.iconType === "ferry"
                  ? Ship
                  : Building2;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={cn(
                  "p-3.5 rounded-card border transition-all cursor-pointer flex items-center justify-between select-none group",
                  isSelected
                    ? "bg-nova-green-soft/70 border-nova-green shadow-xs ring-1 ring-nova-green/30"
                    : "bg-white hover:bg-nova-surface/40 border-nova-border/80 shadow-2xs",
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs",
                      isSelected
                        ? "bg-white border-nova-green/40 text-nova-green"
                        : "bg-nova-surface border-nova-border/60 text-nova-text-secondary",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading font-semibold text-[15px] text-nova-text-primary">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-nova-coral-soft border border-nova-coral/20 text-[12px] font-heading font-semibold text-nova-coral">
                          <Sparkles className="w-3 h-3" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-nova-text-secondary mt-0.5">
                      {item.district} · {item.durationMinutes} min away
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-nova-green stroke-[2.2]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-nova-text-muted group-hover:text-nova-text-primary transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Button
            size="lg"
            fullWidth
            onClick={handleConfirm}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Use this destination
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
