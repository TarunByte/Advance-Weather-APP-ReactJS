/**
 * Custom modules
 */
import { APP, WEATHER_API } from '@/config';

/**
 * Hooks
 */
import { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

/**
 * Types
 */
import type { WeatherUnitType } from '@/components/WeatherProvider';

export const UnitDropdown = () => {
  // Hooks
  const { setWeather } = useWeather();

  // States
  const [unit, setUnit] = useState<WeatherUnitType>(
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
      WEATHER_API.DEFAULTS.UNIT,
  );

  useEffect(() => {
    setWeather({ unit });

    localStorage.setItem(APP.STORE_KEY.UNIT, unit);
  }, [unit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='secondary'
            size='icon'
          />
        }
      >
        °{unit === 'metric' ? 'C' : 'F'}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-[200px]'
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-muted-foreground'>
            Weather settings
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuRadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as WeatherUnitType)}
        >
          <DropdownMenuRadioItem value='metric'>
            Metric (°C)
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value='imperial'>
            Imperial (°F)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
