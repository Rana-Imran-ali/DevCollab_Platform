import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Workspace = () => {
  const [activeTab, setActiveTab] = useState('App.jsx');
  const [chatInput, setChatInput] = useState('');

  // Dummy file structure
  const files = [
    { name: 'src', type: 'folder', isOpen: true, children: [
        { name: 'components', type: 'folder', isOpen: false },
        { name: 'pages', type: 'folder', isOpen: true, children: [
            { name: 'Home.jsx', type: 'file' },
            { name: 'Workspace.jsx', type: 'file', active: true },
        ]},
        { name: 'App.jsx', type: 'file' },
        { name: 'index.css', type: 'file' },
    ]},
    { name: 'package.json', type: 'file' },
    { name: 'readme.md', type: 'file' },
  ];

  // Dummy code content
  const codeContent = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function WorkspaceEditor() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Real-time synchronization logic
  const handleCodeChange = (newCode) => {
    socket.emit('code-sync', {
      file: 'App.jsx',
      content: newCode,
      timestamp: Date.now()
    });
  };

  return (
    <div className="editor-container w-full h-full">
      <MonacoEditor 
        language="javascript"
        theme="vs-dark"
        options={{ autominmap: true }}
      />
    </div>
  );
}`;

  return (
    <div className="h-screen w-full flex flex-col bg-[#0A0A0A] text-white overflow-hidden font-sans">
      {/* Workspace Top Navbar */}
      <header className="h-12 bg-[#111111] border-b border-[#222222] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4 text-sm">
          <Link to="/projects" className="text-[#888888] hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>
          <div className="h-4 w-px bg-[#333333]"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-medium">E-commerce Overhaul</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
             <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#111111] bg-blue-500 z-30 ring-2 ring-[#FFD700]">AM</div>
             <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#111111] bg-purple-500 z-20">JD</div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs py-0">Run</Button>
          <Button variant="primary" size="sm" className="h-8 text-xs py-0 border-none shadow-[0_0_15px_rgba(255,215,0,0.2)]">Deploy</Button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#222222]">
        
        {/* LEFT: File Explorer Sidebar */}
        <aside className="w-full md:w-64 bg-[#0A0A0A] flex flex-col shrink-0 h-48 md:h-full">
           <div className="px-4 py-3 border-b border-[#1A1A1A] text-xs font-bold uppercase tracking-wider text-[#888888] flex justify-between items-center">
             Explorer
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-white"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
           </div>
           <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-0.5 mt-1">
                 {/* Recursive rendering mockup */}
                 <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-[#CCCCCC] hover:bg-[#1A1A1A] rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>src</span>
                 </div>
                 
                 <div className="ml-6 space-y-0.5">
                    <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-[#CCCCCC] hover:bg-[#1A1A1A] rounded cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-90"><path d="m6 9 6 6 6-6"/></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                      <span>components</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-[#CCCCCC] hover:bg-[#1A1A1A] rounded cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                      <span>pages</span>
                    </div>
                    
                    <div className="ml-6 space-y-0.5">
                       <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-[#CCCCCC] hover:bg-[#1A1A1A] rounded cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#519aba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          <span>Home.jsx</span>
                       </div>
                       <div className="flex items-center gap-1.5 px-2 py-1 text-sm bg-[#FFD700]/10 text-[#FFD700] rounded cursor-pointer border border-[#FFD700]/20">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          <span>Workspace.jsx</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-1.5 px-2 py-1 text-sm text-[#CCCCCC] hover:bg-[#1A1A1A] rounded cursor-pointer mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e34f26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span>package.json</span>
                 </div>
              </div>
           </div>
        </aside>

        {/* CENTER: Editor UI */}
        <main className="flex-1 bg-[#111111] flex flex-col min-w-0">
           {/* Editor Tabs */}
           <div className="flex overflow-x-auto bg-[#0A0A0A] border-b border-[#222222] shrink-0 custom-scrollbar">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] border-r border-[#222222] text-sm text-white min-w-[120px] cursor-pointer border-t-[3px] border-t-[#FFD700]">
                 <span className="flex-1 truncate">Workspace.jsx</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#888888] hover:text-red-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] border-r border-[#222222] text-sm text-[#888888] hover:bg-[#111111] transition-colors min-w-[120px] cursor-pointer">
                 <span className="flex-1 truncate">App.jsx</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
           </div>
           
           {/* Code View */}
           <div className="flex-1 overflow-auto bg-[#111111] p-4 font-mono text-sm leading-relaxed relative">
              <div className="absolute top-2 right-4 flex items-center gap-2">
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Alex is typing...
                 </div>
              </div>
              <div className="flex">
                 <div className="w-10 shrink-0 text-[#555555] text-right pr-4 select-none border-r border-[#222222] mr-4 pt-1">
                    {codeContent.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                 </div>
                 <pre className="text-[#CCCCCC] flex-1 outline-none pt-1">
                    <code>
                       <span className="text-purple-400">import</span> React, {'{'} useState {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;<br/>
                       <span className="text-purple-400">import</span> {'{'} motion {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span>;<br/>
                       <span className="text-purple-400">import</span> Button <span className="text-purple-400">from</span> <span className="text-green-400">'../ui/Button'</span>;<br/>
                       <br/>
                       <span className="text-purple-400">export default function</span> <span className="text-blue-400">WorkspaceEditor</span>() {'{'}<br/>
                       &nbsp;&nbsp;<span className="text-purple-400">const</span> [isEditing, setIsEditing] = <span className="text-yellow-200">useState</span>(<span className="text-[#FFA500]">false</span>);<br/>
                       <br/>
                       &nbsp;&nbsp;<span className="text-[#888888] italic">// Real-time synchronization logic</span><br/>
                       &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-400">handleCodeChange</span> = (newCode) {`=>`} {'{'}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;socket.<span className="text-yellow-200">emit</span>(<span className="text-green-400">'code-sync'</span>, {'{'}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file: <span className="text-green-400">'App.jsx'</span>,<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: newCode,<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timestamp: <span className="text-[#FFD700]">Date</span>.<span className="text-yellow-200">now</span>()<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;{'}'});<br/>
                       &nbsp;&nbsp;{'}'};<br/>
                       <br/>
                       &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;{`<`}<span className="text-blue-400">div</span> <span className="text-blue-300">className</span>=<span className="text-green-400">"editor-container w-full h-full"</span>{`>`}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<`}<span className="text-[#FFD700]">MonacoEditor</span> <br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">language</span>=<span className="text-green-400">"javascript"</span><br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">theme</span>=<span className="text-green-400">"vs-dark"</span><br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">options</span>={'{'}{'{'} autominmap: <span className="text-[#FFA500]">true</span> {'}'}{'}'}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`/>`}<br/>
                       &nbsp;&nbsp;&nbsp;&nbsp;{`</`}<span className="text-blue-400">div</span>{`>`}<br/>
                       &nbsp;&nbsp;);<br/>
                       {'}'}
                    </code>
                 </pre>
              </div>
           </div>
        </main>

        {/* RIGHT: Collaboration / Chat Panel */}
        <aside className="w-full md:w-[320px] bg-[#0A0A0A] flex flex-col shrink-0 h-96 md:h-full">
           {/* Panel Header */}
           <div className="flex border-b border-[#222222]">
              <div className="flex-1 py-3 text-center text-sm font-bold text-white border-b-2 border-[#FFD700] cursor-pointer">Team Chat</div>
              <div className="flex-1 py-3 text-center text-sm font-medium text-[#888888] cursor-pointer hover:text-white transition-colors">Commits</div>
           </div>
           
           {/* Chat Messages */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded shrink-0 bg-blue-500/20 text-blue-500 flex flex-col items-center justify-center font-bold text-xs border border-blue-500/30 font-display">AM</div>
                 <div>
                    <div className="flex items-baseline gap-2">
                       <span className="font-bold text-sm text-white">Alex Morgan</span>
                       <span className="text-[10px] text-[#555555]">10:42 AM</span>
                    </div>
                    <p className="text-sm text-[#CCCCCC] mt-0.5">I've just structured the React Monaco component wrapper. Take a look at line 14.</p>
                 </div>
              </div>
              
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded shrink-0 bg-purple-500/20 text-purple-400 flex flex-col items-center justify-center font-bold text-xs border border-purple-500/30 font-display">JD</div>
                 <div>
                    <div className="flex items-baseline gap-2">
                       <span className="font-bold text-sm text-white">John Doe</span>
                       <span className="text-[10px] text-[#555555]">10:45 AM</span>
                    </div>
                    <p className="text-sm text-[#CCCCCC] mt-0.5">Looking good. Just ensure that the emission debounces properly so we don't flood the socket.</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 my-2">
                 <div className="h-px bg-[#222222] flex-1"></div>
                 <span className="text-xs text-[#555555] font-medium uppercase">New Messages</span>
                 <div className="h-px bg-[#222222] flex-1"></div>
              </div>
           </div>

           {/* Chat Input */}
           <div className="p-4 border-t border-[#222222] bg-[#111111]">
              <div className="relative flex items-end bg-[#1A1A1A] border border-[#333333] rounded-lg focus-within:border-[#FFD700] focus-within:ring-1 focus-within:ring-[#FFD700] transition-colors p-1">
                 <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message team..."
                    className="w-full bg-transparent text-sm text-white px-3 py-2 outline-none resize-none max-h-32 min-h-[40px] placeholder:text-[#555555]"
                    rows={1}
                 />
                 <button className="p-2 text-[#888888] hover:text-[#FFD700] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                 </button>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default Workspace;
