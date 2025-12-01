package com.apmonitor.domain.model;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain Entity: API 메트릭
 * DDD 원칙에 따른 불변 도메인 객체
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
    
    public boolean isSlowResponse(long thresholdMs) {
        return responseTimeMs > thresholdMs;
    }
    
    public boolean isSuccessful() {
        return statusCode >= 200 && statusCode < 300;
    }
    
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