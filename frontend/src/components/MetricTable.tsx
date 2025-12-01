import React from 'react';
import { FixedSizeList as List } from 'react-window';

interface MetricTableProps {
  endpoint: string;
}

interface MetricRow {
  timestamp: string;
  statusCode: number;
  responseTime: number;
  method: string;
}

/**
 * Virtual scrolling table for large datasets
 * Uses react-window for efficient rendering of thousands of rows
 */
const MetricTable: React.FC<MetricTableProps> = ({ endpoint }) => {
  // In real app, this would come from API with pagination
  const mockData: MetricRow[] = Array.from({ length: 10000 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    statusCode: Math.random() > 0.1 ? 200 : 500,
    responseTime: Math.floor(Math.random() * 1000),
    method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
  }));

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = mockData[index];
    return (
      <div style={style} className="table-row">
        <div className="table-cell">{item.timestamp}</div>
        <div className="table-cell">{item.method}</div>
        <div className="table-cell">
          <span className={`status-${item.statusCode}`}>{item.statusCode}</span>
        </div>
        <div className="table-cell">{item.responseTime}ms</div>
      </div>
    );
  };

  return (
    <div className="metric-table">
      <h2>Request History</h2>
      <div className="table-header">
        <div className="table-cell">Timestamp</div>
        <div className="table-cell">Method</div>
        <div className="table-cell">Status</div>
        <div className="table-cell">Response Time</div>
      </div>
      <List
        height={600}
        itemCount={mockData.length}
        itemSize={50}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default React.memo(MetricTable);