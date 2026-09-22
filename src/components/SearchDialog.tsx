/**
 * Custom modules
 */
import { openWeatherApi } from '@/api';
import { APP, WEATHER_API } from '@/config';

/**
 * Hooks
 */
import { useEffect, useCallback, useState } from 'react';
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from '@/components/ui/item';

/**
 * Assets
 */
import { Map, MapPinnedIcon, SearchIcon } from 'lucide-react';

/**
 * Types
 */
import type { Geocoding } from '@/types';

export const SearchDialog = () => {
  // Hooks
  const { setWeather } = useWeather();

  // States
  const [search, setSearch] = useState<string>();
  const [results, setResults] = useState<Geocoding[]>([]);

  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);

  // Search request
  const geocoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get('geo/1.0/direct', {
      params: {
        q: search,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      },
    });

    return response.data as Geocoding[];
  }, []);

  // Keyboard shortcut for opening search modal <Ctrl-K>
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        setSearchDialogOpen(true);
      }
    };

    document.addEventListener('keydown', shortcut);

    // Remove listener when SearchDialog is removed from DOM
    return () => document.removeEventListener('keydown', shortcut);
  }, []);

  // Search functionality
  useEffect(() => {
    if (!search) return;

    (async () => {
      const results = await geocoding(search);

      console.log(results);

      results && setResults(results);
    })();
  }, [search, geocoding]);

  return (
    <Dialog
      open={searchDialogOpen}
      onOpenChange={setSearchDialogOpen}
    >
      <DialogTrigger
        render={
          <Button
            variant='ghost'
            className='me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50'
            onClick={() => setSearchDialogOpen((prev) => !prev)}
          />
        }
      >
        <SearchIcon className='lg:text-muted-foreground' />

        <div className='flex justify-between w-[250px] max-lg:hidden'>
          Search weather...
          <KbdGroup>
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </KbdGroup>
        </div>
      </DialogTrigger>

      <DialogContent
        className='p-0 bg-card gap-0'
        showCloseButton={false}
      >
        <DialogHeader className='sr-only'>
          <DialogTitle>Search weather</DialogTitle>

          <DialogDescription>
            Search weather by city or country
          </DialogDescription>
        </DialogHeader>

        <InputGroup className='ring-0! border-t-0! border-x-0! border-b border-border! rounded-b-none bg-transparent!'>
          <InputGroupInput
            placeholder='Search weather...'
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />

          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup className='min-h-80 p-2'>
          {!results.length && (
            <p className='text-center text-sm py-4'>No results found!</p>
          )}

          {results.map(({ name, lat, lon, state, country }) => (
            <Item
              key={name + lat + lon}
              size='sm'
              className='relative p-2'
            >
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>

                <ItemDescription>
                  {state ? state + ', ' : ''}
                  {country}
                </ItemDescription>
              </ItemContent>

              <ItemActions>
                <DialogClose
                  render={
                    <Button
                      variant='ghost'
                      size='icon'
                      className='after:absolute after:inset-0'
                      onClick={() => {
                        setWeather({ lat, lon });
                        localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
                        localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
                      }}
                    />
                  }
                >
                  <MapPinnedIcon />
                </DialogClose>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};
