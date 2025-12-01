package com.apmonitor.application.command;

import com.apmonitor.domain.model.HttpMethod;
import lombok.Builder;
import lombok.Value;

import jakarta.validation.constraints.*;

/**
 * CQRS Command: Record new API metric
 * Immutable command object with validation
 */
@Value
@Builder
public class RecordMetricCommand {
    
    @NotBlank(message = "Endpoint must not be blank")
    String endpoint;
    
    @NotNull(message = "HTTP method must not be null")
    HttpMethod method;
    
    @NotNull(message = "Status code must not be null")
    @Min(value = 100, message = "Invalid HTTP status code")
    @Max(value = 599, message = "Invalid HTTP status code")
    Integer statusCode;
    
    @NotNull(message = "Response time must not be null")
    @Min(value = 0, message = "Response time cannot be negative")
    Long responseTimeMs;
    
    @Min(value = 0, message = "Payload size cannot be negative")
    Long payloadSizeBytes;
    
    String clientIp;
}