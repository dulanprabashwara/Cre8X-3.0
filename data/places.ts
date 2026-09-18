export interface SavedPlace {
  id: string;
  name: string;
  address: string;
  district: string;
  tag: "home" | "work" | "frequent" | "custom";
  iconType: "home" | "work" | "airport" | "building" | "star";
  coordinates: { x: number; y: number };
}

export const SAVED_PLACES: SavedPlace[] = [
  {
    id: "place-home",
    name: "Home",
    address: "Skyview Residences, Sector 4",
    district: "Ratmalana District",
    tag: "home",
    iconType: "home",
    coordinates: { x: 165, y: 322 },
  },
  {
    id: "place-work",
    name: "Work",
    address: "Autonomous Innovation Center, Tower 12",
    district: "Colombo Central",
    tag: "work",
    iconType: "work",
    coordinates: { x: 226, y: 236 },
  },
  {
    id: "place-skyport",
    name: "Colombo Skyport",
    address: "International Air Mobility Terminal 02",
    district: "North Transit Zone",
    tag: "frequent",
    iconType: "airport",
    coordinates: { x: 304, y: 154 },
  },
  {
    id: "place-port-city",
    name: "Port City Ocean Hub",
    address: "Marina Terminal Gate 3",
    district: "Waterfront District",
    tag: "frequent",
    iconType: "building",
    coordinates: { x: 190, y: 180 },
  },
];
