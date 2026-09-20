import { JourneyData, JourneySegment } from "@/data/journeys";
import { DestinationItem } from "@/data/destinations";
import { JourneyPreferences } from "@/lib/constants";
import { LiveEventState } from "@/data/live-events";

export type TravelMethod = "pod" | "rail" | "aero" | "road";

export interface PlannerLocation {
  id: string;
  name: string;
  district: string;
  terminal?: string;
  supportedMethods: TravelMethod[];
}

export interface MethodConfig {
  id: TravelMethod;
  label: string;
  tagline: string;
  vehicleName: string;
  baseCode: string;
  bypassCode: string;
  badgeLabel: string;
}

export const METHOD_CONFIGS: Record<TravelMethod, MethodConfig> = {
  pod: {
    id: "pod",
    label: "Autonomous Pod",
    tagline: "Direct point-to-point cabin",
    vehicleName: "Autonomous Pod P17",
    baseCode: "Pod P17",
    bypassCode: "Pod P19 Express",
    badgeLabel: "Bay 04 · Pod P17",
  },
  rail: {
    id: "rail",
    label: "HyperRail",
    tagline: "High-speed magnetic transit",
    vehicleName: "HyperRail Line H4",
    baseCode: "HyperRail H4",
    bypassCode: "HyperRail H6 Express",
    badgeLabel: "Platform 06 · Car 03",
  },
  aero: {
    id: "aero",
    label: "AeroLink",
    tagline: "Elevated sky transit",
    vehicleName: "AeroLink SkyCabin A12",
    baseCode: "AeroLink A12",
    bypassCode: "AeroLink Express A14",
    badgeLabel: "Gate 04 · Row 2F",
  },
  road: {
    id: "road",
    label: "Smart Road",
    tagline: "Autonomous expressway shuttle",
    vehicleName: "Smart Shuttle R8",
    baseCode: "Smart Shuttle R8",
    bypassCode: "Smart Shuttle R11 Express",
    badgeLabel: "Corridor C · Bay 02",
  },
};

export const PLANNER_LOCATIONS: PlannerLocation[] = [
  {
    id: "kdu-mobility-hub",
    name: "KDU Mobility Hub",
    district: "Southern Innovation Corridor",
    terminal: "Terminal A",
    supportedMethods: ["rail", "pod", "aero", "road"],
  },
  {
    id: "colombo-skyport",
    name: "Colombo Skyport",
    district: "Air Mobility Terminal",
    terminal: "Arrival Concourse East",
    supportedMethods: ["rail", "pod", "aero", "road"],
  },
  {
    id: "home-ratmalana",
    name: "Home",
    district: "Ratmalana District",
    terminal: "Residential Portal",
    supportedMethods: ["pod", "rail", "road"],
  },
  {
    id: "central-district",
    name: "Central District",
    district: "Colombo Core",
    terminal: "Central Concourse",
    supportedMethods: ["rail", "pod", "road", "aero"],
  },
  {
    id: "work-central",
    name: "Work",
    district: "Colombo Central",
    terminal: "Tower Gate 2",
    supportedMethods: ["rail", "pod", "road"],
  },
  {
    id: "port-city-ocean-hub",
    name: "Port City Ocean Hub",
    district: "Waterfront Transit District",
    terminal: "Marina Concourse",
    supportedMethods: ["pod", "road", "aero"],
  },
];

export const DEFAULT_PLANNER_ORIGIN = PLANNER_LOCATIONS[0]; // KDU Mobility Hub
export const DEFAULT_PLANNER_DESTINATION = PLANNER_LOCATIONS[1]; // Colombo Skyport

/**
 * Add minutes to a 24-hour "HH:MM" string.
 */
export function addMinutesToTime(
  timeStr: string,
  minutesToAdd: number,
): string {
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr || "9", 10);
  const minutes = parseInt(minutesStr || "18", 10);

  const totalMinutes = (hours * 60 + minutes + minutesToAdd) % (24 * 60);
  const nextHours = Math.floor(totalMinutes / 60);
  const nextMinutes = totalMinutes % 60;

  return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
}

export interface MethodEstimate {
  method: TravelMethod;
  durationMinutes: number;
  departureTime: string;
  arrivalTime: string;
  isAvailable: boolean;
  unavailableReason?: string;
  punctualityRate: string;
  statusNote: string;
}

