export type SystemStatusLevel =
  | "operational"
  | "warning"
  | "advisory"
  | "disruption";

export interface TransportModeSystem {
  id: string;
  name: string;
  shortCode: string;
  status: SystemStatusLevel;
  statusText: string;
  description: string;
  activeVehicles: number;
  avgFrequencySeconds: number;
  punctualityRate: number;
  corridorNote?: string;
  details: string;
}

export interface NetworkAdvisory {
  id: string;
  systemId: string;
  systemName: string;
  severity: "info" | "warning" | "advisory";
  title: string;
  description: string;
  affectedLines: string[];
  recommendedAction: string;
  timestamp: string;
}

export interface AccessibilityMetric {
  title: string;
  value: string;
  detail: string;
  status: "optimal" | "advisory";
}

export const TRANSPORT_SYSTEMS: TransportModeSystem[] = [
  {
    id: "pods",
    name: "Autonomous Pod Network",
    shortCode: "POD",
    status: "operational",
    statusText: "Operational",
    description: "On-demand synchronized point-to-point urban pods",
    activeVehicles: 420,
    avgFrequencySeconds: 45,
    punctualityRate: 99.8,
    corridorNote: "All 18 feeder corridors running optimal velocity",
    details:
      "Zero wait times at KDU Hub, Central Skyport, and Ratmalana. Autonomous magnetic induction tracks fully functional.",
  },
  {
    id: "hyperrail",
    name: "HyperRail",
    shortCode: "RAIL",
    status: "warning",
    statusText: "High demand after 09:30",
    description: "High-speed vacuum-magnetic subterranean and elevated transit",
    activeVehicles: 64,
    avgFrequencySeconds: 90,
    punctualityRate: 98.4,
    corridorNote:
      "Increased passenger surge predicted after 09:30 (+14 min window)",
    details:
      "HyperRail H4 running at normal 3-min headway. H1 and H2 approaching capacity. Departure before 09:30 recommended.",
  },
  {
    id: "aerolink",
    name: "AeroLink",
    shortCode: "AERO",
    status: "advisory",
    statusText: "A12 delay · 6 min",
    description: "Urban eVTOL & pressurized aerial sky-shuttle corridors",
    activeVehicles: 88,
    avgFrequencySeconds: 120,
    punctualityRate: 94.2,
    corridorNote: "Coastal crosswinds affecting Corridor A12 approach vector",
    details:
      "NOVA Guardian auto-rerouting active for Colombo Skyport connections via Gate 04 skybridge.",
  },
  {
    id: "smartroads",
    name: "Smart Roads",
    shortCode: "ROAD",
    status: "operational",
    statusText: "Clear & synchronized",
    description:
      "Dynamic surface corridors for multi-passenger autonomous transit",
    activeVehicles: 310,
    avgFrequencySeconds: 60,
    punctualityRate: 99.5,
    corridorNote: "All automated surface vehicle zones clear",
    details:
      "Zero congestion across Western Maritime Expressway and Central Spine.",
  },
];

export const NETWORK_ADVISORIES: NetworkAdvisory[] = [
  {
    id: "adv-01",
    systemId: "aerolink",
    systemName: "AeroLink Sky Corridor",
    severity: "advisory",
    title: "Weather Guidance: Coastal Crosswinds on Line A12",
    description:
      "Wind shear sensors near Waterfront Sector require a 6-minute speed reduction. Dynamic transfer buffers applied.",
    affectedLines: ["A12", "A14"],
    recommendedAction:
      "NOVA Guardian has reserved Gate 04 at Central Skyport to protect connection window.",
    timestamp: "09:14 AM",
  },
  {
    id: "adv-02",
    systemId: "hyperrail",
    systemName: "HyperRail Network",
    severity: "warning",
    title: "Peak Demand Surge Approaching at 09:30",
    description:
      "Predictive traffic model indicates 38% influx of passengers along Central Skyport trunk lines.",
    affectedLines: ["H1", "H4"],
    recommendedAction:
      "Board currently suggested Pod P17 before 09:25 to bypass boarding queue.",
    timestamp: "09:05 AM",
  },
];

export const ACCESSIBILITY_METRICS: AccessibilityMetric[] = [
  {
    title: "Elevator & Lift Availability",
    value: "100%",
    detail: "148 / 148 transit lifts and automated boarding ramps online",
    status: "optimal",
  },
  {
    title: "Step-Free Stations",
    value: "100%",
    detail: "All 42 active transit stations certified level-boarding",
    status: "optimal",
  },
  {
    title: "Mobility Assistance Staff",
    value: "32 Active Guides",
    detail: "Average dispatch arrival under 90 seconds at transfers",
    status: "optimal",
  },
  {
    title: "Tactile & Audio Wayfinding",
    value: "Online",
    detail: "Bioluminescent floor paths and binaural guidance synchronized",
    status: "optimal",
  },
];
