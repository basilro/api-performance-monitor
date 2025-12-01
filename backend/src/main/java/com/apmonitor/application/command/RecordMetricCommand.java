package com.apmonitor.application.command;

import com.apmonitor.domain.model.HttpMethod;
import lombok.Builder;
import lombok.Value;

import jakarta.validation.constraints.*;

/**
 * CQRS Command: 메트릭 기록
 */
@Value
@Builder
public class RecordMetricCommand {
    
    @NotBlank(message = "엔드포인트는 필수입니다")
    String endpoint;
    
    @NotNull(message = "HTTP 메소드는 필수입니다")
    HttpMethod method;
    
    @NotNull(message = "상태 코드는 필수입니다")
    @Min(value = 100, message = "올바르지 않은 HTTP 상태 코드입니다")
    @Max(value = 599, message = "올바르지 않은 HTTP 상태 코드입니다")
    Integer statusCode;
    
    @NotNull(message = "응답 시간은 필수입니다")
    @Min(value = 0, message = "응답 시간은 음수일 수 없습니다")
    Long responseTimeMs;
    
    @Min(value = 0, message = "페이로드 크기는 음수일 수 없습니다")
    Long payloadSizeBytes;
    
    String clientIp;
}