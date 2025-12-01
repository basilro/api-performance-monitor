package com.apmonitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ApiMonitorApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiMonitorApplication.class, args);
    }
}