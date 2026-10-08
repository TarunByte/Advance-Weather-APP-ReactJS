/**
 * Hooks
 */
import { useState } from 'react';

/**
 * Components
 */
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { OverviewChart } from '@/components/OverviewChart';
import { PrecipitationChart } from '@/components/PrecipitationChart';
import { WindChart } from '@/components/WindChart';
import { HumidityChart } from '@/components/HumidityChart';
import { CloudCoverChart } from '@/components/CloudCover';
import { PressureChart } from '@/components/PressureChart';
import { UvIndexChart } from '@/components/UvIndexChart';
import { VisibilityChart } from '@/components/VisibilityChart';

/**
 * Types
 */
type Tab =
  | 'overview'
  | 'precipitation'
  | 'wind'
  | 'humidity'
  | 'cloudCover'
  | 'pressure'
  | 'uv'
  | 'visibility'
  | 'feelsLike';

/**
 * Constants
 */
const TABS_LIST = [
  {
    title: 'Overview',
    value: 'overview',
  },
  {
    title: 'Precipitation',
    value: 'precipitation',
  },
  {
    title: 'Wind',
    value: 'wind',
  },
  {
    title: 'Humidity',
    value: 'humidity',
  },
  {
    title: 'Cloud cover',
    value: 'cloudCover',
  },
  {
    title: 'Pressure',
    value: 'pressure',
  },
  {
    title: 'UV',
    value: 'uv',
  },
  {
    title: 'Visibility',
    value: 'visibility',
  },
  {
    title: 'Feels like',
    value: 'feelsLike',
  },
];

export const HourlyWeatherTabs = () => {
  // States
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className='w-full mt-6'>
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as Tab)}
        className='w-full flex flex-col gap-4'
      >
        {/* Header */}
        <div className='flex flex-col gap-3'>
          <h2 className='text-lg font-semibold'>Hourly</h2>

          <div className='w-full overflow-x-auto scrollbar-none'>
            <TabsList className='inline-flex w-max gap-2 bg-background p-1'>
              {TABS_LIST.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className='shrink-0 rounded-full border-none bg-secondary h-9 px-4 data-active:bg-primary! data-active:text-primary-foreground'
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Overview tab */}
        <TabsContent value='overview'>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>

            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Precipitation tab */}
        <TabsContent value='precipitation'>
          <Card>
            <CardHeader>
              <CardTitle>Precipitation</CardTitle>
            </CardHeader>

            <CardContent>
              <PrecipitationChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wind tab */}
        <TabsContent value='wind'>
          <Card>
            <CardHeader>
              <CardTitle>Wind</CardTitle>
            </CardHeader>

            <CardContent>
              <WindChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Humidity tab */}
        <TabsContent value='humidity'>
          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>

            <CardContent>
              <HumidityChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cloud cover tab */}
        <TabsContent value='cloudCover'>
          <Card>
            <CardHeader>
              <CardTitle>Cloud cover</CardTitle>
            </CardHeader>

            <CardContent>
              <CloudCoverChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pressure tab */}
        <TabsContent value='pressure'>
          <Card>
            <CardHeader>
              <CardTitle>Pressure</CardTitle>
            </CardHeader>

            <CardContent>
              <PressureChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Uvi Index tab */}
        <TabsContent value='uv'>
          <Card>
            <CardHeader>
              <CardTitle>UV</CardTitle>
            </CardHeader>

            <CardContent>
              <UvIndexChart />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visibility tab */}
        <TabsContent value='visibility'>
          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
            </CardHeader>

            <CardContent>
              <VisibilityChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
