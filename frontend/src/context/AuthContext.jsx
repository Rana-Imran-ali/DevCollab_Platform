/**
 * Auth Context & Provider
 *
 * Global authentication state available throughout the entire app.
 * Stores: current user, token, roles, loading state.
 * Persists: auth_token + auth_user in sessionStorage.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() =>
    sessionStorage.getItem('auth_token') || null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = !!token && !!user;

  // ─── Verify token is still valid on app load ──────────────────────────────
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setIsInitializing(false);
        return;
      }
      try {
        const res = await authService.me();
        setUser(res.data.data);
        sessionStorage.setItem('auth_user', JSON.stringify(res.data.data));
      } catch {
        // Token invalid — clear everything
        clearSession();
      } finally {
        setIsInitializing(false);
      }
    };
    verifySession();
  }, []);

  const saveSession = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem('auth_token', authToken);
    sessionStorage.setItem('auth_user', JSON.stringify(userData));
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
  }, []);

  // ─── Auth Actions ─────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      const { user: userData, token: authToken } = res.data.data;
      saveSession(userData, authToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed.',
        errors: error.response?.data?.errors || {},
      };
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  const register = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      const { user: userData, token: authToken } = res.data.data;
      saveSession(userData, authToken);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed.',
        errors: error.response?.data?.errors || {},
      };
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const hasRole = useCallback((role) => {
    return user?.roles?.some((r) => r.name === role) ?? false;
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    isInitializing,
    login,
    register,
    logout,
    hasRole,
    saveSession,
    clearSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook — consume auth context in any component.
 * Usage: const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}
