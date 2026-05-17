/**
 * AuthLayout — Shared layout wrapper for all authentication pages
 * Provides: animated background glows, centered card, logo, responsive padding
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ── Logo ──────────────────────────────────────────────────────────────────────
export function Logo() {
  return (
    <Link to="/" className="flex items-center justify-center gap-3 group">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-80 group-hover:opacity-100 transition-opacity shadow-[0_0_24px_rgba(99,102,241,0.4)]" />
        <div className="relative w-full h-full rounded-xl flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <span className="font-display font-bold text-xl text-[var(--color-text-primary)] tracking-tight">
        DevCollab
      </span>
    </Link>
  );
}

// ── OAuth Buttons ─────────────────────────────────────────────────────────────
export function OAuthButtons({ label = 'Or continue with', onGoogle, onGithub }) {
  return (
    <div className="mt-6">
      <div className="divider-label text-xs">
        <span>{label}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onGoogle}
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg
                     bg-[var(--color-surface-3)] border border-[var(--color-border-strong)]
                     text-sm font-medium text-[var(--color-text-secondary)]
                     hover:border-[rgba(99,102,241,0.4)] hover:text-[var(--color-text-primary)]
                     hover:bg-[var(--color-surface-4)] transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={onGithub}
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg
                     bg-[var(--color-surface-3)] border border-[var(--color-border-strong)]
                     text-sm font-medium text-[var(--color-text-secondary)]
                     hover:border-[rgba(99,102,241,0.4)] hover:text-[var(--color-text-primary)]
                     hover:bg-[var(--color-surface-4)] transition-all duration-200"
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
}

// ── Error Alert ───────────────────────────────────────────────────────────────
export function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--color-danger-muted)] border border-[rgba(239,68,68,0.25)]"
    >
      <svg className="shrink-0 mt-0.5 text-[var(--color-danger)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p className="text-sm text-[var(--color-danger)] leading-snug">{message}</p>
    </motion.div>
  );
}

// ── Success Alert ─────────────────────────────────────────────────────────────
export function SuccessAlert({ message }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-3.5 rounded-lg bg-[var(--color-success-muted)] border border-[rgba(34,197,94,0.25)]"
    >
      <svg className="shrink-0 mt-0.5 text-[var(--color-success)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <p className="text-sm text-[var(--color-success)] leading-snug">{message}</p>
    </motion.div>
  );
}

// ── Password strength meter ───────────────────────────────────────────────────
export function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special character', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const barColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColors[score] : 'bg-[var(--color-surface-4)]'}`}
          />
        ))}
        <span className="text-xs text-[var(--color-text-muted)] ml-2 shrink-0 w-12">
          {labels[score]}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${c.pass ? 'bg-green-500' : 'bg-[var(--color-surface-4)]'}`} />
            <span className={`text-[0.7rem] transition-colors ${c.pass ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-muted)]'}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Auth Layout ──────────────────────────────────────────────────────────
export default function AuthLayout({ children, maxWidth = 'max-w-md' }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-1)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/5 blur-[140px]" />
      </div>

      {/* Grid dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366F1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className={`relative z-10 w-full ${maxWidth}`}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <Logo />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
