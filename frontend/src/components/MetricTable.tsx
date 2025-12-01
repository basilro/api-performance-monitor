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
 * 가상 스크롤링 테이블 컴포넌트
 * react-window로 대용량 데이터 효율적 렌더링
 */
const MetricTable: React.FC<MetricTableProps> = ({ endpoint }) => {
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
      <h2>요청 이력</h2>
      <div className="table-header">
        <div className="table-cell">시간</div>
        <div className="table-cell">메소드</div>
        <div className="table-cell">상태</div>
        <div className="table-cell">응답시간</div>
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