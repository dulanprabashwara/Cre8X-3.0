export interface TripItem {
  id: string;
  status: "active" | "upcoming" | "past";
  origin: string;
  destination: string;
  destinationDistrict: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  dateLabel: string;
  modes: string[];
  currentLeg?: {
    vehicle: string;
    nextStop: string;
    minutesToNext: number;
  };
  accessibilityBadges: string[];
  confidenceScore?: number;
  isRerouted?: boolean;
}

export const TRIPS_DATA: TripItem[] = [
  {
    id: "trip-active-01",
    status: "active",
    origin: "KDU Mobility Hub",
    destination: "Colombo Skyport",
    destinationDistrict: "Air Mobility Terminal",
    departureTime: "09:18",
    arrivalTime: "09:42",
    durationMinutes: 24,
    dateLabel: "Today · In Progress",
    modes: ["Autonomous Pod P17", "HyperRail H4", "AeroLink A12", "Walk"],
    currentLeg: {
      vehicle: "HyperRail H4",
      nextStop: "Central Skyport",
      minutesToNext: 4,
    },
    accessibilityBadges: ["Low walking", "Step-free route", "Guardian Active"],
    confidenceScore: 99.4,
  },
  {
    id: "trip-upcoming-01",
    status: "upcoming",
    origin: "KDU Mobility Hub",
    destination: "Colombo Skyport",
    destinationDistrict: "Gate 04 · Air Mobility Terminal",
    departureTime: "09:18",
    arrivalTime: "09:42",
    durationMinutes: 24,
    dateLabel: "Tomorrow · 09:18",
    modes: ["Pod P17", "HyperRail H4", "AeroLink A12", "Walk"],
    accessibilityBadges: ["Low walking", "Step-free transfers"],
    confidenceScore: 98.8,
  },
  {
    id: "trip-upcoming-02",
    status: "upcoming",
    origin: "Ratmalana District",
    destination: "Port City Ocean Hub",
    destinationDistrict: "Waterfront Transit District",
    departureTime: "14:30",
    arrivalTime: "15:01",
    durationMinutes: 31,
    dateLabel: "Fri 20 Sep · 14:30",
    modes: ["HyperRail H2", "SkyPod S04", "Walk"],
    accessibilityBadges: ["Step-free", "Calmest Route"],
    confidenceScore: 99.1,
  },
  {
    id: "trip-past-01",
    status: "past",
    origin: "Ratmalana District",
    destination: "Port City Ocean Hub",
    destinationDistrict: "Waterfront Transit District",
    departureTime: "09:40",
    arrivalTime: "10:11",
    durationMinutes: 31,
    dateLabel: "Yesterday",
    modes: ["HyperRail H2", "SkyPod S04"],
    accessibilityBadges: ["Completed", "Zero Delays"],
  },
  {
    id: "trip-past-02",
    status: "past",
    origin: "KDU Mobility Hub",
    destination: "Central District",
    destinationDistrict: "Colombo Core",
    departureTime: "11:05",
    arrivalTime: "11:23",
    durationMinutes: 18,
    dateLabel: "2 days ago",
    modes: ["Autonomous Pod P12", "HyperRail H1"],
    accessibilityBadges: ["Completed", "Fastest route taken"],
  },
  {
    id: "trip-past-03",
    status: "past",
    origin: "Colombo Skyport",
    destination: "KDU Mobility Hub",
    destinationDistrict: "Academic Campus Hub",
    departureTime: "18:30",
    arrivalTime: "18:54",
    durationMinutes: 24,
    dateLabel: "3 days ago",
    modes: ["AeroLink A08", "HyperRail H4", "Pod P17"],
    accessibilityBadges: ["Completed", "Assistance Utilized"],
  },
];
