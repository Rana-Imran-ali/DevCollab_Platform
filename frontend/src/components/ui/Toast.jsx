/**
 * Toast — Global notification system
 * Types: success | error | warning | info
 *
 * Usage with ToastContext:
 *   const { showToast } = useToastContext();
 *   showToast('Saved!', 'success');
 */

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// ─── Icons ────────────────────────────────────────────────────────────────────
const icons = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const styles = {
  success: { bar: 'bg-[var(--color-success)]', icon: 'text-[var(--color-success)] bg-[var(--color-success-muted)]' },
  error:   { bar: 'bg-[var(--color-danger)]',  icon: 'text-[var(--color-danger)]  bg-[var(--color-danger-muted)]' },
  warning: { bar: 'bg-[var(--color-warning)]', icon: 'text-[var(--color-warning)] bg-[var(--color-warning-muted)]' },
  info:    { bar: 'bg-[var(--color-info)]',    icon: 'text-[var(--color-info)]    bg-[var(--color-info-muted)]' },
};

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);
let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev.slice(-4), { id, message, type }]); // max 5

    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      {createPortal(
        <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 items-end" aria-live="polite">
          <AnimatePresence initial={false}>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-3 w-[340px] max-w-[90vw] rounded-xl glass shadow-[var(--shadow-lg)] overflow-hidden p-4 pr-10"
              >
                {/* Colored left bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${styles[toast.type]?.bar}`} />

                {/* Icon */}
                <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg ${styles[toast.type]?.icon}`}>
                  {icons[toast.type]}
                </div>

                {/* Message */}
                <p className="text-sm text-[var(--color-text-primary)] leading-snug pt-0.5">
                  {toast.message}
                </p>

                {/* Dismiss */}
                <button
                  onClick={() => dismiss(toast.id)}
                  className="absolute right-3 top-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  aria-label="Dismiss"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used inside <ToastProvider>');
  return ctx;
}

export default ToastProvider;