/**
 * Calculates travel times and availability for all 4 transport methods.
 */
export function calculateMethodEstimates(
  origin: PlannerLocation,
  destination: PlannerLocation,
  departureTime: string,
  _preferences?: JourneyPreferences,
): Record<TravelMethod, MethodEstimate> {
  const commonMethods = origin.supportedMethods.filter((m) =>
    destination.supportedMethods.includes(m),
  );

  // Deterministic baseline durations for key corridors
  const isKduToSkyport =
    (origin.id === "kdu-mobility-hub" &&
      destination.id === "colombo-skyport") ||
    (origin.id === "colombo-skyport" && destination.id === "kdu-mobility-hub");

  const durations: Record<TravelMethod, number> = isKduToSkyport
    ? {
        rail: 22,
        pod: 27,
        aero: 26, // 20 min base + 6 min weather delay
        road: 31,
      }
    : {
        rail: 20,
        pod: 24,
        aero: 18,
        road: 28,
      };

  const statusNotes: Record<TravelMethod, string> = {
    rail: "High-speed magnetic guideway · On time",
    pod: "Direct point-to-point cabin · Reserved",
    aero: isKduToSkyport
      ? "Corridor wind advisory · +6 min buffer applied"
      : "High-altitude clear skyway",
    road: "Autonomous expressway shuttle · Normal traffic",
  };

  const punctuality: Record<TravelMethod, string> = {
    rail: "99.8%",
    pod: "99.4%",
    aero: isKduToSkyport ? "94.2%" : "98.5%",
    road: "97.1%",
  };

  const estimates: Partial<Record<TravelMethod, MethodEstimate>> = {};

  (["pod", "rail", "aero", "road"] as TravelMethod[]).forEach((method) => {
    const isAvailable = commonMethods.includes(method);
    const duration = durations[method];
    const arrivalTime = addMinutesToTime(departureTime, duration);

    estimates[method] = {
      method,
      durationMinutes: duration,
      departureTime,
      arrivalTime,
      isAvailable,
      unavailableReason: isAvailable
        ? undefined
        : `${METHOD_CONFIGS[method].label} terminal not available on this route`,
      punctualityRate: punctuality[method],
      statusNote: statusNotes[method],
    };
  });

  return estimates as Record<TravelMethod, MethodEstimate>;
}

export interface RecommendationResult {
  recommendedMethod: TravelMethod;
  reason: string;
}

/**
 * Deterministically computes which single method NOVA recommends.
 * "Recommended" is NOT a method. It is a calculated badge placed on one method.
 */
export function getRecommendedMethod(
  origin: PlannerLocation,
  destination: PlannerLocation,
  departureTime: string,
  preferences?: JourneyPreferences,
): RecommendationResult {
  const estimates = calculateMethodEstimates(
    origin,
    destination,
    departureTime,
    preferences,
  );

  // If KDU to Colombo Skyport (the primary showcase route)
  if (
    (origin.id === "kdu-mobility-hub" &&
      destination.id === "colombo-skyport") ||
    (origin.id === "colombo-skyport" && destination.id === "kdu-mobility-hub")
  ) {
    return {
      recommendedMethod: "rail",
      reason:
        "HyperRail gives the most reliable arrival (22 min) while AeroLink A12 is delayed by 6 min.",
    };
  }

  // General logic: pick fastest available method
  const availableMethods = (
    ["rail", "pod", "aero", "road"] as TravelMethod[]
  ).filter((m) => estimates[m].isAvailable);

  if (availableMethods.length === 0) {
    return {
      recommendedMethod: "pod",
      reason: "Autonomous Pod provides universal point-to-point service.",
    };
  }

  let bestMethod = availableMethods[0];
  let minDuration = estimates[bestMethod].durationMinutes;

  for (const m of availableMethods) {
    if (estimates[m].durationMinutes < minDuration) {
      bestMethod = m;
      minDuration = estimates[m].durationMinutes;
    }
  }

  return {
    recommendedMethod: bestMethod,
    reason: `${METHOD_CONFIGS[bestMethod].label} offers the fastest arrival (${minDuration} min) with verified step-free boarding.`,
  };
}

/**
 * Builds a single-segment JourneyData object for the chosen travel method.
 * NO multimode transfers. Exactly one primary transport method.
 */
