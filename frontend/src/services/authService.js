/**
 * Auth Service — Authentication API calls
 * Maps directly to Laravel /api/v1/auth/* endpoints
 */

import apiClient from './axios';

const authService = {
  /**
   * POST /api/v1/auth/register
   */
  register: (data) =>
    apiClient.post('/auth/register', data),

  /**
   * POST /api/v1/auth/login
   */
  login: (data) =>
    apiClient.post('/auth/login', data),

  /**
   * POST /api/v1/auth/logout
   */
  logout: () =>
    apiClient.post('/auth/logout'),

  /**
   * GET /api/v1/auth/me
   */
  me: () =>
    apiClient.get('/auth/me'),

  /**
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }),

  /**
   * POST /api/v1/auth/reset-password
   */
  resetPassword: (data) =>
    apiClient.post('/auth/reset-password', data),

  /**
   * POST /api/v1/auth/email/resend
   */
  resendVerification: () =>
    apiClient.post('/auth/email/resend'),

  /**
   * OAuth redirect URL builders
   */
  oauthRedirectUrl: (provider) =>
    `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}/redirect`,
};

export default authService;
