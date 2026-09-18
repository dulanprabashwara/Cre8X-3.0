export const COLORS = {
  bg: "#F7F4FA",
  surface: "#F0EBF4",
  card: "#FFFFFF",
  border: "#DDD6E3",
  divider: "rgba(35, 29, 43, 0.08)",
  textPrimary: "#231D2B",
  textSecondary: "#655D6F",
  textMuted: "#8B8295",
  green: "#2FAE63",
  greenHover: "#258C50",
  greenSoft: "#E8F8EE",
  greenTrack: "rgba(47, 174, 99, 0.30)",
  coral: "#E85F8E",
  coralMid: "#EE6F72",
  coralOrange: "#F28B5B",
  coralSoft: "#FFF0F4",
  warning: "#D99624",
  warningSoft: "#FFF5DD",
  error: "#D94C61",
  errorSoft: "#FDECEF",
};

export interface JourneyPreferences {
  routeStyle: "fastest" | "calmest" | "eco" | "low_walking";
  stepFree: boolean;
  reduceWalking: boolean;
  avoidSteep: boolean;
  simpleInstructions: boolean;
  extraTransferTime: boolean;
  audioGuidance: boolean;
  reducedMotion: boolean;
  lessVisualInfo: boolean;
  quietNotifications: boolean;
}

export const DEFAULT_PREFERENCES: JourneyPreferences = {
  routeStyle: "low_walking", // Default state per specification
  stepFree: true,
  reduceWalking: true,
  avoidSteep: true,
  simpleInstructions: true,
  extraTransferTime: true,
  audioGuidance: false,
  reducedMotion: false,
  lessVisualInfo: false,
  quietNotifications: false,
};
