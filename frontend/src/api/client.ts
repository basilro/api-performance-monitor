import axios from 'axios';

/**
 * Axios client with performance optimizations
 * - Request/response interceptors for monitoring
 * - Timeout configuration
 * - Error handling
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authentication tokens, logging, etc.
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

// Response interceptor for logging performance metrics
apiClient.interceptors.response.use(
  (response) => {
    const endTime = Date.now();
    const duration = endTime - (response.config.metadata?.startTime || endTime);
    
    // Log API performance in development
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