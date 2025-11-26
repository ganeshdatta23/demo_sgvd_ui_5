import { LocationTarget } from "./types";

export const APP_VERSION = "2.2.1 (Sunrise Edition)";

// Default to Avadhoota Datta Peetham, Mysore
export const DEFAULT_TARGET: LocationTarget = {
  name: "Avadhoota Datta Peetham, Mysore",
  coords: {
    latitude: 12.2958, // Approx location
    longitude: 76.6394,
  },
  description: "Sri Ganapathy Sachidananda Ashrama",
};

export const ALIGNMENT_THRESHOLD = 10; // degrees
export const VIBRATION_PATTERN = [100, 50, 100]; // ms

// Shared Styling Constants
export const COLORS = {
  dark: {
    card: "bg-stone-900/60 border-stone-800 text-stone-100 backdrop-blur-xl shadow-lg",
    subText: "text-stone-500",
    heading: "text-white",
    background: "bg-stone-950",
  },
  light: {
    card: "bg-black/20 border-white/10 text-white backdrop-blur-xl shadow-glass",
    subText: "text-amber-100/70",
    heading: "text-white drop-shadow-lg",
    background: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700/90 via-rose-950 to-slate-950",
  }
};
