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
 * Performance chart with optimizations:
 * - Memoized data transformation
 * - Responsive container
 * - Efficient re-rendering
 */
const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // Transform data for chart - memoized to prevent recalculation
  const chartData = useMemo(() => {
    return [
      {
        name: 'Average',
        value: data.averageResponseTime,
      },
      {
        name: 'Min',
        value: data.minResponseTime,
      },
      {
        name: 'Max',
        value: data.maxResponseTime,
      },
      {
        name: 'P95',
        value: data.p95ResponseTime,
      },
      {
        name: 'P99',
        value: data.p99ResponseTime,
      },
    ];
  }, [data]);

  return (
    <div className="chart-container">
      <h2>Response Time Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }} />
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