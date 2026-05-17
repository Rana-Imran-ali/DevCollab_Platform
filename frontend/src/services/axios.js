/**
 * Axios Instance — Global HTTP Client
 *
 * Automatically:
 * - Attaches Bearer token from sessionStorage
 * - Normalizes API responses to `response.data`
 * - Redirects to /login on 401 (expired/invalid token)
 * - Formats validation errors (422) for React Hook Form
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for Sanctum SPA cookie authentication
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attach Bearer token on every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Normalize responses & handle global error cases
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 401 — Token expired or invalid → force logout
    if (status === 401) {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_user');
      window.location.href = '/login';
    }

    // 403 — Email not verified → redirect to verification notice
    if (status === 403 && error.response?.data?.action === 'resend_verification') {
      window.location.href = '/verify-email';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
