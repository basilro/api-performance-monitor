import apiClient from './client';
import { ApiMetric, MetricAggregate } from '@/types/metric';

export const metricApi = {
  /**
   * Fetch metric statistics for a specific endpoint
   */
  getStatistics: async (
    endpoint: string,
    startTime?: number,
    endTime?: number
  ): Promise<MetricAggregate> => {
    const params: Record<string, any> = { endpoint };
    if (startTime) params.startTimeEpoch = startTime;
    if (endTime) params.endTimeEpoch = endTime;

    const response = await apiClient.get<MetricAggregate>('/metrics/statistics', {
      params,
    });
    return response.data;
  },

  /**
   * Record a new metric
   */
  recordMetric: async (metric: Omit<ApiMetric, 'id' | 'timestamp'>): Promise<string> => {
    const response = await apiClient.post<string>('/metrics', metric);
    return response.data;
  },
};