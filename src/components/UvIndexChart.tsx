/**
 * Hooks
 */
import { useMemo } from 'react';
import { useWeather } from '@/hooks/useWeather';

/**
 * Components
 */
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  uv: {
    label: 'UV',
    color: 'var(--uv)',
  },
} satisfies ChartConfig;

export const UvIndexChart = () => {
  // Hooks
  const { weather } = useWeather();

  // Memos
  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      uv: item.uvi,
    }));
  }, [weather]);

  if (!chartData) return <Skeleton className='h-[360px]' />;

  return (
    <ChartContainer
      config={chartConfig}
      className='h-[360px] w-full'
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        barSize={20}
        barCategoryGap={0}
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
          dataKey='uv'
          tickLine={false}
          axisLine={false}
          tickMargin={16}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey='uv'
          fill='var(--color-uv)'
          stroke='var(--color-uv)'
          radius={[100, 100, 0, 0]}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
};
