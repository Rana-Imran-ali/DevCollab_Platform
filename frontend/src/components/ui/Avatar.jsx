/**
 * Avatar — User avatar with image fallback to initials
 * Sizes: xs | sm | md | lg | xl
 * Shows online/offline status dot when `status` prop is passed
 */

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

const SIZES = {
  xs: 'avatar-xs text-[0.55rem]',
  sm: 'avatar-sm text-[0.65rem]',
  md: 'avatar-md text-[0.8rem]',
  lg: 'avatar-lg text-[0.95rem]',
  xl: 'avatar-xl text-[1.2rem]',
};

const STATUS_CLASSES = {
  online:  'status-dot status-online',
  away:    'status-dot status-away',
  offline: 'status-dot status-offline',
  busy:    'status-dot status-busy',
};

const STATUS_POSITION = {
  xs: 'w-1.5 h-1.5 -bottom-0 -right-0',
  sm: 'w-2 h-2 -bottom-0 -right-0',
  md: 'w-2.5 h-2.5 bottom-0 right-0',
  lg: 'w-3 h-3 bottom-0 right-0',
  xl: 'w-3.5 h-3.5 bottom-0.5 right-0.5',
};

export default function Avatar({
  src,
  name     = '',
  size     = 'md',
  status,
  className = '',
  ...props
}) {
  return (
    <div className="relative inline-flex shrink-0" {...props}>
      <div className={['avatar', SIZES[size] ?? SIZES.md, className].join(' ')}>
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <span className="font-semibold tracking-tight select-none">
            {getInitials(name) || '?'}
          </span>
        )}
      </div>

      {status && (
        <span
          className={[
            'absolute border-2 border-[var(--color-surface-2)] rounded-full',
            STATUS_CLASSES[status] ?? '',
            STATUS_POSITION[size] ?? STATUS_POSITION.md,
          ].join(' ')}
        />
      )}
    </div>
  );
}
