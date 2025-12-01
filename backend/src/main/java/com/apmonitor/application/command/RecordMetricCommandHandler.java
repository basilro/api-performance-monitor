package com.apmonitor.application.command;

import com.apmonitor.domain.model.ApiMetric;
import com.apmonitor.domain.repository.MetricRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.UUID;

/**
 * CQRS Command Handler: Handles metric recording
 * Separates write operations from read operations for better scalability
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RecordMetricCommandHandler {
    
    private final MetricRepository metricRepository;
    
    public Mono<UUID> handle(RecordMetricCommand command) {
        log.debug("Recording metric for endpoint: {}", command.getEndpoint());
        
        ApiMetric metric = ApiMetric.builder()
            .id(UUID.randomUUID())
            .endpoint(command.getEndpoint())
            .method(command.getMethod())
            .statusCode(command.getStatusCode())
            .responseTimeMs(command.getResponseTimeMs())
            .payloadSizeBytes(command.getPayloadSizeBytes())
            .clientIp(command.getClientIp())
            .timestamp(Instant.now())
            .build();
        
        return metricRepository.save(metric)
            .doOnSuccess(saved -> {
                if (saved.isSlowResponse(1000)) {
                    log.warn("Slow response detected: {} took {}ms", 
                        saved.getEndpoint(), saved.getResponseTimeMs());
                }
            })
            .map(ApiMetric::getId);
    }
}