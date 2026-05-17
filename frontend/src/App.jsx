import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// ── Route Guards & Layouts (Load eagerly as they wrap the app) ──
import ProtectedRoute from './router/ProtectedRoute';
import GuestRoute from './router/GuestRoute';
import DashboardLayout from './layouts/DashboardLayout';

// ── Lazy Loaded Pages ──
// Public
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));

// Protected
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Chat = lazy(() => import('./pages/Chat'));
const TeamManagement = lazy(() => import('./pages/TeamManagement'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const Workspace = lazy(() => import('./pages/Workspace'));
const Developers = lazy(() => import('./pages/Developers'));
const Problems = lazy(() => import('./pages/Problems'));
const ProblemDetails = lazy(() => import('./pages/ProblemDetails'));
const Communities = lazy(() => import('./pages/Communities'));
const CommunityDetails = lazy(() => import('./pages/CommunityDetails'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));

// ── Global Loading Fallback ──
const GlobalLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-surface-1)]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[var(--color-surface-3)] border-t-[var(--color-primary)] rounded-full animate-spin" />
      <span className="text-[var(--color-text-muted)] text-sm font-medium animate-pulse">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            {/* ─── Public Landing ──────────────────────── */}
            <Route path="/" element={<Home />} />

            {/* ─── Guest-Only Routes ───────────────────── */}
            {/* Redirect to /dashboard if already logged in */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* ─── Protected Routes ────────────────────── */}
            {/* Redirect to /login if not authenticated    */}
            <Route element={<ProtectedRoute />}>
              <Route path="/verify-email" element={<VerifyEmail />} />
              
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Workspace />} /> {/* Utilizing the new Workspace as Dashboard */}
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/:id" element={<ProblemDetails />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/communities/:id" element={<CommunityDetails />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Route>

              {/* Standalone full-screen workspace (e.g. Code Editor / no sidebar) */}
              <Route path="/workspace/:id" element={<Workspace />} />
            </Route>

            {/* ─── Admin-Only Routes ───────────────────── */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<div className="text-[var(--color-text-primary)] p-8">Admin Panel</div>} />
            </Route>

            {/* ─── 404 Fallback ────────────────────────── */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-surface-1)] text-[var(--color-text-primary)] gap-4">
                  <h1 className="text-9xl font-bold text-[var(--color-primary)] opacity-50">404</h1>
                  <h2 className="heading-md">Page Not Found</h2>
                  <a href="/dashboard" className="mt-4 px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium rounded-lg transition-colors">
                    Return to Dashboard
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
