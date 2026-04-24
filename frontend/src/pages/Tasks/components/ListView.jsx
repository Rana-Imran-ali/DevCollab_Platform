import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../../components/ui/Card';

const priorityStyles = {
  high:   'bg-red-500/10 text-red-400 border border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  low:    'bg-green-500/10 text-green-400 border border-green-500/20',
};

const ListView = ({ filteredListTasks }) => {
  return (
    <Card className="bg-[#111111] border-[#222222] p-0 overflow-hidden mt-4">
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
  );
};

export default ListView;
