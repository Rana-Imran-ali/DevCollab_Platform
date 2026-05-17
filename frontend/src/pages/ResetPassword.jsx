import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout, { ErrorAlert, SuccessAlert, PasswordStrength } from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import authService from '../services/authService';

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

function validate(form) {
  const errs = {};
  if (!form.password) errs.password = 'New password is required.';
  else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
  if (form.password !== form.password_confirmation) errs.password_confirmation = 'Passwords do not match.';
  return errs;
}

export default function ResetPassword() {
  const navigate       = useNavigate();
  const [params]       = useSearchParams();
  const token          = params.get('token') || '';
  const emailFromUrl   = params.get('email') || '';

  const [form, setForm] = useState({ email: emailFromUrl, password: '', password_confirmation: '' });
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass]   = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    setApiError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setApiError('');

    try {
      await authService.resetPassword({ ...form, token });
      setSuccess('Password reset successfully! Redirecting you to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Reset failed. The link may have expired.';
      const fieldErrs = err.response?.data?.errors || {};
      setApiError(msg);
      setErrors(fieldErrs);
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthLayout>
        <div className="card card-glass p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-danger-muted)] border border-[rgba(239,68,68,0.3)] flex items-center justify-center mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-danger)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="heading-md text-[var(--color-text-primary)]">Invalid reset link</h2>
          <p className="text-sm text-[var(--color-text-muted)]">This link is missing a reset token. Please request a new password reset.</p>
          <Link to="/forgot-password" className="btn btn-primary w-full">Request new link</Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-glow)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center">
            <LockIcon className="text-[var(--color-primary-light)] scale-150" />
          </div>
        </div>
        <h1 className="heading-md text-[var(--color-text-primary)]">Create new password</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Your new password must be different from your previous password.
        </p>
      </div>

      <div className="card card-glass p-8 space-y-5">
        <ErrorAlert message={apiError} />
        <SuccessAlert message={success} />

        {!success && (
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Hidden email field for password managers */}
            <input type="hidden" name="email" value={form.email} autoComplete="email" />

            <div>
              <Input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                label="New password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                leftIcon={<LockIcon />}
                rightIcon={
                  <button type="button" onClick={() => setShowPass((p) => !p)} className="cursor-pointer hover:text-[var(--color-text-primary)] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPass
                        ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                      }
                    </svg>
                  </button>
                }
                autoComplete="new-password"
                required
              />
              <PasswordStrength password={form.password} />
            </div>

            <Input
              id="password_confirmation"
              name="password_confirmation"
              type={showPass ? 'text' : 'password'}
              label="Confirm new password"
              placeholder="Repeat your new password"
              value={form.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
              leftIcon={<LockIcon />}
              autoComplete="new-password"
              required
            />

            <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
              Reset password
            </Button>
          </motion.form>
        )}

        <div className="text-center pt-1">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
