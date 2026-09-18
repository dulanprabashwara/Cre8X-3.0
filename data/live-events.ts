export type SimulationPhase =
  | "normal_travel"
  | "approaching_transfer"
  | "network_change"
  | "rerouted_confirmed";

export interface LiveEventState {
  currentVehicle: string;
  vehicleCode: string;
  car: string;
  destination: string;
  nextStop: string;
  nextStopPlatform: string;
  minutesRemaining: number;
  estimatedArrival: string;
  progressPercent: number; // 0 - 100
  nextAction: {
    title: string;
    description: string;
    securedConnection: string;
    walkingTimeTag: string;
  };
  networkChange?: {
    title: string;
    cause: string;
    solution: string;
    impact: string;
    originalVehicle: string;
    suggestedVehicle: string;
  };
}

export const INITIAL_LIVE_STATE: LiveEventState = {
  currentVehicle: "HyperRail",
  vehicleCode: "HyperRail H4",
  car: "Car 03",
  destination: "Central Skyport",
  nextStop: "Central Skyport",
  nextStopPlatform: "Platform 2B",
  minutesRemaining: 4,
  estimatedArrival: "09:42",
  progressPercent: 68,
  nextAction: {
    title: "Exit at Central Skyport",
    description: "Doors open on the left",
    securedConnection: "AeroLink Gate 04 secured",
    walkingTimeTag: "90 sec walk",
  },
};

export const APPROACHING_STATE: Partial<LiveEventState> = {
  minutesRemaining: 2,
  progressPercent: 88,
  nextAction: {
    title: "Prepare to disembark",
    description: "Doors open on the left in 2 minutes",
    securedConnection: "Gate 04 transfer beacon active",
    walkingTimeTag: "90 sec walk",
  },
};

export const NETWORK_CHANGE_EVENT = {
  title: "NETWORK CHANGE",
  cause: "AeroLink A12 is delayed by 6 min.",
  solution: "NOVA found another connection via AeroLink Express A14.",
  impact: "Your arrival stays 09:42.",
  originalVehicle: "AeroLink A12",
  suggestedVehicle: "AeroLink Express A14 (Gate 05)",
};
