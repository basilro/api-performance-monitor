export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export enum PerformanceGrade {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  CRITICAL = 'CRITICAL',
}

export interface ApiMetric {
  id: string;
  endpoint: string;
  method: HttpMethod;
  statusCode: number;
  responseTimeMs: number;
  payloadSizeBytes: number;
  timestamp: string;
  clientIp: string;
}

export interface MetricAggregate {
  endpoint: string;
  method: HttpMethod;
  windowStart: string;
  windowEnd: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  totalPayloadSize: number;
}

export interface TimeSeriesData {
  timestamp: number;
  responseTime: number;
  requestCount: number;
}