import { useState, useEffect } from 'react';
import { Coordinates, BearingResult } from '../types';
import { ALIGNMENT_THRESHOLD } from '../constants';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export const useBearing = (
  current: Coordinates | null,
  target: Coordinates | null,
  currentHeading: number
): BearingResult => {
  const [result, setResult] = useState<BearingResult>({
    bearing: 0,
    distance: 0,
    isAligned: false,
    angleDiff: 0,
  });

  useEffect(() => {
    if (!current || !target) return;

    const lat1 = toRad(current.latitude);
    const lon1 = toRad(current.longitude);
    const lat2 = toRad(target.latitude);
    const lon2 = toRad(target.longitude);

    // Haversine Distance
    const R = 6371; // km
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Bearing
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    let bearing = toDeg(Math.atan2(y, x));
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    // Alignment Logic
    // Calculate difference considering the circular nature (0/360)
    let angleDiff = bearing - currentHeading;
    // Normalize diff to -180 to +180
    while (angleDiff <= -180) angleDiff += 360;
    while (angleDiff > 180) angleDiff -= 360;

    const isAligned = Math.abs(angleDiff) < ALIGNMENT_THRESHOLD;

    setResult({ bearing, distance, isAligned, angleDiff });
  }, [current, target, currentHeading]);

  return result;
};
