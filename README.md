# NOVA 2100 — Universal Mobility OS

> **One journey. Every network.**  
> Futuristic multimodal transportation operating system frontend prototype built for the UI/UX competition themed: *"Imagine 2100. Design What Comes Next."*

---

## 🌟 Overview

In the year 2100, passengers no longer navigate fragmented transportation networks. **NOVA** is a Universal Mobility Operating System that coordinates autonomous pods, ultra-high-speed HyperRail, sub-orbital/regional AeroLink shuttles, and accessible walking infrastructure into a single, cohesive journey.

The core philosophy:  
> **"NOVA handles transportation complexity so the passenger only needs to make simple decisions."**

---

## 🚀 Key Product Experiences & Screens

### 1. Home / Journey Planner (`/`)
- **Bioluminescent Header**: Glowing geometric NOVA logo, city network status (`● City network operating normally`), accessibility preferences shortcut, and passenger profile beacon.
- **Multimodal Origin & Destination**: Live GPS tracking from `KDU Mobility Hub` to `Colombo Skyport`, equipped with simulated voice search and clear actions.
- **Travel Style Preferences**: Instant switching between *Fastest*, *Calmest*, *Eco*, and *Low walking* (selected by default for competition demo flow).
- **Predictive NOVA Insight**: Quantum Coral AI intelligence card anticipating HyperRail rush-hour congestion and recommending an early departure to avoid a 14-minute delay.
- **Coordinating Loader**: Multi-stage transit reservation overlay allocating Autonomous Pod P17, HyperRail H4, and AeroLink A12 before navigating to Journey Details.
- **Floating Dock Navigation**: Sleek pill dock providing rapid access across Home, Journey, and Profile.

### 2. Destination Search Sheet
- **Accessible Bottom Sheet**: Blurred backdrop with drag pill handle and keyboard escape handling.
- **Quick Locations**: One-tap shortcuts for *Home (Ratmalana District)* and *Work (Colombo Central)*.
- **Recent Destinations**: Includes `Colombo Skyport` with the `✦ Best connection now` coral badge and verified checkmark, `Central District`, and `Port City Ocean Hub`.

### 3. Journey Preferences Sheet
- **Route Style**: 2x2 cards (*Fastest*, *Calmest*, *Eco*, *Low walking*).
- **Mobility Accommodations**: Step-free routes, walking reduction, and steep path avoidance.
- **Navigation Controls**: Simple instructions, extra transfer buffers, and audio guidance.
- **Experience Customization**: Reduced motion, minimal visual noise, and quiet notifications.
- **Local Persistence**: Automatically saved to `localStorage` with feedback toasts.

### 4. Journey Details (`/journey`)
- **Estimated Transit Summary**: Exact departure (`09:18`) and arrival (`09:42`) with `ARRIVAL ON TIME` status and `All connections ready` verification.
- **Journey Guardian**: Live monitoring card verifying vehicle reservations, secured transfers, and accessible routing.
- **Route Flow Sequence**: Interactive breakdown across Pod (4 min) → Rail (11 min) → Aero (7 min) → Walk (2 min).
- **Itinerary Details Timeline**: Expandable segment cards featuring platform numbers, zone guidance, and station guides.
- **Transfer Confidence Buffer**: Explanatory buffer visualization (4 min buffer available vs 2 min needed).
- **Accessibility Guarantee**: Verified 64% walking reduction with elevator confirmation at all transfers.
- **Why Did NOVA Choose This?**: Transparent comparative modal contrasting the selected route with the fastest alternative.
- **Sticky Bottom Action**: Departure status and primary *"Start journey ->"* button navigating to `/live`.

### 5. Live Journey & Tracking (`/live`)
- **Clean Passenger Header**: Communicates only `Live journey` and `● Connected` without engineering jargon.
- **Custom Responsive SVG City Map**: Zero external dependencies. Renders stylized districts, transit grids, travelled lines, active Luciferin Green routes, and Quantum Coral future paths. Takes ~55% of viewport height for strong visual prominence.
- **Bioluminescent Vehicle Beacon**: Pulsing directional green marker tracking vehicle location in real time.
- **Map vs. Instructions Switcher**: Seamless toggling between bird's-eye SVG map and high-contrast, simplified turn-by-turn guidance.
- **Focused Live Action Sheet**:
  - `HyperRail H4` to `Central Skyport` (4 min remaining) with dual-gradient progress bar.
  - `NEXT ACTION`: *"Exit at Central Skyport · Doors open on the left"* with transfer pedestrian icon and *"✓ AeroLink Gate 04 secured (90 sec walk)"*.
  - Direct actions for `Assistance` and `Repeat instruction`.
- **Approaching Transfer State**: Amber-accented gentle reminder at 8 seconds (*"Central Skyport in 2 min"*).
- **Key Wow Moment — AI Network Change & Rerouting**:
  - At 16 seconds, simulates an unexpected 6-minute delay on AeroLink A12.
  - NOVA autonomously recalculates an alternative connection via AeroLink Express A14.
  - Passenger taps *"Accept new route"*: signature path animation morphs the trajectory, maintaining protected arrival at **09:42**.
  - Provides instant `Undo` option.
- **Transit Assistance & Staff Dispatch**: Request station mobility staff meeting directly at `Platform 2B`.

---

## 🎨 NOVA Pearl Bioluminescent Design System

| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| **Pearl Cloud** | `#F7F4FA` | Primary screen canvas background |
| **Mist Violet** | `#F0EBF4` | Secondary surface, input & badge background |
| **Pure Pearl** | `#FFFFFF` | Elevated card surfaces and floating docks |
| **Deep Plum** | `#231D2B` | Primary headings, brand typography, active icons |
| **Secondary Plum** | `#655D6F` | Secondary labels, descriptions, station guides |
| **Muted Violet** | `#8B8295` | Captions, metadata, inactive icons |
| **Luciferin Green** | `#2FAE63` | Active route, primary CTAs, confirmed states, safe transfers |
| **Luciferin Soft** | `#E8F8EE` | Selected state backgrounds, success badges |
| **Quantum Coral** | `#E85F8E` | Predictive AI, future route vectors, network change alerts |
| **Quantum Soft** | `#FFF0F4` | NOVA Insight cards, predictive badges |
| **Warning Gold** | `#D99624` | Approaching transfer alerts, buffer cautions |
| **Error Crimson** | `#D94C61` | Restrained cancel actions, critical alerts |

---

## 💻 Tech Stack & Animation Architecture

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript (strict type safety)
- **Styling**: Tailwind CSS with centralized design tokens
- **Animation**: `framer-motion` (v11.11.11 retained intentionally for proven, tested runtime stability across SVG paths, bottom sheets, and spring transitions)
- **Icons**: Lucide React
- **Typography**: Space Grotesk (Headings & Labels), Inter (Body copy)

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Quality Check
```bash
npm run build
npm run lint
```

---

## ♿ Accessibility & Usability Standards

- **Target Dimensions**: All interactive touch targets meet or exceed 44 × 44px; primary CTA buttons are 52–56px.
- **Font Scale**: No text below 12px anywhere in the application; headings in Space Grotesk; body in Inter.
- **Multi-channel State Communication**: States are never conveyed by color alone; every indicator combines text, icons, borders, or checkmarks.
- **Reduced Motion**: Respects `prefers-reduced-motion` to tone down transitions for sensitive passengers.
- **Mobile First**: Pixel-perfect on standard mobile screens (360px–430px) with centered desktop layout up to 1100px.
