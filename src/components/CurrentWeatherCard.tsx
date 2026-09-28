/**
 * Custom modules
 */
import { APP, WEATHER_API } from '@/config';

/**
 * Hooks
 */
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Assets
 */
import { Navigation2Icon } from 'lucide-react';

/**
 * Types
 */
import type { WeatherUnitType } from '@/components/WeatherProvider';

export const CurrentWeatherCard = () => {
  const { weather } = useWeather();

  if (!weather || !weather.current)
    return <Skeleton className='min-h-[300px] rounded-xl' />;

  const currentWeather = {
    dt: new Date(weather.current.dt * 1000).toLocaleTimeString('en-US', {
      timeStyle: 'short',
    }),
    iconCode: weather.current.weather[0].icon,
    temp: weather.current.temp.toFixed(),
    description: weather.current.weather[0].description,
    feelsLike: weather.current.feels_like.toFixed(),
    windSpeed: weather.current.wind_speed.toFixed(),
    windDeg: weather.current.wind_deg,
    humidity: weather.current.humidity,
    visibility: (weather.current.visibility / 1000).toFixed(),
    pressure: weather.current.pressure,
    dewPoint: weather.current.dew_point.toFixed(),
  };
  const weatherUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  return (
    <Card className='@container min-h-[300px]'>
      <CardHeader>
        <CardTitle>Current weather</CardTitle>

        <CardDescription>{currentWeather.dt}</CardDescription>
      </CardHeader>

      <CardContent className='grow'>
        <div className='flex flex-wrap items-center gap-x-6'>
          <figure>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@2x.png`}
              alt={currentWeather.description}
              width={70}
              height={70}
              className='object-contain'
            />
          </figure>

          <p className='text-5xl font-medium flex items-start sm:text-7xl'>
            {currentWeather.temp}

            <span className='text-3xl'>{APP.UNIT.TEMP[weatherUnit]}</span>
          </p>

          <div>
            <p className='font-medium capitalize sm:text-lg'>
              {currentWeather.description}
            </p>

            <div className='text-sm flex items-center gap-2'>
              <span className='text-muted-foreground'>Feels like</span>
              <span>{currentWeather.feelsLike}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex-wrap gap-x-8 gap-y-2 @lg:justify-between'>
        <div>
          <p className='text-sm text-muted-foreground'>Wind</p>
          <div className='flex items-center gap-1'>
            <p>
              {currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}
            </p>

            <Navigation2Icon
              size={14}
              fill='currentColor'
              style={{
                rotate: `${currentWeather.windDeg}deg`,
              }}
            />
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Humidity</p>

          <div className='flex items-center gap-1'>
            <p>{currentWeather.humidity}%</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Visibility</p>

          <div className='flex items-center gap-1'>
            <p>{currentWeather.visibility} km</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Pressure</p>

          <div className='flex items-center gap-1'>
            <p>{currentWeather.pressure} hPa</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Dew point</p>

          <div className='flex items-center gap-1'>
            <p>{currentWeather.dewPoint}°</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
