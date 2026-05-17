/**
 * Button — Reusable action component
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes: xs | sm | md (default) | lg | xl | icon
 */

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
};

const SIZES = {
  xs:   'btn-xs',
  sm:   'btn-sm',
  md:   '',
  lg:   'btn-lg',
  xl:   'btn-xl',
  icon: 'btn-icon',
};

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  className = '',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={[
        'btn',
        VARIANTS[variant] ?? 'btn-primary',
        SIZES[size] ?? '',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading  ? <Spinner /> : leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
