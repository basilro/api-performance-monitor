package com.apmonitor.domain.model;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;

/**
 * Aggregate Root: 메트릭 통계 집계
 * 시간 윈도우 기반 분석 데이터
 */
@Value
@Builder
public class MetricAggregate {
    String endpoint;
    HttpMethod method;
    Instant windowStart;
    Instant windowEnd;
    
    Long totalRequests;
    Long successfulRequests;
    Long failedRequests;
    
    Double averageResponseTime;
    Long minResponseTime;
    Long maxResponseTime;
    Double p95ResponseTime;
    Double p99ResponseTime;
    
    Long totalPayloadSize;
    
    public double getSuccessRate() {
        if (totalRequests == 0) return 0.0;
        return (successfulRequests * 100.0) / totalRequests;
    }
    
    public double getErrorRate() {
        return 100.0 - getSuccessRate();
    }
    
    public boolean hasReliabilityIssue() {
        return getErrorRate() > 5.0;
    }
    
    public boolean hasPerformanceIssue() {
        return averageResponseTime > 1000;
    }
}