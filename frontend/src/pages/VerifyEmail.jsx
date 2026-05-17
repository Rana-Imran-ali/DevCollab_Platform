import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout, { ErrorAlert, SuccessAlert } from '../components/auth/AuthLayout';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

export default function VerifyEmail() {
  const navigate         = useNavigate();
  const { user, logout } = useAuth();

  const [apiError, setApiError]   = useState('');
  const [success, setSuccess]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // resend cooldown

  // Auto-redirect if already verified
  useEffect(() => {
    if (user?.email_verified_at) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  async function handleResend() {
    if (countdown > 0) return;
    setIsLoading(true);
    setApiError('');
    setSuccess('');

    try {
      await authService.resendVerification();
      setSuccess('Verification email resent! Check your inbox and spam folder.');
      setCountdown(60); // 60-second cooldown
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <AuthLayout>
      <div className="card card-glass p-8 text-center space-y-6">

        {/* Animated envelope icon */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-[rgba(99,102,241,0.3)] animate-pulse-glow" />
            <div className="relative w-full h-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-primary-light)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <div>
          <h1 className="heading-md text-[var(--color-text-primary)]">Check your email</h1>
          {user?.email && (
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              We sent a verification link to{' '}
              <span className="text-[var(--color-text-secondary)] font-medium">{user.email}</span>
            </p>
          )}
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Click the link in the email to verify your account.
          </p>
        </div>

        {/* Alerts */}
        <div className="space-y-3 text-left">
          <ErrorAlert message={apiError} />
          <SuccessAlert message={success} />
        </div>

        {/* Steps */}
        <div className="bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-xl p-4 space-y-3 text-left">
          {[
            'Open your email inbox',
            'Find the email from DevCollab',
            'Click "Verify email address"',
            'You\'ll be redirected to your dashboard',
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--color-primary-glow)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center shrink-0">
                <span className="text-[0.65rem] font-bold text-[var(--color-primary-light)]">{i + 1}</span>
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">{step}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            disabled={countdown > 0}
            onClick={handleResend}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend verification email'}
          </Button>

          <button
            onClick={handleLogout}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            Sign in with a different account
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-[var(--color-text-muted)]">
          Didn't receive the email? Check your spam folder or{' '}
          <a href="mailto:support@devcollab.com" className="text-[var(--color-primary-light)] hover:underline">
            contact support
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
