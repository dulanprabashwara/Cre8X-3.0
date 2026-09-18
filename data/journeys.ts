export interface JourneySegment {
  id: string;
  type: "pod" | "rail" | "aero" | "walk";
  modeName: string;
  vehicleCode: string;
  durationMinutes: number;
  departureTime: string;
  arrivalTime: string;
  originStation: string;
  originSubtext: string;
  destinationStation: string;
  badgeText?: string;
  statusColor?: "green" | "coral" | "neutral";
  details?: {
    platform?: string;
    zone?: string;
    boardingTime?: string;
    car?: string;
    seatOrRow?: string;
    walkingSeconds?: number;
    stationGuideUrl?: string;
    expandedNote?: string;
  };
}

export interface JourneyData {
  id: string;
  origin: string;
  originDetail: string;
  destination: string;
  destinationDetail: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  statusLabel: string;
  connectionSummary: string;
  guardian: {
    title: string;
    status: string;
    verifiedPoints: string[];
    monitoringNote: string;
  };
  segments: JourneySegment[];
  transferConfidence: {
    label: string;
    availableBufferMin: number;
    neededBufferMin: number;
    confidenceRatio: number; // 0 to 1
  };
  accessibility: {
    preferenceLabel: string;
    walkReductionPercent: number;
    features: string[];
  };
  whyNova: {
    title: string;
    headline: string;
    summary: string;
    comparison: {
      selected: {
        time: string;
        tag: string;
        details: string;
      };
      fastest: {
        time: string;
        tag: string;
        details: string;
      };
    };
    highlights: string[];
  };
}

export const PRIMARY_JOURNEY: JourneyData = {
  id: "journey-kdu-skyport-0918",
  origin: "KDU Mobility Hub",
  originDetail: "Terminal A",
  destination: "Colombo Skyport",
  destinationDetail: "Arrival Concourse East",
  departureTime: "09:18",
  arrivalTime: "09:42",
  durationMinutes: 24,
  statusLabel: "ARRIVAL ON TIME",
  connectionSummary: "All connections ready",
  guardian: {
    title: "Everything is ready.",
    status: "Monitoring live",
    verifiedPoints: [
      "Vehicles reserved",
      "Transfers secured",
      "Accessible route confirmed",
    ],
    monitoringNote: "NOVA is monitoring every connection.",
  },
  segments: [
    {
      id: "seg-1",
      type: "pod",
      modeName: "Autonomous Pod",
      vehicleCode: "Pod P17",
      durationMinutes: 4,
      departureTime: "09:18",
      arrivalTime: "09:22",
      originStation: "KDU Mobility Hub",
      originSubtext: "Terminal A",
      destinationStation: "Ratmalana Transit Portal",
      badgeText: "Arriving in 2 min",
      statusColor: "green",
      details: {
        boardingTime: "09:18",
        seatOrRow: "Seat 02",
      },
    },
    {
      id: "seg-2",
      type: "rail",
      modeName: "HyperRail",
      vehicleCode: "HyperRail H4",
      durationMinutes: 11,
      departureTime: "09:24",
      arrivalTime: "09:35",
      originStation: "Ratmalana",
      originSubtext: "Central Skyport Line",
      destinationStation: "Central Skyport",
      badgeText: "Platform 06 · Zone B",
      statusColor: "neutral",
      details: {
        platform: "Platform 06",
        zone: "Zone B",
        boardingTime: "09:23",
        car: "Car 03",
        stationGuideUrl: "#station-guide",
        expandedNote: "Step-free ramp automatically deployed at Car 03 doors.",
      },
    },
    {
      id: "seg-3",
      type: "aero",
      modeName: "AeroLink",
      vehicleCode: "AeroLink A12",
      durationMinutes: 7,
      departureTime: "09:36",
      arrivalTime: "09:43",
      originStation: "Central Skyport",
      originSubtext: "Gate 04",
      destinationStation: "Colombo Skyport",
      badgeText: "Row 2F reserved",
      statusColor: "coral",
      details: {
        platform: "Gate 04",
        seatOrRow: "Row 2F",
        walkingSeconds: 90,
      },
    },
    {
      id: "seg-4",
      type: "walk",
      modeName: "Walk",
      vehicleCode: "Accessible Corridor",
      durationMinutes: 2,
      departureTime: "09:42",
      arrivalTime: "09:44",
      originStation: "Skyport High Speed Gate",
      originSubtext: "Concourse Elevator 1",
      destinationStation: "Colombo Skyport Arrival",
      badgeText: "Destination",
      statusColor: "coral",
      details: {
        expandedNote:
          "Follow illuminated floor vectors directly to Skyport Sky Lounge.",
      },
    },
  ],
  transferConfidence: {
    label: "Comfortable transfer",
    availableBufferMin: 4,
    neededBufferMin: 2,
    confidenceRatio: 0.72,
  },
  accessibility: {
    preferenceLabel: "Your preference · Low walking route",
    walkReductionPercent: 64,
    features: [
      "Walking reduced by 64%",
      "Elevators confirmed at all transfers",
      "Zero level changes without automated ramps",
    ],
  },
  whyNova: {
    title: "Why this journey?",
    headline: "Here’s why NOVA recommended this route.",
    summary:
      "This journey takes 4 minutes longer than the fastest option, but reduces walking by 64% and removes two crowded multi-level transfers.",
    comparison: {
      selected: {
        time: "24 min",
        tag: "Low walking · Calm",
        details: "Elevator-connected, step-free boarding throughout.",
      },
      fastest: {
        time: "20 min",
        tag: "More walking · 2 short transfers",
        details: "Requires stair descent at Sector 3 and a 90-second sprint.",
      },
    },
    highlights: [
      "Walking reduced by 64%",
      "Elevators available at every transfer",
      "Comfortable connection times with 4-min safety buffer",
      "Continuous delay prediction active",
    ],
  },
};
