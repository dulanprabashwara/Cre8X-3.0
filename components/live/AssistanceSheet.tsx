"use client";

import React from "react";
import {
  Volume2,
  FileText,
  Accessibility,
  Headphones,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/ui/Sheet";
import { useJourney } from "@/context/JourneyContext";
import { cn } from "@/lib/utils";

export function AssistanceSheet() {
  const router = useRouter();
  const {
    assistanceSheetOpen,
    setAssistanceSheetOpen,
    setMobilityDialogOpen,
    setLiveMode,
    showToast,
  } = useJourney();

  const handleAction = (type: string) => {
    setAssistanceSheetOpen(false);
    switch (type) {
      case "repeat":
        showToast("“Exit at Central Skyport. Doors open on the left in 4 minutes.”", "info");
        break;
      case "simple":
        setLiveMode("instructions");
        showToast("Switched to high-contrast simple instructions");
        break;
      case "mobility":
        setMobilityDialogOpen(true);
        break;
      case "contact":
        showToast("Transit Care Operator connecting on channel 4...", "info");
        break;
      case "cancel":
        showToast("Journey reservations safely released", "warning");
        router.push("/");
        break;
    }
  };

  const options = [
    {
      id: "repeat",
      title: "Repeat last instruction",
      desc: "Hear the current instruction again",
      icon: Volume2,
      variant: "default",
    },
    {
      id: "simple",
      title: "Show simpler directions",
      desc: "Use larger, simpler step-by-step directions",
      icon: FileText,
      variant: "default",
    },
    {
      id: "mobility",
      title: "Mobility assistance",
      desc: "Request help at your next transfer",
      icon: Accessibility,
      variant: "green",
    },
    {
      id: "contact",
      title: "Contact transit assistance",
      desc: "Talk to a city transit assistant",
      icon: Headphones,
      variant: "default",
    },
    {
      id: "cancel",
      title: "Cancel journey",
      desc: "End this journey and release your reservations",
      icon: XCircle,
      variant: "danger",
    },
  ];

  return (
    <Sheet
      isOpen={assistanceSheetOpen}
      onClose={() => setAssistanceSheetOpen(false)}
    >
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div>
          <h2 className="font-heading font-bold text-[22px] text-nova-text-primary">
            How can NOVA help?
          </h2>
          <p className="text-[14px] text-nova-text-secondary mt-0.5">
            Your current journey will remain active.
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-2.5 pt-1">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isDanger = opt.variant === "danger";
            const isGreen = opt.variant === "green";

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAction(opt.id)}
                className={cn(
                  "w-full p-3.5 rounded-card border text-left flex items-center justify-between transition-all select-none min-h-[58px]",
                  isDanger
                    ? "bg-white hover:bg-nova-error-soft border-nova-error/30 text-nova-error"
                    : isGreen
                    ? "bg-white hover:bg-nova-green-soft border-nova-green/30"
                    : "bg-white hover:bg-nova-surface/70 border-nova-border"
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      isDanger
                        ? "bg-nova-error-soft text-nova-error"
                        : isGreen
                        ? "bg-nova-green-soft text-nova-green"
                        : "bg-nova-surface text-nova-text-secondary"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className={cn(
                        "font-heading font-semibold text-[15px]",
                        isDanger ? "text-nova-error" : "text-nova-text-primary"
                      )}
                    >
                      {opt.title}
                    </h4>
                    <p className="text-[12px] text-nova-text-muted mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-5 h-5 shrink-0 ml-2",
                    isDanger ? "text-nova-error/60" : "text-nova-text-muted"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </Sheet>
  );
}
