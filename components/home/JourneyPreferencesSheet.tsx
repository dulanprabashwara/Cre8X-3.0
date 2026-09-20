"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Sparkles,
  Leaf,
  Footprints,
  Check,
  Accessibility,
  Compass,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useJourney } from "@/context/JourneyContext";
import { JourneyPreferences } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function JourneyPreferencesSheet() {
  const {
    preferencesSheetOpen,
    setPreferencesSheetOpen,
    preferences,
    savePreferences,
  } = useJourney();

  const [localPrefs, setLocalPrefs] = useState<JourneyPreferences>(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences, preferencesSheetOpen]);

  const handleSave = () => {
    savePreferences(localPrefs);
    setPreferencesSheetOpen(false);
  };

  const routeStyles = [
    {
      id: "fastest" as const,
      label: "Fastest",
      desc: "Get there as soon as possible",
      icon: Zap,
    },
    {
      id: "calmest" as const,
      label: "Calmest",
      desc: "Calm and quiet route",
      icon: Sparkles,
    },
    {
      id: "eco" as const,
      label: "Eco",
      desc: "Lower-energy transport",
      icon: Leaf,
    },
    {
      id: "low_walking" as const,
      label: "Low walking",
      desc: "Reduce walking distance",
      icon: Footprints,
    },
  ];

  return (
    <Sheet
      isOpen={preferencesSheetOpen}
      onClose={() => setPreferencesSheetOpen(false)}
      className="md:max-w-[740px] md:max-h-[min(760px,86vh)] md:rounded-[26px]"
      footer={
        <div className="flex items-center justify-between gap-3 w-full">
          <button
            type="button"
            onClick={() => setPreferencesSheetOpen(false)}
            className="min-h-[44px] px-5 py-2.5 rounded-xl border border-nova-border/80 bg-white hover:bg-nova-surface text-[14px] font-heading font-semibold text-nova-text-secondary hover:text-nova-text-primary transition-colors select-none cursor-pointer"
          >
            Cancel
          </button>
          <Button
            size="md"
            onClick={handleSave}
            icon={<CheckCircle2 className="w-4 h-4" />}
            className="shadow-sm shadow-nova-green/20"
          >
            Save preferences
          </Button>
        </div>
      }
    >
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-heading font-bold text-[22px] text-nova-text-primary">
            My journey preferences
          </h2>
          <p className="text-[14px] text-nova-text-secondary mt-0.5">
            NOVA can adapt every journey to how you travel.
          </p>
        </div>

        {/* Section 1: Route Style (2x2 Grid) */}
        <div>
          <h3 className="text-[12px] font-heading font-bold uppercase tracking-wider text-nova-text-muted mb-2.5">
            Route Style
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {routeStyles.map((item) => {
              const isSelected = localPrefs.routeStyle === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setLocalPrefs((p) => ({ ...p, routeStyle: item.id }))
                  }
                  className={cn(
                    "p-3 rounded-card border text-left flex flex-col justify-between transition-all select-none min-h-[96px]",
                    isSelected
                      ? "bg-nova-green-soft border-nova-green shadow-xs ring-1 ring-nova-green/30"
                      : "bg-white hover:bg-nova-surface/50 border-nova-border/80",
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        isSelected
                          ? "bg-nova-green text-white"
                          : "bg-nova-surface text-nova-text-secondary",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-nova-green stroke-[3]" />
                    )}
                  </div>

                  <div className="mt-2">
                    <p className="font-heading font-semibold text-[14px] text-nova-text-primary">
                      {item.label}
                    </p>
                    <p className="text-[12px] text-nova-text-muted leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Mobility */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-nova-text-muted">
            <Accessibility className="w-4 h-4" />
            <h3 className="text-[12px] font-heading font-bold uppercase tracking-wider">
              Mobility
            </h3>
          </div>

          <div className="bg-white rounded-card p-3 border border-nova-border/70 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Step-free routes
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Use elevators and step-free boarding
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.stepFree}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, stepFree: val }))
                }
                label="Step-free routes"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Reduce walking
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Reduce walking between stops
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.reduceWalking}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, reduceWalking: val }))
                }
                label="Reduce walking"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Avoid steep pathways
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Avoid steep paths and stairs
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.avoidSteep}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, avoidSteep: val }))
                }
                label="Avoid steep pathways"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Navigation */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-nova-text-muted">
            <Compass className="w-4 h-4" />
            <h3 className="text-[12px] font-heading font-bold uppercase tracking-wider">
              Navigation
            </h3>
          </div>

          <div className="bg-white rounded-card p-3 border border-nova-border/70 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Simple instructions
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Use shorter, clearer directions
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.simpleInstructions}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, simpleInstructions: val }))
                }
                label="Simple instructions"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Extra boarding buffer
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Allow extra time for boarding and ramp access
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.extraTransferTime}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, extraTransferTime: val }))
                }
                label="Extra boarding buffer"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Audio guidance
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Read important journey instructions aloud
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.audioGuidance}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, audioGuidance: val }))
                }
                label="Audio guidance"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Experience */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-nova-text-muted">
            <Sliders className="w-4 h-4" />
            <h3 className="text-[12px] font-heading font-bold uppercase tracking-wider">
              Experience
            </h3>
          </div>

          <div className="bg-white rounded-card p-3 border border-nova-border/70 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Reduced motion
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Reduce interface animation
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.reducedMotion}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, reducedMotion: val }))
                }
                label="Reduced motion"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Less visual information
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Show only important journey details
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.lessVisualInfo}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, lessVisualInfo: val }))
                }
                label="Less visual information"
              />
            </div>

            <div className="h-px bg-nova-divider" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[14px] text-nova-text-primary">
                  Quiet notifications
                </p>
                <p className="text-[12px] text-nova-text-muted">
                  Use fewer non-essential alerts
                </p>
              </div>
              <ToggleSwitch
                checked={localPrefs.quietNotifications}
                onChange={(val) =>
                  setLocalPrefs((p) => ({ ...p, quietNotifications: val }))
                }
                label="Quiet notifications"
              />
            </div>
          </div>
        </div>

        {/* Persistence note */}
        <div className="pt-2 pb-1">
          <p className="text-[12px] font-heading text-nova-text-muted text-center">
            ✓ Apply automatically to future journeys
          </p>
        </div>
      </div>
    </Sheet>
  );
}
