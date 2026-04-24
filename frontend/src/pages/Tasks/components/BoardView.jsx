import React from 'react';
import { motion } from 'framer-motion';

const priorityStyles = {
  high:   'bg-red-500/10 text-red-400 border border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  low:    'bg-green-500/10 text-green-400 border border-green-500/20',
};

const BoardView = ({ columns }) => {
  return (
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
  );
};

export default BoardView;
