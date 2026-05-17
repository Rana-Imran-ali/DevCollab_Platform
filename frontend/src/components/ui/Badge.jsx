/**
 * Badge — Status/label indicator pill
 * Variants: primary | success | warning | danger | info | muted
 */

const VARIANTS = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger:  'badge-danger',
  info:    'badge-info',
  muted:   'badge-muted',
};

export default function Badge({
  children,
  variant   = 'primary',
  dot       = false,
  className = '',
}) {
  return (
    <span className={['badge', VARIANTS[variant] ?? 'badge-primary', className].join(' ')}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-80`} />
      )}
      {children}
    </span>
  );
}
