import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-[#111111] border-b border-[#3A3A3A] h-16 flex items-center justify-between px-6 shrink-0 z-10 w-full glass sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu button could go here */}
        <h1 className="text-xl font-bold font-display tracking-tight text-[#FFD700]">
          DevCollab
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search, Notifications, Profile */}
        <div className="hidden md:flex relative group">
           <input 
             type="text" 
             placeholder="Search projects..." 
             className="bg-[#1A1A1A] border border-[#3A3A3A] text-white rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors w-64"
           />
           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] text-xs">⌘K</span>
        </div>
        
        <button className="text-[#888888] hover:text-[#FFD700] transition-colors p-2 rounded-full hover:bg-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#E6C200] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_10px_rgba(255,215,0,0.3)] cursor-pointer">
          US
        </div>
      </div>
    </header>
  );
};

export default Navbar;
