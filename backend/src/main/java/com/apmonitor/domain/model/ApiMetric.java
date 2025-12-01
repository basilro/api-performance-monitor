package com.apmonitor.domain.model;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain Entity: API Metric
 * Immutable value object representing a single API call measurement
 * Following DDD principles - rich domain model with business logic
 */
@Value
@Builder
public class ApiMetric {
    UUID id;
    String endpoint;
    HttpMethod method;
    Integer statusCode;
    Long responseTimeMs;
    Long payloadSizeBytes;
    Instant timestamp;
    String clientIp;
    
    /**
     * Business logic: Determine if this API call has performance issues
     * @param thresholdMs Performance threshold in milliseconds
     * @return true if response time exceeds threshold
     */
    public boolean isSlowResponse(long thresholdMs) {
        return responseTimeMs > thresholdMs;
    }
    
    /**
     * Business logic: Check if request was successful
     */
    public boolean isSuccessful() {
        return statusCode >= 200 && statusCode < 300;
    }
    
    /**
     * Calculate performance grade based on response time
     */
    public PerformanceGrade calculateGrade() {
        if (responseTimeMs < 100) return PerformanceGrade.EXCELLENT;
        if (responseTimeMs < 500) return PerformanceGrade.GOOD;
        if (responseTimeMs < 1000) return PerformanceGrade.FAIR;
        if (responseTimeMs < 3000) return PerformanceGrade.POOR;
        return PerformanceGrade.CRITICAL;
    }
    
    public enum PerformanceGrade {
        EXCELLENT, GOOD, FAIR, POOR, CRITICAL
    }
}