"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { JourneyPreferences, DEFAULT_PREFERENCES } from "@/lib/constants";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { PRIMARY_JOURNEY, JourneyData } from "@/data/journeys";
import {
  INITIAL_LIVE_STATE,
  LiveEventState,
  APPROACHING_STATE,
  NETWORK_CHANGE_EVENT,
  SimulationPhase,
} from "@/data/live-events";
import { SAVED_PLACES, SavedPlace } from "@/data/places";
import { TRIPS_DATA, TripItem } from "@/data/trips";

interface ToastInfo {
  message: string;
  type?: "success" | "info" | "warning";
}

interface JourneyContextType {
  // Destination & Route Selection
  destination: DestinationItem;
  setDestination: (dest: DestinationItem) => void;
  routeStyle: "fastest" | "calmest" | "eco" | "low_walking";
  setRouteStyle: (style: "fastest" | "calmest" | "eco" | "low_walking") => void;

  // Preferences
  preferences: JourneyPreferences;
  updatePreferences: (newPrefs: Partial<JourneyPreferences>) => void;
  savePreferences: (newPrefs: JourneyPreferences) => void;

  // Saved Places & Trips
  savedPlaces: SavedPlace[];
  addSavedPlace: (place: SavedPlace) => void;
  removeSavedPlace: (id: string) => void;
  trips: TripItem[];
  activeTrip: TripItem;

  // Network & Explore Filters
  selectedNetworkMode: string | null;
  setSelectedNetworkMode: (mode: string | null) => void;
  selectedExplorePlace: string | null;
  setSelectedExplorePlace: (id: string | null) => void;

  // Journey Detail Data
  currentJourney: JourneyData;
  isPlanning: boolean;
  startPlanning: (onComplete?: () => void) => void;

  // Live State
  liveMode: "map" | "instructions";
  setLiveMode: (mode: "map" | "instructions") => void;
  simulationPhase: SimulationPhase;
  liveState: LiveEventState;
  routeVariant: "original" | "rerouted";

  // Simulation actions
  triggerApproachingTransfer: () => void;
  triggerNetworkChange: () => void;
  acceptReroute: () => void;
  undoReroute: () => void;
  resetSimulation: () => void;

  // Sheet & Dialog states
  destinationSheetOpen: boolean;
  setDestinationSheetOpen: (open: boolean) => void;
  preferencesSheetOpen: boolean;
  setPreferencesSheetOpen: (open: boolean) => void;
  whyJourneySheetOpen: boolean;
  setWhyJourneySheetOpen: (open: boolean) => void;
  assistanceSheetOpen: boolean;
  setAssistanceSheetOpen: (open: boolean) => void;
  mobilityDialogOpen: boolean;
  setMobilityDialogOpen: (open: boolean) => void;
  voiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;

