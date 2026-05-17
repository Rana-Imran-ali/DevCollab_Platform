/**
 * Skeleton — Loading placeholder components
 *
 * Usage:
 *   <Skeleton width="100%" height="1rem" />
 *   <Skeleton.Card />
 *   <Skeleton.Avatar size="md" />
 *   <Skeleton.Text lines={3} />
 */

function Skeleton({ width = '100%', height = '1rem', className = '', rounded = 'md' }) {
  const radii = {
    none: 'rounded-none', sm: 'rounded', md: 'rounded-md',
    lg: 'rounded-lg', xl: 'rounded-xl', full: 'rounded-full',
  };
  return (
    <div
      className={`skeleton ${radii[rounded] ?? 'rounded-md'} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="0.8rem"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({ size = 'md' }) {
  const sizes = { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' };
  return (
    <Skeleton
      width={sizes[size] ?? '2.5rem'}
      height={sizes[size] ?? '2.5rem'}
      rounded="full"
      className="shrink-0"
    />
  );
}

function SkeletonCard({ className = '' }) {
  return (
    <div className={`card card-body space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton height="0.875rem" width="50%" />
          <Skeleton height="0.75rem" width="35%" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <div className="flex gap-2 pt-1">
        <Skeleton height="1.5rem" width="4rem" rounded="full" />
        <Skeleton height="1.5rem" width="4rem" rounded="full" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-[var(--color-border)]">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height="0.75rem" width={i === 0 ? '30%' : '20%'} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 py-2">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height="0.875rem" width={c === 0 ? '30%' : '20%'} />
          ))}
        </div>
      ))}
    </div>
  );
}

Skeleton.Text   = SkeletonText;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Card   = SkeletonCard;
Skeleton.Table  = SkeletonTable;

export default Skeleton;
