/**
 * Hooks
 */
import { useMemo } from 'react';
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Types
 */

import type { ChartConfig } from '@/components/ui/chart';

/**
 * Chart config
 */
const chartConfig = {
  wind_speed: {
    label: 'Wind speed',
    color: 'var(--wind-speed)',
  },
  wind_gust: {
    label: 'Wind gust',
    color: 'var(--wind-gust)',
  },
} satisfies ChartConfig;

export const WindChart = () => {
  // Hooks
  const { weather } = useWeather();

  // Memos
  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      wind_speed: item.wind_speed,
      wind_gust: item.wind_gust,
      wind_deg: item.wind_deg,
    }));
  }, [weather]);

  if (!chartData) return <Skeleton className='h-[360px]' />;

  return (
    <ChartContainer
      config={chartConfig}
      className='h=[360px] w-full'
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid strokeDasharray='4' />

        <XAxis
          dataKey='hour'
          tickLine={false}
          axisLine={false}
          tickCount={12}
          tickMargin={16}
        />

        <YAxis
          dataKey='wind_speed'
          tickLine={false}
          axisLine={false}
          tickCount={5}
          tickMargin={16}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <defs>
          <linearGradient
            id='fillWindSpeed'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='var(--color-wind_speed)'
              stopOpacity={1}
            />

            <stop
              offset='100%'
              stopColor='var(--color-wind_speed)'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey='wind_speed'
          type='natural'
          fill='url(#fillWindSpeed)'
          fillOpacity={0.5}
          stroke='var(--color-wind_speed)'
          strokeOpacity={0}
        />

        <Area
          dataKey='wind_gust'
          type='natural'
          fill='var(--color-wind_gust)'
          fillOpacity={0}
          stroke='var(--color-wind_gust)'
          strokeWidth={2}
          activeDot={false}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
