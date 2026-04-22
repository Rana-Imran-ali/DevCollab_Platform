import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({
  items = [],
  logoText = "DevCollab",
  logoHref = "/",
  footer
}) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#3A3A3A] flex-shrink-0 hidden md:flex flex-col h-full z-20 transition-all duration-300">
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#3A3A3A] shrink-0">
        <Link to={logoHref} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center text-black font-extrabold group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all">
            {logoText.charAt(0)}
          </div>
          <span className="font-display font-bold text-xl tracking-wide hidden lg:block text-white">
            {logoText.substring(0, 3)}<span className="text-[#FFD700]">{logoText.substring(3)}</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {items.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-[#FFD700]/10 to-transparent text-[#FFD700] border-l-2 border-[#FFD700]' 
                  : 'text-[#888888] hover:bg-[#1A1A1A] hover:text-white border-l-2 border-transparent'
                }
              `}
            >
              {item.icon && (
                <span className={`mr-3 flex-shrink-0 transition-colors ${isActive ? 'text-[#FFD700]' : 'text-[#888888] group-hover:text-white'}`}>
                  {item.icon}
                </span>
              )}
              {item.name}
              {item.badge && (
                <span className="ml-auto bg-[#3A3A3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* Footer / CTA Area */}
      {footer && (
        <div className="p-4 border-t border-[#3A3A3A]">
          {footer}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
