import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  hash: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  attach: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  smile: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  code: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  file: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const CHANNELS = [
  { id: 'c1', name: 'general', unread: 0 },
  { id: 'c2', name: 'frontend-dev', unread: 3 },
  { id: 'c3', name: 'api-layer', unread: 0 },
  { id: 'c4', name: 'design-system', unread: 5 },
];

const DIRECT_MESSAGES = [
  { id: 'u1', name: 'Sarah Chen', status: 'online', isTyping: false },
  { id: 'u2', name: 'Alex Rivera', status: 'offline', isTyping: true },
  { id: 'u3', name: 'Marcus Doe', status: 'busy', isTyping: false },
  { id: 'u4', name: 'Emily Wong', status: 'online', isTyping: false },
];

const MESSAGES = [
  {
    id: 1,
    user: 'Sarah Chen',
    time: 'Today at 10:42 AM',
    content: 'Did anyone check the recent PR for the authentication rewrite?',
    reactions: [{ emoji: '👀', count: 2, self: true }],
  },
  {
    id: 2,
    user: 'Marcus Doe',
    time: 'Today at 10:45 AM',
    content: 'Yes, looking at it now. The token parsing logic seems much cleaner.',
    reactions: [],
  },
  {
    id: 3,
    user: 'You',
    time: 'Today at 10:46 AM',
    content: 'I extracted the parsing rules into the new utility hook so we can easily mock it in Jest. Here is the snippet:',
    type: 'code',
    code: `export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}`,
    language: 'javascript',
    reactions: [{ emoji: '🚀', count: 3, self: false }],
  },
  {
    id: 4,
    user: 'Sarah Chen',
    time: 'Today at 10:48 AM',
    content: 'That makes perfect sense. Merging it momentarily!',
    reactions: [{ emoji: '🔥', count: 1, self: true }, { emoji: '💯', count: 1, self: false }],
  },
  {
    id: 5,
    user: 'Alex Rivera',
    time: 'Today at 10:50 AM',
    content: 'Awesome. Btw, I finished the new design system guidelines document. Could you both review it?',
    type: 'file',
    fileName: 'design-guidelines-v2.pdf',
    fileSize: '2.4 MB',
    reactions: [],
  },
];

