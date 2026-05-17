/**
 * ProtectedRoute Component
 *
 * Guards routes that require authentication.
 * Redirects to /login if user is not authenticated.
 * Shows a full-screen loader while the session is initializing.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="dashboard" element={<Dashboard />} />
 *   </Route>
 *
 * Role-based usage:
 *   <Route element={<ProtectedRoute requiredRole="admin" />}>
 *     <Route path="admin" element={<AdminPanel />} />
 *   </Route>
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ requiredRole = null }) {
  const { isAuthenticated, isInitializing, hasRole } = useAuth();
  const location = useLocation();

  // Wait for session initialization before making routing decisions
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but missing required role
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
