import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
    { name: 'Projects', href: '/projects', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
    { name: 'Tasks', href: '/tasks', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
    { name: 'Team', href: '/team', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
    { name: 'Settings', href: '/settings', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  ];

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#3A3A3A] flex-shrink-0 hidden md:flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-[#3A3A3A] shrink-0">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center text-black font-extrabold group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all">
            D
          </div>
          <span className="font-display font-bold text-xl tracking-wide hidden lg:block text-white">
            Dev<span className="text-[#FFD700]">Collab</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
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
              <svg 
                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-[#FFD700]' : 'text-[#888888] group-hover:text-white'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {item.icon.split(' M').map((d, i) => (
                  <path key={i} d={i === 0 ? d : `M${d}`} />
                ))}
              </svg>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#3A3A3A]">
        <div className="rounded-lg bg-[#1A1A1A] p-4 text-center">
            <h4 className="text-sm font-bold text-white mb-1">Pro Plan Active</h4>
            <p className="text-xs text-[#888888] mb-3">12 days remaining</p>
            <button className="w-full text-xs bg-[#FFD700] hover:bg-[#E6C200] text-black font-bold py-2 rounded transition-colors shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                Upgrade Now
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
