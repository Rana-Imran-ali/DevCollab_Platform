/**
 * Project Service — Projects & Tasks API calls
 * Maps directly to Laravel /api/v1/projects/* endpoints
 */

import apiClient from './axios';

const projectService = {
  // ─── Projects ───────────────────────────────────────────
  /** GET /api/v1/projects?page=1 */
  getAll: (params = {}) =>
    apiClient.get('/projects', { params }),

  /** GET /api/v1/projects/:id */
  getById: (id) =>
    apiClient.get(`/projects/${id}`),

  /** POST /api/v1/projects */
  create: (data) =>
    apiClient.post('/projects', data),

  /** PUT /api/v1/projects/:id */
  update: (id, data) =>
    apiClient.put(`/projects/${id}`, data),

  /** DELETE /api/v1/projects/:id */
  delete: (id) =>
    apiClient.delete(`/projects/${id}`),

  // ─── Tasks ──────────────────────────────────────────────
  /** GET /api/v1/projects/:projectId/tasks */
  getTasks: (projectId, params = {}) =>
    apiClient.get(`/projects/${projectId}/tasks`, { params }),

  /** POST /api/v1/projects/:projectId/tasks */
  createTask: (projectId, data) =>
    apiClient.post(`/projects/${projectId}/tasks`, data),

  /** PUT /api/v1/projects/:projectId/tasks/:taskId */
  updateTask: (projectId, taskId, data) =>
    apiClient.put(`/projects/${projectId}/tasks/${taskId}`, data),

  /** DELETE /api/v1/projects/:projectId/tasks/:taskId */
  deleteTask: (projectId, taskId) =>
    apiClient.delete(`/projects/${projectId}/tasks/${taskId}`),
};

export default projectService;
