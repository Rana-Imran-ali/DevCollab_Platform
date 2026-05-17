import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  message: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  collab: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  system: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
};

// Mock Notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'collab', user: 'Sarah Chen', action: 'invited you to project', target: 'E-commerce Overhaul', time: '10 mins ago', unread: true },
  { id: 2, type: 'message', user: 'Alex Rivera', action: 'mentioned you in', target: 'general', time: '1 hour ago', unread: true },
  { id: 3, type: 'system', user: 'System', action: 'completed deployment for', target: 'Payment Gateway V2', time: '2 hours ago', unread: false },
  { id: 4, type: 'collab', user: 'Marcus Doe', action: 'requested to join your team', target: 'DevCollab', time: '1 day ago', unread: false },
];

export default function Navbar({ 
  logo,
  appName = "DevCollab",
  user,
  onSearch,
  customActions
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getNotifIcon = (type) => {
    switch(type) {
      case 'message': return <div className="text-[var(--color-primary)]">{Icons.message}</div>;
      case 'collab': return <div className="text-[var(--color-success)]">{Icons.collab}</div>;
      case 'system': return <div className="text-[var(--color-warning)]">{Icons.system}</div>;
      default: return null;
    }
  };

  return (
    <header className="bg-[var(--color-surface-1)]/80 backdrop-blur-md border-b border-[var(--color-border)] h-16 flex items-center justify-between px-6 shrink-0 z-30 w-full sticky top-0">
      <div className="flex items-center gap-4">
        {logo ? logo : (
          <h1 className="text-xl font-bold font-display tracking-tight text-[var(--color-primary-light)]">
            {appName}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {onSearch && (
          <div className="hidden md:flex relative group">
             <input 
               type="text" 
               placeholder="Search workspaces..." 
               onChange={(e) => onSearch(e.target.value)}
               className="bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors w-64 shadow-sm"
             />
             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-[0.65rem] font-bold border border-[var(--color-border)] px-1 rounded">⌘K</span>
          </div>
        )}

        {customActions}
        
        {user ? (
          <div className="flex items-center gap-4">
            
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors p-2 rounded-full hover:bg-[var(--color-surface-2)]"
              >
                {Icons.bell}
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-[var(--color-danger)] rounded-full border-2 border-[var(--color-surface-1)]" />
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-xl shadow-[var(--shadow-dropdown)] overflow-hidden z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-3)]">
                      <h3 className="font-semibold text-[var(--color-text-primary)] text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-[0.65rem] font-medium text-[var(--color-primary-light)] hover:text-white transition-colors flex items-center gap-1">
                          {Icons.check} Mark all read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                          You're all caught up!
                        </div>
                      ) : (
                        <div className="divide-y divide-[var(--color-border)]">
                          {notifications.map((notif) => (
                            <div key={notif.id} className={`p-4 flex gap-3 hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer ${notif.unread ? 'bg-[var(--color-primary-glow)]/10' : ''}`}>
                              <div className="shrink-0 mt-1">
                                {notif.type === 'system' ? (
                                  <div className="w-8 h-8 rounded-full bg-[var(--color-surface-1)] flex items-center justify-center border border-[var(--color-border)]">
                                    {getNotifIcon(notif.type)}
                                  </div>
                                ) : (
                                  <Avatar name={notif.user} size="sm" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                                  <span className="font-semibold">{notif.user}</span> {notif.action} <span className="font-medium text-[var(--color-primary-light)]">{notif.target}</span>
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center gap-1.5">
                                  {getNotifIcon(notif.type)} {notif.time}
                                </p>
                              </div>
                              {notif.unread && (
                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0 mt-2" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-2 border-t border-[var(--color-border)] bg-[var(--color-surface-3)]">
                      <Button variant="ghost" size="sm" fullWidth className="text-xs">View all notifications</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <Avatar name={user?.name || 'User'} size="sm" className="cursor-pointer hover:ring-2 ring-[var(--color-primary-glow)] transition-all" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/register"><Button variant="primary" size="sm">Get Started</Button></Link>
          </div>
        )}
      </div>
    </header>
  );
}
