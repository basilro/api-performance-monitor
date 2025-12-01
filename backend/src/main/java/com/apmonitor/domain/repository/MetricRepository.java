package com.apmonitor.domain.repository;

import com.apmonitor.domain.model.ApiMetric;
import com.apmonitor.domain.model.HttpMethod;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain repository interface - part of Domain layer
 * Implementation details are in Infrastructure layer (Hexagonal Architecture)
 */
public interface MetricRepository {
    
    Mono<ApiMetric> save(ApiMetric metric);
    
    Mono<ApiMetric> findById(UUID id);
    
    Flux<ApiMetric> findByEndpointAndTimeRange(
        String endpoint, 
        Instant start, 
        Instant end
    );
    
    Flux<ApiMetric> findByTimeRange(Instant start, Instant end);
    
    Flux<ApiMetric> findSlowRequests(long thresholdMs, int limit);
    
    Mono<Long> countByEndpointAndMethod(
        String endpoint, 
        HttpMethod method, 
        Instant start, 
        Instant end
    );
    
    Mono<Double> calculateAverageResponseTime(
        String endpoint,
        Instant start,
        Instant end
    );
}