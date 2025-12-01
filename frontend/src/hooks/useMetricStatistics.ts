import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { metricApi } from '@/api/metricApi';
import { MetricAggregate } from '@/types/metric';

/**
 * Custom hook for fetching metric statistics
 * Demonstrates:
 * - React Query for server state management
 * - Automatic caching and background refetching
 * - Type-safe API calls
 */
export const useMetricStatistics = (
  endpoint: string,
  startTime?: number,
  endTime?: number,
  options?: Omit<UseQueryOptions<MetricAggregate>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<MetricAggregate>({
    queryKey: ['metricStatistics', endpoint, startTime, endTime],
    queryFn: () => metricApi.getStatistics(endpoint, startTime, endTime),
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Retry failed requests
    retry: 2,
    // Enable background refetching
    refetchOnWindowFocus: true,
    ...options,
  });
};

/**
 * Custom hook with polling for real-time updates
 */
export const useRealtimeMetricStatistics = (
  endpoint: string,
  intervalMs: number = 5000
) => {
  return useMetricStatistics(endpoint, undefined, undefined, {
    refetchInterval: intervalMs,
  });
};