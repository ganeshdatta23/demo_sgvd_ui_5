import { useState, useEffect, useCallback } from 'react';
import { SensorState } from '../types';

export const useSensors = () => {
  const [state, setState] = useState<SensorState>({
    coords: null,
    heading: 0,
    error: null,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    const geoId = navigator.geolocation.watchPosition(
      (position) => {
        setState(s => ({
          ...s,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      (err) => {
        setState(s => ({ ...s, error: `GPS Error: ${err.message}` }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(geoId);
  }, []);

  // Orientation Helper
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let heading = 0;

    // iOS Webkit
    if ((event as any).webkitCompassHeading) {
      heading = (event as any).webkitCompassHeading;
    } 
    // Android / Standard
    else if (event.alpha !== null) {
      // alpha is 0 when pointing North (usually), but depends on device frame
      // This is a simplified fallback. 
      // For true absolute orientation on Android, we might need `deviceorientationabsolute`
      heading = 360 - event.alpha; 
    }

    setState(s => ({ ...s, heading: heading % 360 }));
  }, []);

  // Initial Listener Setup (Desktop/Android usually work immediately)
  useEffect(() => {
    // Check if absolute orientation is supported (Android)
    if ('ondeviceorientationabsolute' in (window as any)) {
        (window as any).addEventListener('deviceorientationabsolute', handleOrientation);
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
        if ('ondeviceorientationabsolute' in (window as any)) {
            (window as any).removeEventListener('deviceorientationabsolute', handleOrientation);
        } else {
            window.removeEventListener('deviceorientation', handleOrientation);
        }
    };
  }, [handleOrientation]);

  // iOS Permission Request
  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setState(s => ({ ...s, error: "Compass permission denied" }));
        }
      } catch (error) {
        setState(s => ({ ...s, error: "Error requesting compass permission" }));
      }
    } else {
      // Non-iOS devices imply permission
      setPermissionGranted(true);
    }
  };

  return { ...state, requestCompassPermission, permissionGranted };
};