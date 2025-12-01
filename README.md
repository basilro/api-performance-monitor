# 🚀 API Performance Monitor

> Enterprise-grade API Performance Monitoring & Analytics Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-17-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

A production-ready full-stack application demonstrating advanced software engineering patterns, clean architecture principles, and performance optimization techniques. Built with **Spring Boot WebFlux** and **React**, this platform provides real-time API performance monitoring with sophisticated analytics.

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Architecture Highlights](#-architecture-highlights)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Performance Optimizations](#-performance-optimizations)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Key Features

### Business Features
- **Real-time API Monitoring** - Track response times, error rates, and throughput
- **Performance Analytics** - P95/P99 percentiles, min/max/avg calculations
- **Historical Data Analysis** - Time-series data with customizable time windows
- **Alerting System** - Automatic detection of performance degradation
- **Multi-endpoint Support** - Monitor multiple API endpoints simultaneously

### Technical Features
- **Reactive Programming** - Non-blocking I/O with Spring WebFlux and Project Reactor
- **CQRS Pattern** - Separated read and write operations for optimal scalability
- **Clean Architecture** - Domain-driven design with clear layer separation
- **Advanced Caching** - Redis-based distributed caching with intelligent invalidation
- **Virtual Scrolling** - Efficient rendering of large datasets (10,000+ rows)
- **Code Splitting** - Optimized bundle sizes with lazy loading
- **Server-Side State** - React Query for efficient data synchronization

## 🏗️ Architecture Highlights

### Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  (REST Controllers, DTOs, Request/Response Mapping)          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     Application Layer                        │
│            ┌──────────────────┬──────────────────┐           │
│            │  Command Handlers │  Query Handlers  │  (CQRS)  │
│            └──────────────────┴──────────────────┘           │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                       Domain Layer                           │
│  (Entities, Value Objects, Domain Logic, Repository Interfaces)│
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Infrastructure Layer                       │
│  (Repository Implementations, R2DBC, Redis, External Services)│
└─────────────────────────────────────────────────────────────┘
```

**Key Architectural Patterns:**
- **Clean Architecture** - Dependency inversion, domain at the center
- **CQRS** - Command Query Responsibility Segregation for scalability
- **Hexagonal Architecture** - Ports and adapters for flexibility
- **Repository Pattern** - Abstraction over data access
- **Value Objects** - Immutable domain objects with business logic

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Components │  │  Custom Hooks│  │   Services   │        │
│  │             │  │              │  │              │        │
│  │  - Dashboard│  │  - useQuery  │  │  - API Client│        │
│  │  - Charts   │  │  - useVirtual│  │  - Cache     │        │
│  │  - Tables   │  │  - useMetric │  │  - Monitoring│        │
│  └─────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  ┌─────────────────────────────────────────────────┐         │
│  │           React Query (Server State)             │         │
│  │  - Caching - Background Refetch - Invalidation   │         │
│  └─────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

**Key Frontend Patterns:**
- **Component Composition** - Reusable, single-responsibility components
- **Custom Hooks** - Business logic abstraction
- **Code Splitting** - Lazy loading for optimal bundle sizes
- **Memoization** - React.memo, useMemo, useCallback for performance
- **Virtual Scrolling** - Efficient rendering of large lists

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Spring Boot 3.2** | Application Framework | Industry standard, extensive ecosystem |
| **Spring WebFlux** | Reactive Web | Non-blocking I/O, better resource utilization |
| **R2DBC** | Reactive Database Access | Fully reactive stack from DB to API |
| **PostgreSQL** | Primary Database | ACID compliance, advanced features |
| **Redis** | Distributed Cache | Sub-millisecond latency, pub/sub support |
| **Micrometer** | Metrics Collection | Production-ready observability |
| **Lombok** | Code Generation | Reduced boilerplate, cleaner code |

### Frontend
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **React 18** | UI Framework | Virtual DOM, concurrent features |
| **TypeScript** | Type Safety | Catch errors at compile time |
| **Vite** | Build Tool | Lightning-fast HMR, optimized builds |
| **React Query** | Server State | Automatic caching, background sync |
| **React Window** | Virtualization | Efficient rendering of large lists |
| **Recharts** | Data Visualization | Composable, declarative charts |
| **Axios** | HTTP Client | Interceptors, request/response transforms |

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Prometheus** - Metrics aggregation
- **Grafana** - Metrics visualization

## 🚀 Getting Started

### Prerequisites

```bash
# Required
- Java 17 or higher
- Node.js 18 or higher
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

# Optional (for local development)
- Gradle 8.5+
- npm or yarn
```

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/basilro/api-performance-monitor.git
cd api-performance-monitor

# Start all services
docker-compose up -d

# Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
```

### Local Development

#### Backend Setup

```bash
cd backend

# Set environment variables
export DB_PASSWORD=your_password

# Run with Gradle
./gradlew bootRun

# Or build and run JAR
./gradlew build
java -jar build/libs/api-performance-monitor-1.0.0.jar
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Database Setup

```sql
-- Create database
CREATE DATABASE apmonitor;

-- Create user
CREATE USER apmonitor WITH PASSWORD 'changeme';
GRANT ALL PRIVILEGES ON DATABASE apmonitor TO apmonitor;

-- Run migrations (auto-handled by application)
```

## 📁 Project Structure

```
api-performance-monitor/
├── backend/
│   ├── src/main/java/com/apmonitor/
│   │   ├── domain/                    # Domain layer (entities, value objects)
│   │   │   ├── model/                 # Domain models
│   │   │   │   ├── ApiMetric.java     # Core domain entity
│   │   │   │   └── MetricAggregate.java
│   │   │   └── repository/            # Repository interfaces
│   │   ├── application/               # Application layer (use cases)
│   │   │   ├── command/               # CQRS Commands
│   │   │   │   ├── RecordMetricCommand.java
│   │   │   │   └── RecordMetricCommandHandler.java
│   │   │   └── query/                 # CQRS Queries
│   │   │       ├── GetMetricStatisticsQuery.java
│   │   │       └── GetMetricStatisticsQueryHandler.java
│   │   ├── infrastructure/            # Infrastructure layer
│   │   │   ├── persistence/           # Database implementations
│   │   │   └── cache/                 # Redis configurations
│   │   └── presentation/              # Presentation layer
│   │       └── controller/            # REST controllers
│   └── src/main/resources/
│       └── application.yml            # Application configuration
├── frontend/
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── MetricDashboard.tsx   # Main dashboard
│   │   │   ├── MetricTable.tsx       # Virtual scrolling table
│   │   │   └── charts/               # Chart components
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useMetricStatistics.ts
│   │   │   └── useVirtualization.ts
│   │   ├── api/                       # API client layer
│   │   │   ├── client.ts             # Axios configuration
│   │   │   └── metricApi.ts          # API methods
│   │   ├── types/                     # TypeScript types
│   │   └── App.tsx                    # Root component
│   ├── vite.config.ts                 # Vite configuration
│   └── package.json
├── docker-compose.yml                 # Multi-container setup
└── README.md
```

## ⚡ Performance Optimizations

### Backend Optimizations

1. **Reactive Programming**
   ```java
   // Non-blocking I/O throughout the stack
   public Mono<UUID> handle(RecordMetricCommand command) {
       return metricRepository.save(metric)
           .map(ApiMetric::getId);
   }
   ```

2. **Distributed Caching**
   ```java
   @Cacheable(value = "metricStats", key = "#query.endpoint")
   public Mono<MetricAggregate> handle(GetMetricStatisticsQuery query) {
       // Cached results served from Redis
   }
   ```

3. **Database Optimization**
   - R2DBC for reactive database access
   - Connection pooling
   - Query optimization with indexes

4. **Metrics & Monitoring**
   ```yaml
   # Prometheus metrics endpoint
   management:
     endpoints:
       web:
         exposure:
           include: metrics,prometheus
   ```

### Frontend Optimizations

1. **Code Splitting**
   ```typescript
   // Lazy load heavy components
   const PerformanceChart = lazy(() => import('./charts/PerformanceChart'));
   ```

2. **Bundle Optimization**
   ```typescript
   // Vite configuration for optimal chunking
   manualChunks: {
     'react-vendor': ['react', 'react-dom'],
     'query-vendor': ['@tanstack/react-query'],
     'chart-vendor': ['recharts'],
   }
   ```

3. **Virtual Scrolling**
   ```typescript
   // Render only visible rows (react-window)
   <FixedSizeList
     height={600}
     itemCount={10000}
     itemSize={50}
   >
     {Row}
   </FixedSizeList>
   ```

4. **Memoization**
   ```typescript
   // Prevent unnecessary re-renders
   const MetricCard = React.memo(({ title, value }) => (
     <div>{title}: {value}</div>
   ));
   ```

5. **Compression**
   - Gzip & Brotli compression
   - Tree shaking
   - Minification

## 📚 API Documentation

### Endpoints

#### Record Metric
```http
POST /api/v1/metrics
Content-Type: application/json

{
  "endpoint": "/api/users",
  "method": "GET",
  "statusCode": 200,
  "responseTimeMs": 145,
  "payloadSizeBytes": 2048,
  "clientIp": "192.168.1.1"
}

Response: "uuid-string"
```

#### Get Statistics
```http
GET /api/v1/metrics/statistics?endpoint=/api/users&startTimeEpoch=1234567890&endTimeEpoch=1234567999

Response:
{
  "endpoint": "/api/users",
  "method": "GET",
  "windowStart": "2024-01-01T00:00:00Z",
  "windowEnd": "2024-01-01T23:59:59Z",
  "totalRequests": 1000,
  "successfulRequests": 950,
  "failedRequests": 50,
  "averageResponseTime": 234.5,
  "minResponseTime": 45,
  "maxResponseTime": 1234,
  "p95ResponseTime": 567.8,
  "p99ResponseTime": 890.2,
  "totalPayloadSize": 2048000
}
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
./gradlew test

# Run with coverage
./gradlew test jacocoTestReport

# Run integration tests
./gradlew integrationTest
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Docker Deployment

```bash
# Build images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/api-monitor-backend
```

### Environment Variables

```bash
# Backend
DB_PASSWORD=your_secure_password
REDIS_HOST=redis.example.com
REDIS_PASSWORD=redis_password
SPRING_PROFILES_ACTIVE=production

# Frontend
VITE_API_BASE_URL=https://api.example.com/api/v1
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**basilro** - Senior Full-Stack Engineer

- 10+ years of experience in enterprise software development
- Specialized in Java, JavaScript, React, and distributed systems
- Passionate about clean architecture and performance optimization

## 🙏 Acknowledgments

- Inspired by production monitoring systems at scale
- Built with modern best practices and enterprise patterns
- Designed for demonstrating senior-level software engineering skills

---

**⭐ If you found this project helpful, please consider giving it a star!**

For questions or feedback, please open an issue or reach out via GitHub.