  // Toasts
  toast: ToastInfo | null;
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

const PREFS_STORAGE_KEY = "nova_journey_preferences_2100";

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestination] = useState<DestinationItem>(
    DESTINATIONS[0],
  );
  const [routeStyle, setRouteStyle] = useState<
    "fastest" | "calmest" | "eco" | "low_walking"
  >("low_walking");
  const [preferences, setPreferences] =
    useState<JourneyPreferences>(DEFAULT_PREFERENCES);
  const [currentJourney] = useState<JourneyData>(PRIMARY_JOURNEY);
  const [isPlanning, setIsPlanning] = useState(false);

  // Live Tracking state
  const [liveMode, setLiveMode] = useState<"map" | "instructions">("map");
  const [simulationPhase, setSimulationPhase] =
    useState<SimulationPhase>("normal_travel");
  const [liveState, setLiveState] =
    useState<LiveEventState>(INITIAL_LIVE_STATE);
  const [routeVariant, setRouteVariant] = useState<"original" | "rerouted">(
    "original",
  );

  // Saved Places & Trips State
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(SAVED_PLACES);
  const [trips] = useState<TripItem[]>(TRIPS_DATA);
  const [activeTrip] = useState<TripItem>(TRIPS_DATA[0]);

  // Network & Explore selection
  const [selectedNetworkMode, setSelectedNetworkMode] = useState<string | null>(
    null,
  );
  const [selectedExplorePlace, setSelectedExplorePlace] = useState<
    string | null
  >(null);

  // Sheet Controls
  const [destinationSheetOpen, setDestinationSheetOpen] = useState(false);
  const [preferencesSheetOpen, setPreferencesSheetOpen] = useState(false);
  const [whyJourneySheetOpen, setWhyJourneySheetOpen] = useState(false);
  const [assistanceSheetOpen, setAssistanceSheetOpen] = useState(false);
  const [mobilityDialogOpen, setMobilityDialogOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "warning" = "success") => {
      setToast({ message, type });
      setTimeout(() => {
        setToast((prev) => (prev?.message === message ? null : prev));
      }, 3800);
    },
    [],
  );

  const addSavedPlace = useCallback(
    (place: SavedPlace) => {
      setSavedPlaces((prev) => {
        if (prev.some((p) => p.id === place.id)) return prev;
        return [...prev, place];
      });
      showToast(`Saved “${place.name}” to your places`);
    },
    [showToast],
  );

  const removeSavedPlace = useCallback(
    (id: string) => {
      setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
      showToast("Removed from saved places", "info");
    },
    [showToast],
  );

  const handleSetRouteStyle = useCallback(
    (style: "fastest" | "calmest" | "eco" | "low_walking") => {
      setRouteStyle(style);
      setPreferences((prev) => ({ ...prev, routeStyle: style }));
    },
    [],
  );

  // Load preferences from localStorage on mount and check modal query param
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences((prev) => ({ ...prev, ...parsed }));
        if (parsed.routeStyle) {
          setRouteStyle(parsed.routeStyle);
        }
      }
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("preferences") === "open" || params.get("modal") === "preferences") {
          setPreferencesSheetOpen(true);
        }
        if (params.get("assistance") === "open" || params.get("modal") === "assistance") {
          setAssistanceSheetOpen(true);
        }
      }
    } catch (e) {
      console.warn("Could not load stored preferences:", e);
    }
  }, []);

  const updatePreferences = useCallback(
    (newPrefs: Partial<JourneyPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...newPrefs };
        if (newPrefs.routeStyle) {
          setRouteStyle(newPrefs.routeStyle);
        }
        return next;
      });
    },
    [],
  );

  const savePreferences = useCallback(
    (newPrefs: JourneyPreferences) => {
      setPreferences(newPrefs);
      setRouteStyle(newPrefs.routeStyle);
      try {
        localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(newPrefs));
        showToast("Preferences saved. NOVA will use them on future journeys.");
      } catch (e) {
        console.warn("Could not write to localStorage:", e);
      }
    },
    [showToast],
  );

  const startPlanning = useCallback((onComplete?: () => void) => {
    setIsPlanning(true);
    // Simulate smart multimodal route coordination
    setTimeout(() => {
      setIsPlanning(false);
      if (onComplete) onComplete();
    }, 1800);
  }, []);

  // Simulation Triggers
  const triggerApproachingTransfer = useCallback(() => {
    setSimulationPhase("approaching_transfer");
    setLiveState((prev) => ({
      ...prev,
      ...APPROACHING_STATE,
    }));
  }, []);

  const triggerNetworkChange = useCallback(() => {
    setSimulationPhase("network_change");
    setLiveState((prev) => ({
      ...prev,
      networkChange: NETWORK_CHANGE_EVENT,
    }));
  }, []);

  const acceptReroute = useCallback(() => {
    setRouteVariant("rerouted");
    setSimulationPhase("rerouted_confirmed");
    setLiveState((prev) => ({
      ...prev,
      currentVehicle: "AeroLink Express",
      vehicleCode: "AeroLink Express A14",
      nextStop: "Gate 05 Express",
      nextStopPlatform: "SkyDeck 05",
      minutesRemaining: 4,
      estimatedArrival: "09:42", // Arrival remains protected!
      nextAction: {
        title: "Board AeroLink Express A14",
        description: "Gate 05 · Priority ramp secured",
        securedConnection: "Arrival protected at 09:42",
        walkingTimeTag: "Elevator B directly to Gate 05",
      },
      networkChange: undefined,
    }));
    showToast("Route updated · ARRIVAL PROTECTED at 09:42");
  }, [showToast]);

  const undoReroute = useCallback(() => {
    setRouteVariant("original");
    setSimulationPhase("normal_travel");
    setLiveState(INITIAL_LIVE_STATE);
    showToast("Reverted to original connection");
  }, [showToast]);

  const resetSimulation = useCallback(() => {
    setSimulationPhase("normal_travel");
    setLiveState(INITIAL_LIVE_STATE);
    setRouteVariant("original");
  }, []);

  return (
    <JourneyContext.Provider
      value={{
        destination,
        setDestination,
        routeStyle,
        setRouteStyle: handleSetRouteStyle,
        preferences,
        updatePreferences,
        savePreferences,
        savedPlaces,
        addSavedPlace,
        removeSavedPlace,
        trips,
        activeTrip,
        selectedNetworkMode,
        setSelectedNetworkMode,
        selectedExplorePlace,
        setSelectedExplorePlace,
        currentJourney,
        isPlanning,
        startPlanning,
        liveMode,
        setLiveMode,
        simulationPhase,
        liveState,
        routeVariant,
        triggerApproachingTransfer,
        triggerNetworkChange,
        acceptReroute,
        undoReroute,
        resetSimulation,
        destinationSheetOpen,
        setDestinationSheetOpen,
        preferencesSheetOpen,
        setPreferencesSheetOpen,
        whyJourneySheetOpen,
        setWhyJourneySheetOpen,
        assistanceSheetOpen,
        setAssistanceSheetOpen,
        mobilityDialogOpen,
        setMobilityDialogOpen,
        voiceModalOpen,
        setVoiceModalOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return context;
}
