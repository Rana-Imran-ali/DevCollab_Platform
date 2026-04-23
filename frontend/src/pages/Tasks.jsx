import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const Tasks = () => {
  const [activeView, setActiveView] = useState('board');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      id: 'todo', label: 'To Do', color: 'border-t-[#888888]',
      tasks: [
        { id: 1, title: 'Design new onboarding flow', priority: 'medium', assignee: 'SC', tag: 'Design' },
        { id: 2, title: 'Set up CI/CD pipeline for staging', priority: 'high', assignee: 'AR', tag: 'DevOps' },
        { id: 3, title: 'Write unit tests for auth module', priority: 'low', assignee: 'JD', tag: 'Testing' },
      ]
    },
    {
      id: 'inprogress', label: 'In Progress', color: 'border-t-blue-500',
      tasks: [
        { id: 4, title: 'API rate limiting implementation', priority: 'high', assignee: 'MD', tag: 'Backend' },
        { id: 5, title: 'Frontend state management refactor', priority: 'medium', assignee: 'JD', tag: 'Frontend' },
      ]
    },
    {
      id: 'review', label: 'In Review', color: 'border-t-purple-500',
      tasks: [
        { id: 6, title: 'Payment webhook handler', priority: 'high', assignee: 'SC', tag: 'Backend' },
      ]
    },
    {
      id: 'done', label: 'Done', color: 'border-t-green-500',
      tasks: [
        { id: 7, title: 'Upgrade to React 19', priority: 'medium', assignee: 'AR', tag: 'Frontend' },
        { id: 8, title: 'Fix double-submit bug on checkout', priority: 'low', assignee: 'JD', tag: 'Bug' },
      ]
    },
  ];

  const allTasks = columns.flatMap(c => c.tasks.map(t => ({ ...t, status: c.label })));
  const filteredListTasks = allTasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const priorityStyles = {
    high:   'bg-red-500/10 text-red-400 border border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    low:    'bg-green-500/10 text-green-400 border border-green-500/20',
  };

  const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

  return (
    <div className="pb-10 animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">Tasks & Issues</h1>
          <p className="text-[#888888] text-sm">Track and manage work across your projects.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-[#111111] border border-[#333333] rounded-lg p-1">
            <button
              onClick={() => setActiveView('board')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'board' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#888888] hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'list' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#888888] hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
          <Button variant="primary" onClick={() => setIsCreateOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Task
          </Button>
        </div>
      </div>

      {/* Board View */}
      {activeView === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 flex-1">
          {columns.map(col => (
            <div key={col.id} className="w-72 shrink-0 flex flex-col">
              <div className={`bg-[#111111] rounded-xl border border-[#222222] border-t-2 ${col.color} flex flex-col`}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#222222]">
                  <h3 className="font-bold text-sm text-white">{col.label}</h3>
                  <span className="text-xs font-bold bg-[#1A1A1A] text-[#888888] px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                </div>
                <div className="p-3 space-y-3 flex-1">
                  {col.tasks.map(task => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 cursor-pointer group hover:border-[#FFD700]/30 transition-colors shadow-sm"
                    >
                      <p className="text-sm font-medium text-white group-hover:text-[#FFD700] transition-colors leading-snug mb-3">{task.title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${priorityStyles[task.priority]}`}>{task.priority}</span>
                          <span className="text-[10px] text-[#888888] bg-[#222222] px-2 py-0.5 rounded">{task.tag}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center text-[9px] font-bold text-white">{task.assignee}</div>
                      </div>
                    </motion.div>
                  ))}
                  <button className="w-full px-3 py-2 rounded-lg border border-dashed border-[#333333] text-xs text-[#555555] hover:text-[#888888] hover:border-[#444444] transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div>
          <div className="mb-4 w-full md:w-80">
            <Input placeholder="Search tasks..." icon={SearchIcon} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} fullWidth />
          </div>
          <Card className="bg-[#111111] border-[#222222] p-0 overflow-hidden">
            <div className="divide-y divide-[#1A1A1A]">
              <div className="grid grid-cols-12 px-4 py-2 text-xs font-bold text-[#555555] uppercase tracking-wider">
                <div className="col-span-6">Task</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Assignee</div>
              </div>
              {filteredListTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-[#444444] group-hover:border-[#FFD700] transition-colors shrink-0"></div>
                    <span className="text-sm text-white group-hover:text-[#FFD700] transition-colors">{task.title}</span>
                    <span className="text-[10px] text-[#888888] bg-[#222222] px-2 py-0.5 rounded hidden sm:inline">{task.tag}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-[#888888]">{task.status}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${priorityStyles[task.priority]}`}>{task.priority}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center text-[9px] font-bold text-white">{task.assignee}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Task"
        footer={<><Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button variant="primary">Create Task</Button></>}
      >
        <div className="space-y-4">
          <Input label="Task Title" placeholder="e.g. Fix login redirect bug" fullWidth />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <select className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Assign To</label>
              <select className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3">
                <option>John Doe (You)</option>
                <option>Sarah Chen</option>
                <option>Alex Rivera</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3 min-h-[80px] resize-none placeholder:text-[#555555]" placeholder="Add more context..." />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
