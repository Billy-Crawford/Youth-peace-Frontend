// src/hooks/useGeoLocation.ts

"use client";

import { useEffect, useState } from "react";

export function useGeoLocation() {
  const [coords, setCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("GPS non supporté");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return { coords, error };
}

