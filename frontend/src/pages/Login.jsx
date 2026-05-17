import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout, { OAuthButtons, ErrorAlert } from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// ── Icons ─────────────────────────────────────────────────────────────────────
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
  if (!form.email)                          errs.email    = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email  = 'Enter a valid email address.';
  if (!form.password)                        errs.password = 'Password is required.';
  return errs;
}

export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass]   = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (apiError)     setApiError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setApiError('');

    const result = await login(form);

    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setApiError(result.message);
      // Map backend 422 field errors into form
      if (result.errors) setErrors(result.errors);
    }
  }

  function handleOAuth(provider) {
    // Redirect to backend OAuth handler
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}/redirect`;
  }

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="heading-lg text-[var(--color-text-primary)]">Welcome back</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[var(--color-primary-light)] hover:text-[var(--color-primary)] font-medium transition-colors">
            Sign up for free
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="card card-glass p-8 space-y-5">

        {/* API Error */}
        <ErrorAlert message={apiError} />

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            leftIcon={<MailIcon />}
            autoComplete="email"
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="form-label mb-0">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<LockIcon />}
              rightIcon={
                <button type="button" onClick={() => setShowPass((p) => !p)} className="cursor-pointer hover:text-[var(--color-text-primary)] transition-colors">
                  <EyeIcon off={showPass} />
                </button>
              }
              autoComplete="current-password"
            />
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[var(--color-border-strong)] bg-[var(--color-surface-3)] accent-indigo-500 cursor-pointer"
            />
            <span className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
              Remember me for 30 days
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            className="mt-2"
          >
            Sign in
          </Button>
        </form>

        <OAuthButtons
          label="Or continue with"
          onGoogle={() => handleOAuth('google')}
          onGithub={() => handleOAuth('github')}
        />
      </div>
    </AuthLayout>
  );
}