export function buildSingleMethodJourney(
  origin: PlannerLocation,
  destination: PlannerLocation,
  departureTime: string,
  selectedMethod: TravelMethod,
  preferences?: JourneyPreferences,
): JourneyData {
  const estimates = calculateMethodEstimates(
    origin,
    destination,
    departureTime,
    preferences,
  );
  const estimate = estimates[selectedMethod];
  const config = METHOD_CONFIGS[selectedMethod];
  const recommendation = getRecommendedMethod(
    origin,
    destination,
    departureTime,
    preferences,
  );
  const isRecommended = selectedMethod === recommendation.recommendedMethod;

  const segment: JourneySegment = {
    id: `seg-${selectedMethod}-1`,
    type: selectedMethod === "road" ? "pod" : selectedMethod, // fallback for component type safety if needed
    modeName: config.label,
    vehicleCode: config.baseCode,
    durationMinutes: estimate.durationMinutes,
    departureTime,
    arrivalTime: estimate.arrivalTime,
    originStation: origin.name,
    originSubtext: origin.terminal || origin.district,
    destinationStation: destination.name,
    badgeText: config.badgeLabel,
    statusColor: isRecommended ? "green" : "neutral",
    details: {
      platform:
        selectedMethod === "rail"
          ? "Platform 06"
          : selectedMethod === "aero"
            ? "Gate 04"
            : selectedMethod === "road"
              ? "Corridor C"
              : "Bay 04",
      zone: selectedMethod === "rail" ? "Zone B" : undefined,
      boardingTime: departureTime,
      car:
        selectedMethod === "rail"
          ? "Car 03"
          : selectedMethod === "aero"
            ? "SkyCabin 04"
            : undefined,
      seatOrRow:
        selectedMethod === "pod"
          ? "Seat 02"
          : selectedMethod === "aero"
            ? "Row 2F"
            : undefined,
      expandedNote:
        selectedMethod === "rail"
          ? "Automated step-free ramp deployed at Car 03 doors."
          : selectedMethod === "pod"
            ? "Private cabin sanitized and temperature set to 21°C."
            : selectedMethod === "aero"
              ? "Elevator access confirmed from departure lounge to SkyDeck."
              : "Autonomous priority lane active with zero traffic stoppages.",
    },
  };

  const whySummary = isRecommended
    ? `${config.label} is NOVA’s recommended method. It provides the most reliable ${estimate.durationMinutes}-minute direct journey while avoiding weather delays affecting other corridors.`
    : `You chose ${config.label} (${estimate.durationMinutes} min). NOVA will guide your journey while continuing to monitor ${METHOD_CONFIGS[recommendation.recommendedMethod].label} as an active backup.`;

  return {
    id: `journey-${origin.id}-${destination.id}-${selectedMethod}`,
    origin: origin.name,
    originDetail: origin.terminal || origin.district,
    destination: destination.name,
    destinationDetail: destination.terminal || destination.district,
    departureTime,
    arrivalTime: estimate.arrivalTime,
    durationMinutes: estimate.durationMinutes,
    statusLabel: "ARRIVAL ON TIME",
    connectionSummary: `Direct ${config.label} journey`,
    guardian: {
      title: "Everything is ready.",
      status: "Monitoring live",
      verifiedPoints: [
        "Vehicle reserved",
        "Accessible boarding confirmed",
        "Service monitored",
        "Arrival monitored",
      ],
      monitoringNote: "NOVA is monitoring your journey.",
    },
    segments: [segment],
    transferConfidence: {
      label: "Direct journey · No transfers",
      availableBufferMin: 0,
      neededBufferMin: 0,
      confidenceRatio: 1.0,
    },
    accessibility: {
      preferenceLabel: "Your preference · Step-free & low walking",
      walkReductionPercent: 68,
      features: [
        "Direct point-to-point travel",
        "Zero intermediate transfers",
        "Automated step-free boarding",
        "Level access at all boarding bays",
      ],
    },
    whyNova: {
      title: "Why this travel method?",
      headline: isRecommended
        ? `Here’s why NOVA recommends ${config.label}.`
        : `Your choice: ${config.label} · Recommended: ${METHOD_CONFIGS[recommendation.recommendedMethod].label}`,
      summary: whySummary,
      comparison: {
        selected: {
          time: `${estimate.durationMinutes} min`,
          tag: isRecommended
            ? "NOVA Recommended · Optimal"
            : "Passenger Selection",
          details: `Direct journey via ${config.vehicleName}. ${estimate.statusNote}.`,
        },
        fastest: {
          time: `${estimates[recommendation.recommendedMethod].durationMinutes} min`,
          tag: `NOVA Recommendation: ${METHOD_CONFIGS[recommendation.recommendedMethod].label}`,
          details: recommendation.reason,
        },
      },
      highlights: [
        "Single continuous method with zero transfers",
        `Punctuality rated at ${estimate.punctualityRate}`,
        "Automated step-free ramp and boarding reservation",
        "Continuous delay and corridor monitoring active",
      ],
    },
  };
}

