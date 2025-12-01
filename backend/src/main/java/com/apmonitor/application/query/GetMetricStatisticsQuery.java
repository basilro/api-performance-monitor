package com.apmonitor.application.query;

import com.apmonitor.domain.model.HttpMethod;
import lombok.Builder;
import lombok.Value;

import java.time.Instant;

/**
 * CQRS Query: 메트릭 통계 조회
 */
@Value
@Builder
public class GetMetricStatisticsQuery {
    String endpoint;
    HttpMethod method;
    Instant startTime;
    Instant endTime;
}