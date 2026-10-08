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
  visibility: {
    label: 'Visibility',
    color: 'var(--visibility)',
  },
} satisfies ChartConfig;

export const VisibilityChart = () => {
  // Hooks
  const { weather } = useWeather();

  // Memos
  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      visibility: item.visibility,
    }));
  }, [weather]);

  if (!chartData) return <Skeleton className='h-[360px]' />;

  return (
    <ChartContainer
      config={chartConfig}
      className='h-[360px] w-full'
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
          dataKey='visibility'
          tickLine={false}
          axisLine={false}
          tickCount={3}
          tickMargin={16}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <defs>
          <linearGradient
            id='fillVisibility'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='var(--color-visibility)'
              stopOpacity={1}
            />

            <stop
              offset='100%'
              stopColor='var(--color-visibility)'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey='visibility'
          type='natural'
          fill='url(#fillVisibility)'
          fillOpacity={0.5}
          stroke='var(--color-visibility)'
          strokeOpacity={0}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