export interface MethodLiveScenario {
  initialLiveState: LiveEventState;
  approachingState: Partial<LiveEventState>;
  networkChangeEvent: {
    title: string;
    cause: string;
    solution: string;
    impact: string;
    originalVehicle: string;
    suggestedVehicle: string;
  };
  reroutedLiveState: Partial<LiveEventState>;
}

/**
 * Returns method-specific live simulation data.
 * Crucial requirement: Rerouting stays strictly within the selected transport method!
 */
export function getLiveScenarioForMethod(
  method: TravelMethod,
  journey: JourneyData,
): MethodLiveScenario {
  const config = METHOD_CONFIGS[method];
  const destName = journey.destination;
  const arrTime = journey.arrivalTime;

  if (method === "rail") {
    return {
      initialLiveState: {
        currentVehicle: "HyperRail",
        vehicleCode: "HyperRail H4",
        car: "Car 03",
        destination: destName,
        nextStop: destName,
        nextStopPlatform: "Platform 06",
        minutesRemaining: 4,
        estimatedArrival: arrTime,
        progressPercent: 74,
        nextAction: {
          title: `Stay on HyperRail H4`,
          description: "Cruising at 320 km/h · Next stop is your destination",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Step-free ramp ready",
        },
      },
      approachingState: {
        minutesRemaining: 2,
        progressPercent: 90,
        nextAction: {
          title: `Prepare to arrive at ${destName}`,
          description: "Doors open on the left in 2 minutes",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Platform 06 direct exit",
        },
      },
      networkChangeEvent: {
        title: "NETWORK CHANGE",
        cause: "Signal regulation on standard track approaching terminal.",
        solution:
          "NOVA allocated Express Guideway bypass via HyperRail H6 Express.",
        impact: `Your arrival stays ${arrTime}.`,
        originalVehicle: "HyperRail H4",
        suggestedVehicle: "HyperRail H6 Express (Track 2B)",
      },
      reroutedLiveState: {
        currentVehicle: "HyperRail Express",
        vehicleCode: "HyperRail H6 Express",
        car: "Car 02",
        nextStop: destName,
        nextStopPlatform: "Platform 02B Express",
        minutesRemaining: 4,
        estimatedArrival: arrTime,
        nextAction: {
          title: `Switching to HyperRail H6 Express Track`,
          description:
            "Automated magnetic switch engaged · No disembarking needed",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Track 2B direct arrival",
        },
      },
    };
  }

  if (method === "pod") {
    return {
      initialLiveState: {
        currentVehicle: "Autonomous Pod",
        vehicleCode: "Pod P17",
        car: "Cabin 01",
        destination: destName,
        nextStop: destName,
        nextStopPlatform: "Pod Bay 04",
        minutesRemaining: 5,
        estimatedArrival: arrTime,
        progressPercent: 70,
        nextAction: {
          title: `En route via Autonomous Pod P17`,
          description:
            "Direct point-to-point cabin · Smooth autonomous transit",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Private cabin",
        },
      },
      approachingState: {
        minutesRemaining: 2,
        progressPercent: 90,
        nextAction: {
          title: `Approaching ${destName} Pod Portal`,
          description: "Decelerating smoothly into Bay 04 in 2 minutes",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Level boarding bay",
        },
      },
      networkChangeEvent: {
        title: "NETWORK CHANGE",
        cause: "Local guideway density on standard pod approach.",
        solution:
          "NOVA switched your pod route to High-Speed Tube P19 Express.",
        impact: `Your arrival stays ${arrTime}.`,
        originalVehicle: "Pod P17",
        suggestedVehicle: "Pod P19 Express Corridor",
      },
      reroutedLiveState: {
        currentVehicle: "Autonomous Pod Express",
        vehicleCode: "Pod P19 Express",
        car: "Cabin 01",
        nextStop: destName,
        nextStopPlatform: "Express Bay 01",
        minutesRemaining: 4,
        estimatedArrival: arrTime,
        nextAction: {
          title: "Cruising on Pod P19 Express Tube",
          description: "High-speed bypass corridor active · Zero traffic",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Express Portal",
        },
      },
    };
  }

  if (method === "aero") {
    return {
      initialLiveState: {
        currentVehicle: "AeroLink",
        vehicleCode: "AeroLink A12",
        car: "Cabin 04",
        destination: destName,
        nextStop: destName,
        nextStopPlatform: "SkyDeck 04",
        minutesRemaining: 5,
        estimatedArrival: arrTime,
        progressPercent: 72,
        nextAction: {
          title: `Flying via AeroLink A12 Skyway`,
          description: "Cruising at 120m altitude · Direct air corridor",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "SkyDeck 04",
        },
      },
      approachingState: {
        minutesRemaining: 2,
        progressPercent: 90,
        nextAction: {
          title: `Approaching ${destName} Skyport Terminal`,
          description: "Descending to SkyDeck 04 in 2 minutes",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "Elevator-connected SkyDeck",
        },
      },
      networkChangeEvent: {
        title: "NETWORK CHANGE",
        cause: "Corridor crosswind advisory on standard A12 skyway.",
        solution:
          "NOVA shifted flight path to Lower-Altitude Express Skyway A14.",
        impact: `Your arrival stays ${arrTime}.`,
        originalVehicle: "AeroLink A12",
        suggestedVehicle: "AeroLink Express A14",
      },
      reroutedLiveState: {
        currentVehicle: "AeroLink Express",
        vehicleCode: "AeroLink Express A14",
        car: "Cabin 02",
        nextStop: destName,
        nextStopPlatform: "SkyDeck 05 Express",
        minutesRemaining: 4,
        estimatedArrival: arrTime,
        nextAction: {
          title: "Cruising on AeroLink Express A14 Corridor",
          description:
            "Lower altitude express vector · Smooth flight maintained",
          securedConnection: "Arrival protected at " + arrTime,
          walkingTimeTag: "SkyDeck 05 direct",
        },
      },
    };
  }

  // Smart Road
  return {
    initialLiveState: {
      currentVehicle: "Smart Road Shuttle",
      vehicleCode: "Smart Shuttle R8",
      car: "Coach 01",
      destination: destName,
      nextStop: destName,
      nextStopPlatform: "Corridor Bay 02",
      minutesRemaining: 6,
      estimatedArrival: arrTime,
      progressPercent: 68,
      nextAction: {
        title: `En route via Smart Shuttle R8`,
        description: "Expressway Autonomous Priority Lane · Steady cruise",
        securedConnection: "Arrival protected at " + arrTime,
        walkingTimeTag: "Dedicated bay",
      },
    },
    approachingState: {
      minutesRemaining: 2,
      progressPercent: 90,
      nextAction: {
        title: `Approaching ${destName} Transit Plaza`,
        description: "Pulling into Corridor Bay 02 in 2 minutes",
        securedConnection: "Arrival protected at " + arrTime,
        walkingTimeTag: "Ramp access ready",
      },
    },
    networkChangeEvent: {
      title: "NETWORK CHANGE",
      cause: "Surface traffic flow slowdown on Expressway Lane 2.",
      solution: "NOVA rerouted to Dedicated Autonomous Priority Corridor R11.",
      impact: `Your arrival stays ${arrTime}.`,
      originalVehicle: "Smart Shuttle R8",
      suggestedVehicle: "Smart Shuttle R11 Express",
    },
    reroutedLiveState: {
      currentVehicle: "Smart Shuttle Express",
      vehicleCode: "Smart Shuttle R11 Express",
      car: "Coach 01",
      nextStop: destName,
      nextStopPlatform: "Priority Bay 01",
      minutesRemaining: 4,
      estimatedArrival: arrTime,
      nextAction: {
        title: "Cruising on Priority Expressway Corridor R11",
        description: "Automated convoy lane active · Zero delay",
        securedConnection: "Arrival protected at " + arrTime,
        walkingTimeTag: "Priority Concourse",
      },
    },
  };
}
