import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { metricApi } from '@/api/metricApi';
import { MetricAggregate } from '@/types/metric';

/**
 * 메트릭 통계 조회 훅
 * - React Query로 서버 상태 관리
 * - 자동 캐싱 및 백그라운드 갱신
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
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
    ...options,
  });
};

/**
 * 실시간 폴링 메트릭 통계 훅
 */
export const useRealtimeMetricStatistics = (
  endpoint: string,
  intervalMs: number = 5000
) => {
  return useMetricStatistics(endpoint, undefined, undefined, {
    refetchInterval: intervalMs,
  });
};