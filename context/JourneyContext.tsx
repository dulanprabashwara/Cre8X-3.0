"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { JourneyPreferences, DEFAULT_PREFERENCES } from "@/lib/constants";
import { DESTINATIONS, DestinationItem } from "@/data/destinations";
import { JourneyData } from "@/data/journeys";
import { LiveEventState, SimulationPhase } from "@/data/live-events";
import { SAVED_PLACES, SavedPlace } from "@/data/places";
import { TRIPS_DATA, TripItem } from "@/data/trips";
import {
  TravelMethod,
  PlannerLocation,
  PLANNER_LOCATIONS,
  DEFAULT_PLANNER_ORIGIN,
  getRecommendedMethod,
  buildSingleMethodJourney,
  getLiveScenarioForMethod,
} from "@/lib/journeyPlanner";

interface ToastInfo {
  message: string;
  type?: "success" | "info" | "warning";
}

interface JourneyContextType {
  // Destination & Route Selection
  origin: PlannerLocation;
  setOrigin: (origin: PlannerLocation) => void;
  destination: DestinationItem;
  setDestination: (dest: DestinationItem) => void;
  departureTime: string;
  setDepartureTime: (time: string) => void;
  selectedMethod: TravelMethod;
  setSelectedMethod: (method: TravelMethod) => void;
  userHasOverriddenMethod: boolean;
  recommendedMethod: TravelMethod;
  recommendationReason: string;
  resetToRecommendedMethod: () => void;

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
  // Planner State
  const [origin, setOriginState] = useState<PlannerLocation>(DEFAULT_PLANNER_ORIGIN);
  const [destination, setDestinationState] = useState<DestinationItem>(DESTINATIONS[0]);
  const [departureTime, setDepartureTime] = useState<string>("09:18");
  const [selectedMethod, setSelectedMethodState] = useState<TravelMethod>("rail");
  const [userHasOverriddenMethod, setUserHasOverriddenMethod] = useState<boolean>(false);

  const [routeStyle, setRouteStyle] = useState<
    "fastest" | "calmest" | "eco" | "low_walking"
  >("low_walking");
  const [preferences, setPreferences] =
    useState<JourneyPreferences>(DEFAULT_PREFERENCES);
  const [isPlanning, setIsPlanning] = useState(false);

  // Map destination to PlannerLocation
  const destinationLocation: PlannerLocation = useMemo(() => {
    const matched = PLANNER_LOCATIONS.find((l) => l.id === destination.id);
    if (matched) return matched;
    return {
      id: destination.id,
      name: destination.name,
      district: destination.district,
      terminal: "Terminal Concourse",
      supportedMethods: ["rail", "pod", "aero", "road"],
    };
  }, [destination]);

  // Compute NOVA's recommended method deterministically
  const recommendation = useMemo(() => {
    return getRecommendedMethod(origin, destinationLocation, departureTime, preferences);
  }, [origin, destinationLocation, departureTime, preferences]);

  const recommendedMethod = recommendation.recommendedMethod;
  const recommendationReason = recommendation.reason;

  // Build the single-method JourneyData
  const currentJourney = useMemo(() => {
    return buildSingleMethodJourney(
      origin,
      destinationLocation,
      departureTime,
      selectedMethod,
      preferences,
    );
  }, [origin, destinationLocation, departureTime, selectedMethod, preferences]);

  // Live simulation scenario matched to the selected single method
  const liveScenario = useMemo(() => {
    return getLiveScenarioForMethod(selectedMethod, currentJourney);
  }, [selectedMethod, currentJourney]);

  // Live Tracking state
  const [liveMode, setLiveMode] = useState<"map" | "instructions">("map");
  const [simulationPhase, setSimulationPhase] =
    useState<SimulationPhase>("normal_travel");
  const [liveState, setLiveState] = useState<LiveEventState>(
    liveScenario.initialLiveState,
  );
  const [routeVariant, setRouteVariant] = useState<"original" | "rerouted">(
    "original",
  );

  // Sync initial live state when liveScenario changes and user hasn't rerouted
  useEffect(() => {
    if (simulationPhase === "normal_travel") {
      setLiveState(liveScenario.initialLiveState);
    }
  }, [liveScenario, simulationPhase]);

  // Saved Places & Trips State
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(SAVED_PLACES);
  const [trips] = useState<TripItem[]>(TRIPS_DATA);

