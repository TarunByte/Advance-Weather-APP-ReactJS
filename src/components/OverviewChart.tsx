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
  temp: {
    label: 'Temperature',
    color: 'var(--chart-1)',
  },
  feels: {
    label: 'Feels like',
    color: 'var(--muted-foreground)',
  },
} satisfies ChartConfig;

export const OverviewChart = () => {
  // Hooks
  const { weather } = useWeather();

  // Memos
  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      temp: item.temp.toFixed(),
      feels: item.feels_like.toFixed(),
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
          dataKey='temp'
          tickLine={false}
          axisLine={false}
          tickCount={5}
          tickMargin={16}
          tickFormatter={(value) => `${value}°`}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <defs>
          <linearGradient
            id='fillTemp'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='var(--temp-high)'
              stopOpacity={1}
            />

            <stop
              offset='50%'
              stopColor='var(--temp-mid)'
              stopOpacity={0.5}
            />

            <stop
              offset='100%'
              stopColor='var(--temp-low)'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey='temp'
          type='natural'
          fill='url(#fillTemp)'
          fillOpacity={0.5}
          stroke='var(--color-temp)'
          strokeOpacity={0}
        />

        <Area
          dataKey='feels'
          type='natural'
          fillOpacity={0}
          stroke='var(--color-feels)'
          strokeWidth={2}
          activeDot={false}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
