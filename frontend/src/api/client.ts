import axios from 'axios';

/**
 * Axios 클라이언트 설정
 * - 요청/응답 인터셉터로 성능 모니터링
 * - 타임아웃 설정
 * - 에러 핸들링
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const startTime = Date.now();
    config.metadata = { startTime };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    const endTime = Date.now();
    const duration = endTime - (response.config.metadata?.startTime || endTime);
    
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }
    
    return response;
  },
  (error) => {
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);

export default apiClient;