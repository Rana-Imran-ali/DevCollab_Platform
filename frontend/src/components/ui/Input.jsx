/**
 * Input — Reusable form input
 * Supports: label, error, helperText, leftIcon, rightIcon, textarea mode
 */

import { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  as: Tag = 'input',
  rows = 4,
  required = false,
  ...props
}, ref) => {

  const inputClass = [
    'input',
    error ? 'input-error' : '',
    leftIcon  ? 'pl-9'  : '',
    rightIcon ? 'pr-9'  : '',
    Tag === 'textarea' ? 'resize-none leading-relaxed' : '',
    className,
  ].join(' ');

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-[var(--color-text-muted)]">
            {leftIcon}
          </div>
        )}

        {Tag === 'textarea' ? (
          <textarea
            ref={ref}
            id={id}
            rows={rows}
            className={inputClass}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            className={inputClass}
            {...props}
          />
        )}

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[var(--color-text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>

      {error      && <span className="form-error">{error}</span>}
      {helperText && !error && <span className="form-helper">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
