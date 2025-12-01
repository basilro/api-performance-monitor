package com.apmonitor.application.query;

import com.apmonitor.domain.model.MetricAggregate;
import com.apmonitor.domain.repository.MetricRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

/**
 * CQRS Query Handler: 메트릭 통계 조회 처리
 * 성능 최적화를 위한 캐싱 적용
 */
@Service
@RequiredArgsConstructor
public class GetMetricStatisticsQueryHandler {
    
    private final MetricRepository metricRepository;
    
    @Cacheable(value = "metricStats", key = "#query.endpoint + #query.startTime + #query.endTime")
    public Mono<MetricAggregate> handle(GetMetricStatisticsQuery query) {
        return metricRepository.findByEndpointAndTimeRange(
                query.getEndpoint(),
                query.getStartTime(),
                query.getEndTime()
            )
            .collectList()
            .map(metrics -> {
                long total = metrics.size();
                long successful = metrics.stream()
                    .filter(m -> m.isSuccessful())
                    .count();
                
                double avgResponseTime = metrics.stream()
                    .mapToLong(m -> m.getResponseTimeMs())
                    .average()
                    .orElse(0.0);
                
                return MetricAggregate.builder()
                    .endpoint(query.getEndpoint())
                    .method(query.getMethod())
                    .windowStart(query.getStartTime())
                    .windowEnd(query.getEndTime())
                    .totalRequests(total)
                    .successfulRequests(successful)
                    .failedRequests(total - successful)
                    .averageResponseTime(avgResponseTime)
                    .build();
            });
    }
}