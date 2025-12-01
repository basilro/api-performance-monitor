import React, { useMemo, lazy, Suspense } from 'react';
import { useMetricStatistics } from '@/hooks/useMetricStatistics';
import { MetricAggregate } from '@/types/metric';

// Code splitting: Lazy load heavy chart components
const PerformanceChart = lazy(() => import('./charts/PerformanceChart'));
const MetricTable = lazy(() => import('./MetricTable'));

interface MetricDashboardProps {
  endpoint: string;
}

/**
 * Main dashboard component with performance optimizations:
 * - Memoization to prevent unnecessary re-renders
 * - Code splitting for charts
 * - Conditional rendering
 */
const MetricDashboard: React.FC<MetricDashboardProps> = ({ endpoint }) => {
  const { data, isLoading, error } = useMetricStatistics(endpoint);

  // Memoize computed values to avoid recalculation
  const performanceMetrics = useMemo(() => {
    if (!data) return null;

    return {
      successRate: ((data.successfulRequests / data.totalRequests) * 100).toFixed(2),
      avgResponseTime: data.averageResponseTime.toFixed(2),
      totalRequests: data.totalRequests.toLocaleString(),
      p95: data.p95ResponseTime?.toFixed(2) || 'N/A',
    };
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error as Error} />;
  }

  if (!data || !performanceMetrics) {
    return <EmptyState />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>API Performance Monitor</h1>
        <p className="endpoint-title">{endpoint}</p>
      </header>

      <div className="metrics-grid">
        <MetricCard
          title="Success Rate"
          value={`${performanceMetrics.successRate}%`}
          trend={parseFloat(performanceMetrics.successRate) >= 95 ? 'up' : 'down'}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${performanceMetrics.avgResponseTime}ms`}
          trend={parseFloat(performanceMetrics.avgResponseTime) < 500 ? 'up' : 'down'}
        />
        <MetricCard
          title="Total Requests"
          value={performanceMetrics.totalRequests}
        />
        <MetricCard
          title="P95 Response Time"
          value={`${performanceMetrics.p95}ms`}
        />
      </div>

      <Suspense fallback={<ChartSkeleton />}>
        <PerformanceChart data={data} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <MetricTable endpoint={endpoint} />
      </Suspense>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(MetricDashboard);

// Lightweight UI components
const MetricCard: React.FC<{
  title: string;
  value: string;
  trend?: 'up' | 'down';
}> = React.memo(({ title, value, trend }) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <p className="metric-value">
      {value}
      {trend && <span className={`trend-${trend}`}>●</span>}
    </p>
  </div>
));

const LoadingSpinner = () => <div className="spinner">Loading...</div>;
const ErrorDisplay = ({ error }: { error: Error }) => (
  <div className="error">Error: {error.message}</div>
);
const EmptyState = () => <div className="empty">No data available</div>;
const ChartSkeleton = () => <div className="skeleton chart-skeleton" />;
const TableSkeleton = () => <div className="skeleton table-skeleton" />;