  // Synchronize active trip with current journey
  const activeTrip: TripItem = useMemo(() => {
    return {
      id: "trip-active-01",
      status: "active",
      origin: currentJourney.origin,
      destination: currentJourney.destination,
      destinationDistrict: currentJourney.destinationDetail,
      departureTime: currentJourney.departureTime,
      arrivalTime: currentJourney.arrivalTime,
      durationMinutes: currentJourney.durationMinutes,
      dateLabel: "Today · In Progress",
      modes: [currentJourney.segments[0]?.vehicleCode || "HyperRail H4"],
      currentLeg: {
        vehicle: currentJourney.segments[0]?.vehicleCode || "HyperRail H4",
        nextStop: currentJourney.destination,
        minutesToNext: 4,
      },
      accessibilityBadges: ["Direct Journey", "Step-free route", "Guardian Active"],
      confidenceScore: 99.8,
    };
  }, [currentJourney]);

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

  // Set Origin handler
  const setOrigin = useCallback(
    (newOrigin: PlannerLocation) => {
      setOriginState(newOrigin);
      // If user hasn't overridden method, update to recommended for the new route
      if (!userHasOverriddenMethod) {
        const nextRec = getRecommendedMethod(
          newOrigin,
          destinationLocation,
          departureTime,
          preferences,
        );
        setSelectedMethodState(nextRec.recommendedMethod);
      }
    },
    [userHasOverriddenMethod, destinationLocation, departureTime, preferences],
  );

  // Set Destination handler
  const setDestination = useCallback(
    (newDest: DestinationItem) => {
      setDestinationState(newDest);
      const nextDestLoc = PLANNER_LOCATIONS.find((l) => l.id === newDest.id) || {
        id: newDest.id,
        name: newDest.name,
        district: newDest.district,
        terminal: "Terminal Concourse",
        supportedMethods: ["rail", "pod", "aero", "road"] as TravelMethod[],
      };
      if (!userHasOverriddenMethod) {
        const nextRec = getRecommendedMethod(
          origin,
          nextDestLoc,
          departureTime,
          preferences,
        );
        setSelectedMethodState(nextRec.recommendedMethod);
      }
    },
    [userHasOverriddenMethod, origin, departureTime, preferences],
  );

  // Set Selected Method handler (explicit user override)
  const setSelectedMethod = useCallback((method: TravelMethod) => {
    setSelectedMethodState(method);
    setUserHasOverriddenMethod(true);
  }, []);

  // Reset to Recommended Method
  const resetToRecommendedMethod = useCallback(() => {
    setUserHasOverriddenMethod(false);
    setSelectedMethodState(recommendedMethod);
  }, [recommendedMethod]);

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
        if (
          params.get("preferences") === "open" ||
          params.get("modal") === "preferences"
        ) {
          setPreferencesSheetOpen(true);
        }
        if (
          params.get("assistance") === "open" ||
          params.get("modal") === "assistance"
        ) {
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
    setTimeout(() => {
      setIsPlanning(false);
      if (onComplete) onComplete();
    }, 1400);
  }, []);

  // Simulation Triggers
  const triggerApproachingTransfer = useCallback(() => {
    setSimulationPhase("approaching_transfer");
    setLiveState((prev) => ({
      ...prev,
      ...liveScenario.approachingState,
    }));
  }, [liveScenario]);

  const triggerNetworkChange = useCallback(() => {
    setSimulationPhase("network_change");
    setLiveState((prev) => ({
      ...prev,
      networkChange: liveScenario.networkChangeEvent,
    }));
  }, [liveScenario]);

  const acceptReroute = useCallback(() => {
    setRouteVariant("rerouted");
    setSimulationPhase("rerouted_confirmed");
    setLiveState((prev) => ({
      ...prev,
      ...liveScenario.reroutedLiveState,
      networkChange: undefined,
    }));
    showToast(`Route updated · ARRIVAL PROTECTED at ${currentJourney.arrivalTime}`);
  }, [currentJourney.arrivalTime, liveScenario, showToast]);

  const undoReroute = useCallback(() => {
    setRouteVariant("original");
    setSimulationPhase("normal_travel");
    setLiveState(liveScenario.initialLiveState);
    showToast("Reverted to original connection");
  }, [liveScenario, showToast]);

  const resetSimulation = useCallback(() => {
    setSimulationPhase("normal_travel");
    setLiveState(liveScenario.initialLiveState);
    setRouteVariant("original");
  }, [liveScenario]);

  return (
    <JourneyContext.Provider
      value={{
        origin,
        setOrigin,
        destination,
        setDestination,
        departureTime,
        setDepartureTime,
        selectedMethod,
        setSelectedMethod,
        userHasOverriddenMethod,
        recommendedMethod,
        recommendationReason,
        resetToRecommendedMethod,
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
