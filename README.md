# 🚀 API 성능 모니터

> 엔터프라이즈급 API 성능 모니터링 & 분석 플랫폼

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-17-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

**Spring Boot WebFlux**와 **React**로 구축된 실시간 API 성능 모니터링 플랫폼입니다. 
고급 소프트웨어 엔지니어링 패턴, 클린 아키텍처 원칙, 성능 최적화 기법을 실전에 적용한 프로덕션 레디 풀스택 애플리케이션입니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [아키텍처 하이라이트](#️-아키텍처-하이라이트)
- [기술 스택](#️-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [성능 최적화](#-성능-최적화)
- [API 문서](#-api-문서)
- [개발 가이드](#-개발-가이드)
- [배포](#-배포)

## ✨ 주요 기능

### 비즈니스 기능
- **실시간 API 모니터링** - 응답 시간, 에러율, 처리량 추적
- **성능 분석** - P95/P99 백분위수, 최소/최대/평균 계산
- **히스토리 데이터 분석** - 커스터마이징 가능한 시간 윈도우 기반 시계열 데이터
- **알림 시스템** - 성능 저하 자동 감지
- **멀티 엔드포인트 지원** - 여러 API 엔드포인트 동시 모니터링

### 기술적 특징
- **리액티브 프로그래밍** - Spring WebFlux와 Project Reactor를 활용한 논블로킹 I/O
- **CQRS 패턴** - 읽기/쓰기 작업 분리로 최적의 확장성 확보
- **클린 아키텍처** - 명확한 레이어 분리와 도메인 주도 설계
- **고급 캐싱** - Redis 기반 분산 캐싱과 지능형 무효화 전략
- **가상 스크롤링** - 대용량 데이터셋(10,000+ 행) 효율적 렌더링
- **코드 스플리팅** - 지연 로딩을 통한 번들 크기 최적화
- **서버 상태 관리** - React Query를 활용한 효율적인 데이터 동기화

## 🏗️ 아키텍처 하이라이트

### 백엔드 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│         (REST Controllers, DTOs, 요청/응답 매핑)              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Application Layer                         │
│            ┌──────────────────┬──────────────────┐           │
│            │  Command Handlers │  Query Handlers  │  (CQRS)  │
│            └──────────────────┴──────────────────┘           │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      Domain Layer                            │
│   (엔티티, 값 객체, 도메인 로직, 레포지토리 인터페이스)          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Infrastructure Layer                        │
│      (레포지토리 구현체, R2DBC, Redis, 외부 서비스)            │
└─────────────────────────────────────────────────────────────┘
```

**핵심 아키텍처 패턴:**
- **클린 아키텍처** - 의존성 역전, 도메인 중심 설계
- **CQRS** - 커맨드-쿼리 책임 분리로 확장성 확보
- **헥사고날 아키텍처** - 포트와 어댑터 패턴으로 유연성 확보
- **레포지토리 패턴** - 데이터 접근 추상화
- **값 객체** - 비즈니스 로직을 포함한 불변 도메인 객체

### 프론트엔드 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                   React Application                          │
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
│  │        React Query (서버 상태 관리)                │         │
│  │  - 캐싱 - 백그라운드 갱신 - 무효화                  │         │
│  └─────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

**핵심 프론트엔드 패턴:**
- **컴포넌트 합성** - 재사용 가능한 단일 책임 컴포넌트
- **커스텀 훅** - 비즈니스 로직 추상화
- **코드 스플리팅** - 지연 로딩으로 번들 크기 최적화
- **메모이제이션** - React.memo, useMemo, useCallback을 활용한 성능 최적화
- **가상 스크롤링** - 대용량 리스트의 효율적 렌더링

## 🛠️ 기술 스택

### 백엔드
| 기술 | 용도 | 선택 이유 |
|------|------|-----------|
| **Spring Boot 3.2** | 애플리케이션 프레임워크 | 업계 표준, 풍부한 생태계 |
| **Spring WebFlux** | 리액티브 웹 | 논블로킹 I/O, 리소스 효율성 향상 |
| **R2DBC** | 리액티브 데이터베이스 액세스 | DB부터 API까지 완전한 리액티브 스택 |
| **PostgreSQL** | 주 데이터베이스 | ACID 보장, 고급 기능 지원 |
| **Redis** | 분산 캐시 | 밀리초 이하 레이턴시, pub/sub 지원 |
| **Micrometer** | 메트릭 수집 | 프로덕션 레디 관찰성 |
| **Lombok** | 코드 생성 | 보일러플레이트 감소, 깔끔한 코드 |

### 프론트엔드
| 기술 | 용도 | 선택 이유 |
|------|------|-----------|
| **React 18** | UI 프레임워크 | Virtual DOM, 동시성 기능 |
| **TypeScript** | 타입 안정성 | 컴파일 시점 에러 감지 |
| **Vite** | 빌드 도구 | 초고속 HMR, 최적화된 빌드 |
| **React Query** | 서버 상태 관리 | 자동 캐싱, 백그라운드 동기화 |
| **React Window** | 가상화 | 대용량 리스트 효율적 렌더링 |
| **Recharts** | 데이터 시각화 | 조합 가능한 선언적 차트 |
| **Axios** | HTTP 클라이언트 | 인터셉터, 요청/응답 변환 |

### DevOps
- **Docker** - 컨테이너화
- **Docker Compose** - 멀티 컨테이너 오케스트레이션
- **Prometheus** - 메트릭 수집
- **Grafana** - 메트릭 시각화

## 🚀 시작하기

### 사전 요구사항

```bash
# 필수
- Java 17 이상
- Node.js 18 이상
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

# 선택 (로컬 개발용)
- Gradle 8.5+
- npm 또는 yarn
```

### Docker로 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/basilro/api-performance-monitor.git
cd api-performance-monitor

# 모든 서비스 시작
docker-compose up -d

# 애플리케이션 접속
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8080
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
```

### 로컬 개발 환경 구성

#### 백엔드 설정

```bash
cd backend

# 환경 변수 설정
export DB_PASSWORD=your_password

# Gradle로 실행
./gradlew bootRun

# 또는 JAR 빌드 후 실행
./gradlew build
java -jar build/libs/api-performance-monitor-1.0.0.jar
```

#### 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build
```

### 데이터베이스 설정

```sql
-- 데이터베이스 생성
CREATE DATABASE apmonitor;

-- 사용자 생성
CREATE USER apmonitor WITH PASSWORD 'changeme';
GRANT ALL PRIVILEGES ON DATABASE apmonitor TO apmonitor;

-- 마이그레이션은 애플리케이션에서 자동 처리
```

## 📁 프로젝트 구조

```
api-performance-monitor/
├── backend/
│   ├── src/main/java/com/apmonitor/
│   │   ├── domain/                    # 도메인 레이어
│   │   │   ├── model/                 # 도메인 모델
│   │   │   │   ├── ApiMetric.java     # 핵심 도메인 엔티티
│   │   │   │   └── MetricAggregate.java
│   │   │   └── repository/            # 레포지토리 인터페이스
│   │   ├── application/               # 애플리케이션 레이어
│   │   │   ├── command/               # CQRS 커맨드
│   │   │   │   ├── RecordMetricCommand.java
│   │   │   │   └── RecordMetricCommandHandler.java
│   │   │   └── query/                 # CQRS 쿼리
│   │   │       ├── GetMetricStatisticsQuery.java
│   │   │       └── GetMetricStatisticsQueryHandler.java
│   │   ├── infrastructure/            # 인프라 레이어
│   │   │   ├── persistence/           # 데이터베이스 구현
│   │   │   └── cache/                 # Redis 설정
│   │   └── presentation/              # 프레젠테이션 레이어
│   │       └── controller/            # REST 컨트롤러
│   └── src/main/resources/
│       └── application.yml            # 애플리케이션 설정
├── frontend/
│   ├── src/
│   │   ├── components/                # React 컴포넌트
│   │   │   ├── MetricDashboard.tsx   # 메인 대시보드
│   │   │   ├── MetricTable.tsx       # 가상 스크롤링 테이블
│   │   │   └── charts/               # 차트 컴포넌트
│   │   ├── hooks/                     # 커스텀 React 훅
│   │   │   ├── useMetricStatistics.ts
│   │   │   └── useVirtualization.ts
│   │   ├── api/                       # API 클라이언트 레이어
│   │   │   ├── client.ts             # Axios 설정
│   │   │   └── metricApi.ts          # API 메소드
│   │   ├── types/                     # TypeScript 타입
│   │   └── App.tsx                    # 루트 컴포넌트
│   ├── vite.config.ts                 # Vite 설정
│   └── package.json
├── docker-compose.yml                 # 멀티 컨테이너 설정
└── README.md
```

## ⚡ 성능 최적화

### 백엔드 최적화

1. **리액티브 프로그래밍**
   ```java
   // 전체 스택에서 논블로킹 I/O 사용
   public Mono<UUID> handle(RecordMetricCommand command) {
       return metricRepository.save(metric)
           .map(ApiMetric::getId);
   }
   ```

2. **분산 캐싱**
   ```java
   @Cacheable(value = "metricStats", key = "#query.endpoint")
   public Mono<MetricAggregate> handle(GetMetricStatisticsQuery query) {
       // Redis에서 캐시된 결과 제공
   }
   ```

3. **데이터베이스 최적화**
   - R2DBC를 통한 리액티브 데이터베이스 액세스
   - 커넥션 풀링
   - 인덱스를 활용한 쿼리 최적화

4. **메트릭 & 모니터링**
   ```yaml
   # Prometheus 메트릭 엔드포인트
   management:
     endpoints:
       web:
         exposure:
           include: metrics,prometheus
   ```

### 프론트엔드 최적화

1. **코드 스플리팅**
   ```typescript
   // 무거운 컴포넌트 지연 로딩
   const PerformanceChart = lazy(() => import('./charts/PerformanceChart'));
   ```

2. **번들 최적화**
   ```typescript
   // 최적 청킹을 위한 Vite 설정
   manualChunks: {
     'react-vendor': ['react', 'react-dom'],
     'query-vendor': ['@tanstack/react-query'],
     'chart-vendor': ['recharts'],
   }
   ```

3. **가상 스크롤링**
   ```typescript
   // 보이는 행만 렌더링 (react-window)
   <FixedSizeList
     height={600}
     itemCount={10000}
     itemSize={50}
   >
     {Row}
   </FixedSizeList>
   ```

4. **메모이제이션**
   ```typescript
   // 불필요한 리렌더링 방지
   const MetricCard = React.memo(({ title, value }) => (
     <div>{title}: {value}</div>
   ));
   ```

5. **압축**
   - Gzip & Brotli 압축
   - Tree shaking
   - Minification

## 📚 API 문서

### 엔드포인트

#### 메트릭 기록
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

응답: "uuid-string"
```

#### 통계 조회
```http
GET /api/v1/metrics/statistics?endpoint=/api/users&startTimeEpoch=1234567890&endTimeEpoch=1234567999

응답:
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

## 🧪 개발 가이드

### 백엔드 테스트

```bash
cd backend

# 모든 테스트 실행
./gradlew test

# 커버리지 포함 실행
./gradlew test jacocoTestReport

# 통합 테스트 실행
./gradlew integrationTest
```

### 프론트엔드 테스트

```bash
cd frontend

# 유닛 테스트 실행
npm run test

# 커버리지 포함 실행
npm run test:coverage

# E2E 테스트
npm run test:e2e
```

## 🚢 배포

### Docker 배포

```bash
# 이미지 빌드
docker-compose build

# 프로덕션 배포
docker-compose -f docker-compose.prod.yml up -d

# 서비스 스케일링
docker-compose up -d --scale backend=3
```

### Kubernetes 배포

```bash
# 설정 적용
kubectl apply -f k8s/

# 상태 확인
kubectl get pods
kubectl get services

# 로그 확인
kubectl logs -f deployment/api-monitor-backend
```

### 환경 변수

```bash
# 백엔드
DB_PASSWORD=your_secure_password
REDIS_HOST=redis.example.com
REDIS_PASSWORD=redis_password
SPRING_PROFILES_ACTIVE=production

# 프론트엔드
VITE_API_BASE_URL=https://api.example.com/api/v1
```

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 👨‍💻 개발자

**basilro** - 시니어 풀스택 엔지니어

- 10년 이상의 엔터프라이즈 소프트웨어 개발 경력
- Java, JavaScript, React, 분산 시스템 전문
- 클린 아키텍처와 성능 최적화에 열정

## 🙏 감사의 말

- 대규모 프로덕션 모니터링 시스템에서 영감을 받았습니다
- 현대적인 베스트 프랙티스와 엔터프라이즈 패턴으로 구축되었습니다
- 시니어 레벨 소프트웨어 엔지니어링 스킬을 보여주기 위해 설계되었습니다

---

**⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**

질문이나 피드백은 GitHub 이슈를 통해 부탁드립니다.
