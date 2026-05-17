/**
 * Modal — Glassmorphism dialog with Framer Motion animation
 * Sizes: sm | md (default) | lg | xl | full
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SIZES = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw]',
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size       = 'md',
  closeable  = true,
  className  = '',
}) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen || !closeable) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeable, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">

          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeable ? onClose : undefined}
          />

          {/* ── Panel ── */}
          <motion.div
            className={[
              'relative w-full z-10 card card-glass shadow-[0_24px_80px_rgba(0,0,0,0.8)]',
              SIZES[size] ?? SIZES.md,
              className,
            ].join(' ')}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            {(title || closeable) && (
              <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[var(--color-border)]">
                <div>
                  {title && (
                    <h2 className="heading-sm text-[var(--color-text-primary)]">{title}</h2>
                  )}
                  {description && (
                    <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{description}</p>
                  )}
                </div>
                {closeable && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="shrink-0 p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-4)] transition-colors"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface-1)] rounded-b-xl">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
