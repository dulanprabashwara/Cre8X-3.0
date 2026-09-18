export interface DestinationItem {
  id: string;
  name: string;
  district: string;
  category: "recent" | "quick" | "search";
  durationMinutes: number;
  badge?: string;
  iconType: "airport" | "building" | "ferry" | "home" | "work";
  isBestConnection?: boolean;
  modes: string[];
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
    modes: ["AeroLink", "HyperRail", "Pod"],
  },
  {
    id: "central-district",
    name: "Central District",
    district: "Colombo Core",
    category: "recent",
    durationMinutes: 18,
    iconType: "building",
    modes: ["HyperRail", "Pod", "Smart Road"],
  },
  {
    id: "port-city-ocean-hub",
    name: "Port City Ocean Hub",
    district: "Waterfront Transit District",
    category: "recent",
    durationMinutes: 31,
    iconType: "ferry",
    modes: ["Pod", "Smart Road", "AeroLink"],
  },
  {
    id: "home-ratmalana",
    name: "Home",
    district: "Ratmalana District",
    category: "quick",
    durationMinutes: 12,
    iconType: "home",
    modes: ["Pod", "HyperRail", "Smart Road"],
  },
  {
    id: "work-central",
    name: "Work",
    district: "Colombo Central",
    category: "quick",
    durationMinutes: 22,
    iconType: "work",
    modes: ["HyperRail", "Pod", "Smart Road"],
  },
];

export const DEFAULT_ORIGIN = {
  name: "KDU Mobility Hub",
  subtitle: "Current location",
  terminal: "Terminal A",
};
