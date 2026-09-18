export interface DestinationItem {
  id: string;
  name: string;
  district: string;
  category: "recent" | "quick" | "search";
  durationMinutes: number;
  badge?: string;
  iconType: "airport" | "building" | "ferry" | "home" | "work";
  isBestConnection?: boolean;
}

export const DESTINATIONS: DestinationItem[] = [
  {
    id: "colombo-skyport",
    name: "Colombo Skyport",
    district: "Air Mobility Terminal",
    category: "recent",
    durationMinutes: 24,
    badge: "Best connection now",
    iconType: "airport",
    isBestConnection: true,
  },
  {
    id: "central-district",
    name: "Central District",
    district: "Colombo Core",
    category: "recent",
    durationMinutes: 18,
    iconType: "building",
  },
  {
    id: "port-city-ocean-hub",
    name: "Port City Ocean Hub",
    district: "Waterfront Transit District",
    category: "recent",
    durationMinutes: 31,
    iconType: "ferry",
  },
  {
    id: "home-ratmalana",
    name: "Home",
    district: "Ratmalana District",
    category: "quick",
    durationMinutes: 12,
    iconType: "home",
  },
  {
    id: "work-central",
    name: "Work",
    district: "Colombo Central",
    category: "quick",
    durationMinutes: 22,
    iconType: "work",
  },
];

export const DEFAULT_ORIGIN = {
  name: "KDU Mobility Hub",
  subtitle: "Current location",
  terminal: "Terminal A",
};
