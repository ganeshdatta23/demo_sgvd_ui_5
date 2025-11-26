# Darshan Directions - Divine Navigation App

A spiritual navigation guide designed to help devotees locate and orient themselves towards Sri Ganapathy Sachidananda Swamiji's ashrama (or any searched spiritual location) using precision compass and sensor fusion.

## Features

### 1. Precision Compass (Home Tab)
- **True/Magnetic North Handling**: Uses device orientation sensors to provide accurate heading.
- **Target Bearing**: Calculates the Great Circle bearing (Qibla-style) to the target location.
- **Visual Guidance**: 
  - Dynamic SVG compass dial.
  - Heads-up instructions (Turn Left, Turn Right, Go Forward).
  - "Divine Glow" effect when aligned within the threshold (10 degrees).
- **Gemini-powered Search**: Find temples/ashrams naturally (e.g., "Tirupati", "Mysore Ashram") via Google Gemini API.

### 2. Interactive Dashboard
- **Appaji Mode**: View details about Sri Swamiji, daily quotes, and target coordinates.
- **User Journey Mode**:
  - Live coordinate tracking.
  - **Spiritual Streaks**: Track Japa (mantra repetition), Pranayama cycles, and Darshan visits.
  - **Login State**: Toggle between Guest and Sadhaka profiles.

### 3. Settings
- **Dark Mode / Divine Dusk Mode**: Toggle between the warm Saffron/Amber theme and a deep Stone/Night mode.
- **Swamiji Sunrise Alarm**: Toggle for Brahma Muhurta notifications.
- Haptic Feedback controls.

## Architecture

The codebase is refactored for modularity and scalability.

### Directory Structure

```
/
├── components/
│   ├── views/           # Screen-level components (Home, Dashboard, Programs, Settings)
│   ├── Compass.tsx      # The main SVG compass UI
│   ├── BottomNav.tsx    # Navigation bar
│   ├── LocationSearch.tsx # Search bar with Gemini integration
│   └── DarshanOverlay.tsx # Visual overlay when target is reached/aligned
├── hooks/
│   ├── useSensors.ts    # Manages Geolocation and DeviceOrientation API
│   └── useBearing.ts    # Calculates haversine distance and bearing angles
├── services/
│   └── geminiService.ts # Google GenAI SDK integration
├── types.ts             # Shared TypeScript interfaces (Coordinates, Targets, Tabs)
├── constants.ts         # Config (Colors, Defaults, Versioning)
├── App.tsx              # Main Controller (State Management)
└── index.tsx            # Entry point
```

### Key Technologies
- **React 19**: UI Framework.
- **Tailwind CSS**: Styling (Glassmorphism, Animations).
- **Lucide React**: Iconography.
- **Google GenAI SDK**: Natural language location search and daily blessings.

## Permissions
The app requires:
1. **Geolocation**: To calculate distance and bearing.
2. **Device Orientation**: To drive the compass. (On iOS, this requires explicit permission via the button on the Home screen).
