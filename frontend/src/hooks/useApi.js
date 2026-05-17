/**
 * useApi Hook — Standardized API call handler
 *
 * Wraps any service call with:
 * - loading state
 * - error state (string message)
 * - field errors (for form validation from backend 422s)
 *
 * Usage:
 *   const { execute, isLoading, error, fieldErrors } = useApi();
 *   const result = await execute(() => projectService.create(data));
 */

import { useState, useCallback } from 'react';

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const execute = useCallback(async (apiCall) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await apiCall();
      return { success: true, data: response.data.data, meta: response.data.meta };
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      const errors = err.response?.data?.errors || {};

      setError(message);

      // 422 Unprocessable Entity — backend validation errors
      if (status === 422) {
        setFieldErrors(errors);
      }

      return { success: false, message, errors };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearErrors = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  return { execute, isLoading, error, fieldErrors, clearErrors };
}
