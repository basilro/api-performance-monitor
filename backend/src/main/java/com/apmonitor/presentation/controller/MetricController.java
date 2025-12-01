package com.apmonitor.presentation.controller;

import com.apmonitor.application.command.RecordMetricCommand;
import com.apmonitor.application.command.RecordMetricCommandHandler;
import com.apmonitor.application.query.GetMetricStatisticsQuery;
import com.apmonitor.application.query.GetMetricStatisticsQueryHandler;
import com.apmonitor.domain.model.MetricAggregate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;
import java.time.Instant;
import java.util.UUID;

/**
 * REST Controller for API Metrics
 * Follows REST best practices and reactive programming patterns
 */
@RestController
@RequestMapping("/api/v1/metrics")
@RequiredArgsConstructor
public class MetricController {
    
    private final RecordMetricCommandHandler recordMetricHandler;
    private final GetMetricStatisticsQueryHandler getStatisticsHandler;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<UUID> recordMetric(@Valid @RequestBody RecordMetricCommand command) {
        return recordMetricHandler.handle(command);
    }
    
    @GetMapping("/statistics")
    public Mono<MetricAggregate> getStatistics(
        @RequestParam String endpoint,
        @RequestParam(required = false) Long startTimeEpoch,
        @RequestParam(required = false) Long endTimeEpoch
    ) {
        Instant start = startTimeEpoch != null 
            ? Instant.ofEpochMilli(startTimeEpoch) 
            : Instant.now().minusSeconds(3600);
        Instant end = endTimeEpoch != null 
            ? Instant.ofEpochMilli(endTimeEpoch) 
            : Instant.now();
        
        GetMetricStatisticsQuery query = GetMetricStatisticsQuery.builder()
            .endpoint(endpoint)
            .startTime(start)
            .endTime(end)
            .build();
        
        return getStatisticsHandler.handle(query);
    }
}