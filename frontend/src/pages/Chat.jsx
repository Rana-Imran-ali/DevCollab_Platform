import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');

  const channels = [
    { id: 'general', name: 'general', unread: 0 },
    { id: 'frontend', name: 'frontend-dev', unread: 3 },
    { id: 'backend', name: 'api-layer', unread: 0 },
    { id: 'design', name: 'design-system', unread: 0 },
  ];

  const directMessages = [
    { id: 'u1', name: 'Sarah Chen', status: 'online', isTyping: false },
    { id: 'u2', name: 'Alex Rivera', status: 'offline', isTyping: true },
    { id: 'u3', name: 'Marcus Doe', status: 'online', isTyping: false },
    { id: 'u4', name: 'Emily Wong', status: 'busy', isTyping: false },
  ];

  const messages = [
    { id: 1, user: 'Sarah Chen', avatar: 'SC', color: 'bg-blue-500', time: '10:42 AM', content: 'Did anyone check the recent PR for the authentication rewrite?', isSelf: false },
    { id: 2, user: 'Marcus Doe', avatar: 'MD', color: 'bg-green-500', time: '10:45 AM', content: 'Yes, looking at it now. The token parsing logic seems much cleaner.', isSelf: false },
    { id: 3, user: 'You', avatar: 'JD', color: 'bg-[#FFD700]', time: '10:46 AM', content: 'I extracted the parsing rules into the new utility hook so we can easily mock it in Jest.', isSelf: true },
    { id: 4, user: 'Sarah Chen', avatar: 'SC', color: 'bg-blue-500', time: '10:48 AM', content: 'That makes perfect sense. Merging it momentarily! 🚀', isSelf: false },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-[#555555]';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in flex bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-2xl">
      {/* LEFT SIDEBAR: Channels & Users */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-[#222222] flex flex-col shrink-0 h-full">
        <div className="p-4 border-b border-[#222222]">
          <h2 className="font-display font-medium text-lg text-white">DevCollab Team</h2>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          {/* Channels list */}
          <div>
            <h3 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
              Channels
              <button className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </h3>
            <div className="space-y-0.5">
              {channels.map(channel => (
                <div 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${activeChannel === channel.id ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg opacity-70">#</span>
                    <span className="text-sm font-medium">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-[#FFD700] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Messages list */}
          <div>
            <h3 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
              Direct Messages
              <button className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </h3>
            <div className="space-y-0.5">
              {directMessages.map(user => (
                <div 
                  key={user.id}
                  onClick={() => setActiveChannel(user.id)}
                  className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition-colors ${activeChannel === user.id ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#CCCCCC] hover:bg-[#1A1A1A] hover:text-white'}`}
                >
                  <div className="relative mr-3">
                    <div className="w-5 h-5 rounded-md bg-[#222222] border border-[#333333] flex items-center justify-center text-[8px] font-bold">
                        {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0A] ${getStatusColor(user.status)}`}></div>
                  </div>
                  <span className="text-sm font-medium flex-1 truncate">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT CHAT WINDOW */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F0F0F]">
        {/* Chat Header */}
        <header className="h-16 border-b border-[#222222] flex items-center justify-between px-6 shrink-0 bg-[#0A0A0A]">
           <div className="flex items-center gap-2">
              <span className="text-xl text-[#888888] font-light">#</span>
              <h2 className="font-bold text-lg text-white">general</h2>
           </div>
           <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center bg-blue-500 text-white text-xs font-bold">SC</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center bg-green-500 text-white text-xs font-bold">MD</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center bg-[#FFD700] text-black text-xs font-bold">JD</div>
           </div>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
           {messages.map(msg => (
             <div key={msg.id} className={`flex gap-4 group ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
               {/* Avatar */}
               <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold font-display shadow-lg border border-black/20 ${msg.isSelf ? 'bg-[#FFD700] text-black' : msg.color + ' text-white'}`}>
                 {msg.avatar}
               </div>
               
               {/* Content */}
               <div className={`flex flex-col max-w-[75%] ${msg.isSelf ? 'items-end' : 'items-start'}`}>
                 <div className={`flex items-baseline gap-2 mb-1 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                    <span className="font-bold text-sm text-white">{msg.user}</span>
                    <span className="text-[10px] text-[#888888] font-medium">{msg.time}</span>
                 </div>
                 
                 <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isSelf 
                    ? 'bg-[#FFD700] text-black rounded-tr-none' 
                    : 'bg-[#1A1A1A] border border-[#222222] text-[#E0E0E0] rounded-tl-none'
                 }`}>
                    {msg.content}
                 </div>
               </div>
               
               {/* Action triggers on hover */}
               <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 self-center">
                  <div className="p-1.5 text-[#888888] hover:text-white hover:bg-[#222222] rounded cursor-pointer transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                  </div>
               </div>
             </div>
           ))}

           {/* Typing Indicator UI */}
           <div className="flex gap-4 items-center">
              <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold font-display shadow-lg border border-black/20 bg-purple-500 text-white">
                 AR
              </div>
              <div className="bg-[#1A1A1A] border border-[#222222] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-1.5 h-1.5 bg-[#888888] rounded-full animate-bounce"></div>
              </div>
           </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#0A0A0A] border-t border-[#222222] shrink-0">
          <div className="relative flex items-center bg-[#1A1A1A] border border-[#333333] rounded-xl focus-within:border-[#FFD700]/50 focus-within:ring-2 focus-within:ring-[#FFD700]/20 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <button className="pl-4 pr-2 text-[#888888] hover:text-[#FFD700] transition-colors rounded-l-xl">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </button>
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Message #general..."
              className="w-full bg-transparent text-[15px] text-white py-4 outline-none placeholder:text-[#555555]"
            />
            <div className="pr-2 pl-2 flex items-center gap-1">
               <button className="p-2 text-[#888888] hover:text-white transition-colors rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
               </button>
               <button className={`p-2 transition-colors rounded ${messageInput ? 'text-black bg-[#FFD700]' : 'text-[#555555] cursor-not-allowed'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
               </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-2 mt-2">
            <p className="text-[10px] text-[#555555]">
               <span className="font-bold">Return</span> to send, <span className="font-bold">Shift + Return</span> to add a new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