export default function Chat() {
  const [activeChannel, setActiveChannel] = useState('c1');
  const [messageInput, setMessageInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const scrollRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const activeChannelName = CHANNELS.find(c => c.id === activeChannel)?.name || DIRECT_MESSAGES.find(u => u.id === activeChannel)?.name;
  const isDirectMessage = DIRECT_MESSAGES.some(u => u.id === activeChannel);

  return (
    <div className="h-[calc(100vh-6rem)] animate-fade-in flex bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] relative">
      
      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── LEFT SIDEBAR: Channels & Users ── */}
      <aside className={`
        absolute md:relative z-50 h-full w-64 bg-[var(--color-surface-2)] border-r border-[var(--color-border)] flex flex-col shrink-0 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 px-4 border-b border-[var(--color-border)] flex items-center justify-between shrink-0 bg-[var(--color-surface-2)] shadow-sm z-10">
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-wide">DevCollab Team</h2>
          <button className="md:hidden text-[var(--color-text-muted)] p-1" onClick={() => setIsSidebarOpen(false)}>
            {Icons.plus} {/* We can use plus rotated as close, or just rely on backdrop click */}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-6">
          {/* Channels */}
          <div>
            <div className="px-4 flex items-center justify-between mb-2 group">
              <h3 className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Project Channels</h3>
              <button className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--color-text-primary)] transition-all">
                {Icons.plus}
              </button>
            </div>
            <div className="space-y-0.5 px-2">
              {CHANNELS.map(channel => {
                const isActive = activeChannel === channel.id;
                return (
                  <button 
                    key={channel.id}
                    onClick={() => { setActiveChannel(channel.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[var(--color-primary-glow)] text-[var(--color-primary-light)]' 
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`opacity-60 ${isActive ? 'text-[var(--color-primary)]' : ''}`}>{Icons.hash}</span>
                      <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <span className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-border-strong)] text-[var(--color-text-primary)]'
                      }`}>
                        {channel.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <div className="px-4 flex items-center justify-between mb-2 group">
              <h3 className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Direct Messages</h3>
              <button className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--color-text-primary)] transition-all">
                {Icons.plus}
              </button>
            </div>
            <div className="space-y-0.5 px-2">
              {DIRECT_MESSAGES.map(user => {
                const isActive = activeChannel === user.id;
                return (
                  <button 
                    key={user.id}
                    onClick={() => { setActiveChannel(user.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[var(--color-primary-glow)] text-[var(--color-primary-light)]' 
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <Avatar name={user.name} size="xs" status={user.status} />
                    <span className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>{user.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT CHAT WINDOW ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface-1)] z-10 relative">
        
        {/* Chat Header */}
        <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[var(--color-surface-1)]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-[var(--color-text-secondary)] p-1 -ml-2" onClick={() => setIsSidebarOpen(true)}>
              {Icons.menu}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-text-muted)]">{isDirectMessage ? <Avatar name={activeChannelName} size="xs" /> : Icons.hash}</span>
              <h2 className="font-bold text-lg text-[var(--color-text-primary)]">{activeChannelName}</h2>
            </div>
          </div>
          
          {!isDirectMessage && (
            <div className="hidden sm:flex items-center -space-x-2">
              <Avatar name="Sarah Chen" size="sm" className="ring-2 ring-[var(--color-surface-1)]" />
              <Avatar name="Marcus Doe" size="sm" className="ring-2 ring-[var(--color-surface-1)]" />
              <Avatar name="You" size="sm" className="ring-2 ring-[var(--color-surface-1)]" />
            </div>
          )}
        </header>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide">
          {MESSAGES.map(msg => {
            const isSelf = msg.user === 'You';
            return (
              <div key={msg.id} className={`flex gap-4 group ${isSelf ? 'flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <Avatar name={msg.user} size="md" className="mt-1 shadow-sm" />
                
                {/* Content Area */}
                <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isSelf ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-baseline gap-2 mb-1.5 px-1 ${isSelf ? 'flex-row-reverse' : ''}`}>
                    <span className="font-semibold text-sm text-[var(--color-text-primary)]">{msg.user}</span>
                    <span className="text-[0.65rem] text-[var(--color-text-muted)] font-medium">{msg.time}</span>
                  </div>
                  
                  {/* Standard Message */}
                  {!msg.type && (
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isSelf 
                        ? 'bg-[var(--color-primary)] text-white rounded-tr-[4px] shadow-sm' 
                        : 'bg-[var(--color-surface-3)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-tl-[4px]'
                    }`}>
                      {msg.content}
                    </div>
                  )}

                  {/* Code Snippet */}
                  {msg.type === 'code' && (
                    <div className="w-full max-w-xl">
                      <div className={`px-4 py-2 text-sm leading-relaxed mb-1 ${isSelf ? 'text-right text-[var(--color-text-primary)]' : 'text-left text-[var(--color-text-primary)]'}`}>
                        {msg.content}
                      </div>
                      <div className="rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[#0D0D1A] shadow-md">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#161628] border-b border-[var(--color-border)]">
                          <span className="text-xs font-mono text-[var(--color-text-muted)]">{msg.language}</span>
                          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                            {Icons.code}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
                          <code>{msg.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* File Attachment */}
                  {msg.type === 'file' && (
                    <div className="w-full">
                      <div className={`px-4 py-2 text-sm leading-relaxed mb-1 ${isSelf ? 'text-right text-[var(--color-text-primary)]' : 'text-left text-[var(--color-text-primary)]'}`}>
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] hover:border-[var(--color-border-focus)] transition-colors cursor-pointer w-fit shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary-light)] shrink-0">
                          {Icons.file}
                        </div>
                        <div className="pr-4">
                          <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate max-w-[200px]">{msg.fileName}</p>
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{msg.fileSize} • PDF</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`flex items-center gap-1.5 mt-1.5 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                      {msg.reactions.map((r, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer transition-colors border
                            ${r.self 
                              ? 'bg-[var(--color-primary-glow)] border-[var(--color-primary-light)] text-[var(--color-primary-light)]' 
                              : 'bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)]'
                            }
                          `}
                        >
                          <span>{r.emoji}</span>
                          <span>{r.count}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {DIRECT_MESSAGES.some(u => u.isTyping && u.id === activeChannel) && (
            <div className="flex gap-4 items-center animate-fade-in">
              <Avatar name={activeChannelName} size="md" className="mt-1" />
              <div className="bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-2xl rounded-tl-[4px] px-4 py-3 flex items-center gap-1.5 shadow-sm w-fit">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* ── Input Bar ── */}
        <div className="p-4 sm:p-6 pt-2 bg-[var(--color-surface-1)] shrink-0">
          <div className="relative flex items-center bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-xl focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-glow)] transition-all shadow-sm">
            
            <button className="pl-4 pr-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border)]">
                {Icons.plus}
              </div>
            </button>
            
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${isDirectMessage ? '@' : '#'}${activeChannelName}`}
              className="w-full bg-transparent text-sm text-[var(--color-text-primary)] py-4 outline-none placeholder:text-[var(--color-text-muted)]"
            />
            
            <div className="pr-2 flex items-center gap-1">
              <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hidden sm:block">
                {Icons.smile}
              </button>
              <button className={`p-2 rounded-lg transition-colors flex items-center justify-center
                ${messageInput ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--color-text-disabled)] bg-transparent cursor-not-allowed'}
              `}>
                {Icons.send}
              </button>
            </div>
          </div>
          
          <div className="hidden sm:flex justify-between items-center px-2 mt-2">
            <p className="text-[0.65rem] font-medium text-[var(--color-text-muted)]">
              <span className="font-bold text-[var(--color-text-secondary)]">Enter</span> to send, <span className="font-bold text-[var(--color-text-secondary)]">Shift + Enter</span> to add a new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
