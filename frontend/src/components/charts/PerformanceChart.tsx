import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MetricAggregate } from '@/types/metric';
import { format } from 'date-fns';

interface PerformanceChartProps {
  data: MetricAggregate;
}

/**
 * 성능 차트 컴포넌트
 * - 메모이제이션으로 데이터 변환 최적화
 * - 반응형 컨테이너
 */
const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    return [
      { name: '평균', value: data.averageResponseTime },
      { name: '최소', value: data.minResponseTime },
      { name: '최대', value: data.maxResponseTime },
      { name: 'P95', value: data.p95ResponseTime },
      { name: 'P99', value: data.p99ResponseTime },
    ];
  }, [data]);

  return (
    <div className="chart-container">
      <h2>응답시간 분포</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: '응답시간 (ms)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(PerformanceChart);