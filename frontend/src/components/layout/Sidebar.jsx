import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({
  items = [],
  logoText = "DevCollab",
  logoHref = "/dashboard",
  footer
}) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[var(--color-surface-2)] border-r border-[var(--color-border)] flex-shrink-0 hidden md:flex flex-col h-full z-20">
      
      {/* ── Header / Logo ── */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)] shrink-0">
        <Link to={logoHref} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)] flex items-center justify-center text-white font-extrabold group-hover:shadow-[var(--shadow-glow)] transition-all">
            {logoText.charAt(0)}
          </div>
          <span className="font-display font-bold text-lg tracking-wide hidden lg:block text-[var(--color-text-primary)]">
            Dev<span className="text-[var(--color-primary-light)]">Collab</span>
          </span>
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-[var(--color-primary-glow)] text-[var(--color-primary-light)] border-l-2 border-[var(--color-primary)]' 
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)] border-l-2 border-transparent'
                }
              `}
            >
              <span className={`mr-3 shrink-0 transition-colors ${isActive ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'}`}>
                {item.icon}
              </span>
              {item.name}
              {item.badge && (
                <span className="ml-auto bg-[var(--color-primary)] text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* ── Footer ── */}
      {footer && (
        <div className="p-4 border-t border-[var(--color-border)]">
          {footer}
        </div>
      )}
    </aside>
  );
}
