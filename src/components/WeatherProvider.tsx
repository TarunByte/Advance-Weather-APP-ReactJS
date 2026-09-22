/**
 * Node modules
 */
import { createContext } from 'react';

/**
 * Custom modules
 */
import { APP, WEATHER_API } from '@/config';
import { openWeatherApi } from '@/api';

/**
 * Hooks
 */
import { useState, useEffect, useCallback } from 'react';

/**
 * Types
 */
import type {
  CurrentWeather,
  MinutelyForecast,
  HourlyForecast,
  DailyForecast,
  Alert,
  Geocoding,
  WeatherTimezone,
  OneCallWeatherRes,
} from '@/types';

type Weather = {
  current: CurrentWeather;
  minutely: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: Alert[];
  location: Geocoding;
  timezone: WeatherTimezone;
};

export type WeatherUnitType = 'metric' | 'imperial';

type WeatherStateParam = {
  lat?: number;
  lon?: number;
  unit?: WeatherUnitType;
};

type WeatherProviderState = {
  weather: Weather | null;
  setWeather: (weather: WeatherStateParam) => void;
};

const initialState: WeatherProviderState = {
  weather: null,
  setWeather: () => null,
};

/**
 * Context
 */
export const WeatherProviderContext =
  createContext<WeatherProviderState>(initialState);

export const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const defualtLat =
    Number(localStorage.getItem(APP.STORE_KEY.LAT)) || WEATHER_API.DEFAULTS.LAT;
  const defualtLon =
    Number(localStorage.getItem(APP.STORE_KEY.LON)) || WEATHER_API.DEFAULTS.LON;
  const defualtUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  // States
  const [weather, setWeather] = useState<Weather | null>(null);

  // Callbacks
  const oneCall = useCallback(
    async (lat: number, lon: number, units: WeatherUnitType) => {
      const response = await openWeatherApi.get('/data/2.5/weather', {
        params: {
          lat,
          lon,
          units,
        },
      });

      console.log(response.data);
      return response.data as OneCallWeatherRes;
    },
    [],
  );

  const reverseGeo = useCallback(
    async (lat: number, lon: number, limit = 1) => {
      const response = await openWeatherApi.get('/geo/1.0/reverse', {
        params: {
          lat,
          lon,
          limit,
        },
      });

      return response.data as Geocoding[];
    },
    [],
  );

  const getWeather = useCallback(
    async ({
      lat = defualtLat,
      lon = defualtLon,
      unit = defualtUnit,
    }: WeatherStateParam) => {
      const oneCallRes = await oneCall(lat, lon, unit);
      const reverseGeoRes = await reverseGeo(lat, lon);

      setWeather({
        current: oneCallRes.current,
        minutely: oneCallRes.minutely,
        hourly: oneCallRes.hourly,
        daily: oneCallRes.daily,
        alerts: oneCallRes.alerts,
        location: reverseGeoRes[0],
        timezone: {
          timezone: oneCallRes.timezone,
          offset: oneCallRes.timezone_offset,
        },
      });
    },
    [defualtLat, defualtLon, defualtUnit, oneCall, reverseGeo],
  );

  // Initial weather call
  useEffect(() => {
    // One Call 3.0
    (async () => await getWeather({}))();
  }, [getWeather]);

  return (
    <WeatherProviderContext.Provider
      value={{ weather, setWeather: getWeather }}
    >
      {children}
    </WeatherProviderContext.Provider>
  );
};
