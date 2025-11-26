export type Tab = 'home' | 'dashboard' | 'programs' | 'settings';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationTarget {
  name: string;
  coords: Coordinates;
  description?: string;
}

export interface SensorState {
  coords: Coordinates | null;
  heading: number; // 0-360, where 0 is North
  error: string | null;
}

export interface BearingResult {
  bearing: number; // 0-360 degrees from North
  distance: number; // in kilometers
  isAligned: boolean; // true if heading matches bearing within threshold
  angleDiff: number;
}

export enum AppMode {
  TRACKING = 'TRACKING',
  DARSHAN = 'DARSHAN',
}

// Shared Props Interface for standardizing View Components
export interface BaseViewProps {
  isDarkMode: boolean;
  className?: string;
}
