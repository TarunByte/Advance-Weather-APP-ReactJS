/**
 * Node modules
 */
import { createPortal } from 'react-dom';
import mapboxgl from 'mapbox-gl';

/**
 * Custom modules
 */
import { APP, WEATHER_API } from '@/config';

/**
 * Hooks
 */
import { useEffect, useMemo, useRef } from 'react';
import { useWeather } from '@/hooks/useWeather';

/**
 * Assets
 */
import { ThermometerSunIcon } from 'lucide-react';

/**
 * Types
 */
import type { Map, LngLatLike, Marker as MarkerType } from 'mapbox-gl';
import type { WeatherUnitType } from '@/components/WeatherProvider';

type Props = {
  map: Map;
  coordinates: LngLatLike;
};

export const Marker = ({ map, coordinates }: Props) => {
  // Hooks
  const { weather } = useWeather();

  // Refs
  const markerRef = useRef<MarkerType | null>(null);

  // Memos
  const markerElement = useMemo(() => document.createElement('div'), []);

  const weatherUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  // Effects
  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({
      element: markerElement,
    })
      .setLngLat(coordinates)
      .addTo(map);
  }, [map, coordinates, markerElement]);

  if (!weather) return;

  return (
    <>
      {createPortal(
        <div className='relative flex items-center gap-2 bg-foreground text-background w-fit rounded-md px-3 py-1.5 text-sm font-semibold text-balance drop-shadow-lg isolate'>
          <ThermometerSunIcon
            size={16}
            fill='currentColor'
          />

          <span>
            {weather.current.temp.toFixed()}
            {APP.UNIT.TEMP[weatherUnit]}
          </span>

          <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 size-3 rounded-[3px] bg-foreground -z-10'></div>
        </div>,
        markerElement,
      )}
    </>
  );
};
