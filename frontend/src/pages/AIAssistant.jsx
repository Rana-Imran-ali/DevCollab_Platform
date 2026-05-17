import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  bot: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  attach: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  copy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  history: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  newChat: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const HISTORY = [
  { id: 'h1', title: 'Refactor AuthContext' },
  { id: 'h2', title: 'Review Payment Gateway PR' },
  { id: 'h3', title: 'Explain Framer Motion layoutId' },
  { id: 'h4', title: 'Optimize Dockerfile' },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'user',
    content: 'Can you review this code snippet? I am trying to implement a protected route in React Router but it seems to flash the dashboard before redirecting to login.',
  },
  {
    id: 2,
    role: 'assistant',
    content: `The flashing issue occurs because your \`AuthContext\` might be initializing with a \`null\` or \`loading\` state, and your Protected Route isn't waiting for the auth check to finish before rendering the children.

Here is the recommended way to handle this by adding an \`isLoading\` state to your context:`,
    type: 'code',
    language: 'jsx',
    code: `export const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Show a spinner or nothing while checking session
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};`
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  
  const scrollRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add User message
    const newMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate AI typing / streaming response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, role: 'assistant', content: 'I am analyzing your request. Give me a moment...', isStreaming: true }
      ]);
      
      setTimeout(() => {
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, content: 'Based on your architecture, here is the optimal solution for your request. It ensures type safety and prevents unnecessary re-renders.', isStreaming: false }
          ];
        });
      }, 1500);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

      {/* ── LEFT SIDEBAR: Chat History ── */}
      <aside className={`
        absolute md:relative z-50 h-full w-64 bg-[var(--color-surface-2)] border-r border-[var(--color-border)] flex flex-col shrink-0 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] hover:border-[var(--color-primary)] text-[var(--color-text-primary)] transition-colors py-2.5 rounded-lg shadow-sm text-sm font-semibold">
            {Icons.newChat} New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <div className="px-4 flex items-center gap-2 mb-3 text-[var(--color-text-muted)]">
             {Icons.history} <span className="text-xs font-bold uppercase tracking-wider">Recent History</span>
          </div>
          <div className="space-y-0.5 px-2">
            {HISTORY.map(item => (
              <button 
                key={item.id}
                className="w-full flex items-center px-3 py-2.5 rounded-lg transition-colors text-left text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)] truncate"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary-light)]">
               {Icons.bot}
             </div>
             <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">DevCollab AI</h4>
                <p className="text-[0.65rem] text-[var(--color-text-muted)]">GPT-4 Turbo</p>
             </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT MAIN CHAT WINDOW ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface-1)] relative">
        
        {/* Header (Mobile only toggle) */}
        <header className="h-14 border-b border-[var(--color-border)] flex md:hidden items-center px-4 shrink-0 bg-[var(--color-surface-1)]/80 backdrop-blur-md z-10 sticky top-0">
          <button className="text-[var(--color-text-secondary)] p-1 -ml-2 mr-2" onClick={() => setIsSidebarOpen(true)}>
            {Icons.menu}
          </button>
          <h2 className="font-bold text-sm text-[var(--color-text-primary)]">DevCollab AI</h2>
        </header>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 scrollbar-hide">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {messages.map((msg, i) => {
              const isAI = msg.role === 'assistant';
              
              return (
                <div key={msg.id} className={`flex gap-4 sm:gap-6 ${isAI ? '' : 'flex-row-reverse'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${
                    isAI 
                      ? 'bg-gradient-to-br from-[var(--color-primary)] to-purple-600 text-white' 
                      : 'bg-[var(--color-surface-3)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
                  }`}>
                    {isAI ? Icons.bot : 'You'}
                  </div>
                  
                  {/* Content */}
                  <div className={`flex flex-col min-w-0 flex-1 ${isAI ? 'items-start' : 'items-end'}`}>
                    
                    <div className="text-[var(--color-text-primary)] text-[15px] leading-relaxed mb-3">
                      {msg.content}
                      {msg.isStreaming && (
                         <span className="inline-block w-2 h-4 bg-[var(--color-text-primary)] ml-1 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Code Block rendering */}
                    {msg.type === 'code' && (
                      <div className="w-full mt-2 rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[#0D0D1A] shadow-md group">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#161628] border-b border-[var(--color-border)]">
                          <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">{msg.language}</span>
                          <button 
                            onClick={() => handleCopy(msg.id, msg.code)}
                            className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors bg-[var(--color-surface-1)]/50 px-2 py-1 rounded"
                          >
                            {copiedId === msg.id ? (
                              <><span className="text-[var(--color-success)]">{Icons.check}</span> Copied</>
                            ) : (
                              <>{Icons.copy} Copy code</>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-sm font-mono text-blue-300 overflow-x-auto leading-relaxed">
                          <code>{msg.code}</code>
                        </pre>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Input Bar ── */}
        <div className="p-4 sm:p-6 pt-2 shrink-0 max-w-4xl mx-auto w-full">
          <div className="relative flex flex-col bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-2xl shadow-lg focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-glow)] transition-all">
            
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or paste code for review..."
              className="w-full bg-transparent text-[15px] text-[var(--color-text-primary)] p-4 pb-12 outline-none placeholder:text-[var(--color-text-muted)] resize-none min-h-[100px]"
            />
            
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors rounded-lg flex items-center justify-center">
                 {Icons.attach}
              </button>
              
              <button 
                onClick={handleSend}
                className={`p-2 rounded-xl transition-all flex items-center justify-center shadow-md
                  ${input.trim() ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]' : 'bg-[var(--color-surface-3)] text-[var(--color-text-disabled)] cursor-not-allowed'}
                `}
              >
                {Icons.send}
              </button>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-[0.65rem] text-[var(--color-text-muted)]">
              AI can make mistakes. Consider verifying important code suggestions.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
