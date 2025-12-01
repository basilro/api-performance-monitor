package com.apmonitor.domain.model;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;

/**
 * Aggregate root for metric statistics
 * Represents computed analytics over a time window
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
    
    /**
     * Calculate success rate percentage
     */
    public double getSuccessRate() {
        if (totalRequests == 0) return 0.0;
        return (successfulRequests * 100.0) / totalRequests;
    }
    
    /**
     * Calculate error rate percentage
     */
    public double getErrorRate() {
        return 100.0 - getSuccessRate();
    }
    
    /**
     * Determine if this endpoint has reliability issues
     */
    public boolean hasReliabilityIssue() {
        return getErrorRate() > 5.0; // More than 5% error rate
    }
    
    /**
     * Determine if this endpoint has performance issues
     */
    public boolean hasPerformanceIssue() {
        return averageResponseTime > 1000; // Average > 1 second
    }
}