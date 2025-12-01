import React, { useMemo, lazy, Suspense } from 'react';
import { useMetricStatistics } from '@/hooks/useMetricStatistics';
import { MetricAggregate } from '@/types/metric';

const PerformanceChart = lazy(() => import('./charts/PerformanceChart'));
const MetricTable = lazy(() => import('./MetricTable'));

interface MetricDashboardProps {
  endpoint: string;
}

/**
 * 메인 대시보드 컴포넌트
 * - 메모이제이션으로 불필요한 리렌더링 방지
 * - 코드 스플리팅으로 차트 지연 로딩
 */
const MetricDashboard: React.FC<MetricDashboardProps> = ({ endpoint }) => {
  const { data, isLoading, error } = useMetricStatistics(endpoint);

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
        <h1>API 성능 모니터</h1>
        <p className="endpoint-title">{endpoint}</p>
      </header>

      <div className="metrics-grid">
        <MetricCard
          title="성공률"
          value={`${performanceMetrics.successRate}%`}
          trend={parseFloat(performanceMetrics.successRate) >= 95 ? 'up' : 'down'}
        />
        <MetricCard
          title="평균 응답시간"
          value={`${performanceMetrics.avgResponseTime}ms`}
          trend={parseFloat(performanceMetrics.avgResponseTime) < 500 ? 'up' : 'down'}
        />
        <MetricCard
          title="전체 요청"
          value={performanceMetrics.totalRequests}
        />
        <MetricCard
          title="P95 응답시간"
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

export default React.memo(MetricDashboard);

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

const LoadingSpinner = () => <div className="spinner">로딩중...</div>;
const ErrorDisplay = ({ error }: { error: Error }) => (
  <div className="error">에러: {error.message}</div>
);
const EmptyState = () => <div className="empty">데이터가 없습니다</div>;
const ChartSkeleton = () => <div className="skeleton chart-skeleton" />;
const TableSkeleton = () => <div className="skeleton table-skeleton" />;