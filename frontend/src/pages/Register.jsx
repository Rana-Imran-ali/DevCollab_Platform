import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout, { OAuthButtons, ErrorAlert, PasswordStrength } from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// ── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const EyeIcon = ({ off }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {off
      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    }
  </svg>
);

// ── Validation ────────────────────────────────────────────────────────────────
function validate(form) {
  const errs = {};
  if (!form.name || form.name.trim().length < 2) errs.name = 'Full name must be at least 2 characters.';
  if (!form.email) errs.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';
  if (!form.password) errs.password = 'Password is required.';
  else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
  if (form.password !== form.password_confirmation) errs.password_confirmation = 'Passwords do not match.';
  return errs;
}

export default function Register() {
  const navigate    = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [agreed, setAgreed]       = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (apiError)     setApiError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) { setApiError('You must agree to the Terms of Service and Privacy Policy.'); return; }

    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setApiError('');

    const result = await register(form);
    setIsLoading(false);

    if (result.success) {
      navigate('/verify-email');
    } else {
      setApiError(result.message);
      if (result.errors) setErrors(result.errors);
    }
  }

  function handleOAuth(provider) {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}/redirect`;
  }

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="heading-lg text-[var(--color-text-primary)]">Create your account</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-primary-light)] hover:text-[var(--color-primary)] font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="card card-glass p-8 space-y-5">
        <ErrorAlert message={apiError} />

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Full name"
            placeholder="Alex Johnson"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            leftIcon={<UserIcon />}
            autoComplete="name"
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Work email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            leftIcon={<MailIcon />}
            autoComplete="email"
            required
          />

          <div>
            <Input
              id="password"
              name="password"
              type={showPass ? 'text' : 'password'}
              label="Password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<LockIcon />}
              rightIcon={
                <button type="button" onClick={() => setShowPass((p) => !p)} className="cursor-pointer hover:text-[var(--color-text-primary)] transition-colors">
                  <EyeIcon off={showPass} />
                </button>
              }
              autoComplete="new-password"
              required
            />
            {/* Password strength */}
            <PasswordStrength password={form.password} />
          </div>

          <Input
            id="password_confirmation"
            name="password_confirmation"
            type={showPass ? 'text' : 'password'}
            label="Confirm password"
            placeholder="Repeat your password"
            value={form.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation}
            leftIcon={<LockIcon />}
            autoComplete="new-password"
            required
          />

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer group mt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[var(--color-border-strong)] bg-[var(--color-surface-3)] accent-indigo-500 cursor-pointer shrink-0"
            />
            <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-[var(--color-primary-light)] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[var(--color-primary-light)] hover:underline">Privacy Policy</a>
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            Create account
          </Button>
        </form>

        <OAuthButtons
          label="Or sign up with"
          onGoogle={() => handleOAuth('google')}
          onGithub={() => handleOAuth('github')}
        />
      </div>
    </AuthLayout>
  );
}
