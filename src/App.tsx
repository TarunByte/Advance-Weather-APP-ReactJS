/**
 * Components
 */
import { ThemeProvider } from '@/components/ThemeProvider';
import { WeatherProvider } from '@/components/WeatherProvider';
import { TopAppBar } from '@/components/TopAppBar';

export const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
      </WeatherProvider>
    </ThemeProvider>
  );
};
