import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout, { ErrorAlert, SuccessAlert } from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import authService from '../services/authService';

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default function ForgotPassword() {
  const [email, setEmail]       = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent]           = useState(false);

  function validate() {
    if (!email) { setEmailError('Email is required.'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Enter a valid email address.'); return false; }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    setSuccess('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccess(`Reset instructions sent to ${email}. Check your inbox (and spam folder).`);
      setSent(true);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-glow)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-primary-light)]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
        </div>
        <h1 className="heading-md text-[var(--color-text-primary)]">Forgot your password?</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
          No worries. Enter your email address and we'll send you a secure reset link.
        </p>
      </div>

      <div className="card card-glass p-8 space-y-5">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <ErrorAlert message={apiError} />

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); setApiError(''); }}
                  error={emailError}
                  leftIcon={<MailIcon />}
                  autoComplete="email"
                  required
                />

                <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
                  Send reset link
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <SuccessAlert message={success} />

              <div className="text-center space-y-3">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Didn't receive it?{' '}
                  <button
                    onClick={() => { setSent(false); setSuccess(''); }}
                    className="text-[var(--color-primary-light)] hover:underline font-medium"
                  >
                    Resend email
                  </button>
                </p>

                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => { setSent(false); setEmail(''); setSuccess(''); }}
                >
                  Try a different email
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
