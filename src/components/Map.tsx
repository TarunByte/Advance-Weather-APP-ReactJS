/**
 * Node modules
 */
import mapboxgl from 'mapbox-gl';

/**
 * Custom modules
 */
import { MAPBOX } from '@/config';

/**
 * Hooks
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import { Marker } from '@/components/Marker';

/**
 * Types
 */
import { Map as MapType, type LngLatLike } from 'mapbox-gl';

export const Map = () => {
  // Hooks
  const { theme } = useTheme();
  const { weather } = useWeather();

  // Memos
  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  // Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [map, setMap] = useState<MapType | null>(null);

  // Initial map box
  useEffect(() => {
    if (!mapContainerRef.current || !center) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    setMap(
      new mapboxgl.Map({
        container: mapContainerRef.current,
        center,
        zoom: MAPBOX.DEFAULTS.ZOOM,
        style: 'mapbox://styles/mapbox/standard',
        config: {
          basemap: {
            lightPreset: theme === 'light' ? 'day' : 'night',
          },
        },
      }),
    );
    return () => map?.remove();
  }, [theme, center]);

  return (
    <div
      ref={mapContainerRef}
      className='h-[300px] bg-card text-card-foreground rounded-xl border overflow-hidden shadow-sm'
    >
      {map && (
        <Marker
          map={map}
          coordinates={center}
        />
      )}
    </div>
  );
};
