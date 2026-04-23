import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Dashboard = () => {
  // Mock data for UI demonstrations
  const stats = [
    { label: 'Tasks Completed', value: '142', change: '+12%', changeType: 'positive', icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> },
    { label: 'Open Issues', value: '28', change: '-2%', changeType: 'positive', icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></> },
    { label: 'Active Projects', value: '12', change: '0', changeType: 'neutral', icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></> },
  ];

  const projects = [
    { name: 'E-commerce Redesign', status: 'In Progress', progress: 68, color: 'bg-blue-500' },
    { name: 'API V2 Refactoring', status: 'In Review', progress: 85, color: 'bg-purple-500' },
    { name: 'Mobile App Beta CI/CD', status: 'Planning', progress: 12, color: 'bg-[#FFD700]' },
    { name: 'Marketing Landing Page', status: 'Completed', progress: 100, color: 'bg-green-500' },
  ];

  const activities = [
    { user: 'Sarah M.', action: 'pushed to', target: 'main', time: '10 min ago', initials: 'SM' },
    { user: 'Alex D.', action: 'completed task', target: 'Update Auth Flow', time: '1 hr ago', initials: 'AD' },
    { user: 'You', action: 'created project', target: 'Mobile App v2', time: '3 hrs ago', initials: 'JD' },
    { user: 'John K.', action: 'commented on', target: 'API Issue #42', time: '5 hrs ago', initials: 'JK' },
  ];

  return (
    <div className="pb-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">Overview</h1>
          <p className="text-[#888888] text-sm">Here's what's happening with your projects today.</p>
        </div>
        <Button variant="primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} hoverable className="bg-[#1A1A1A] border-[#222222]">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-[#222222] rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {stat.icon}
                  </svg>
              </div>
              {stat.changeType !== 'neutral' && (
                <span className={`badge ${stat.changeType === 'positive' ? 'badge-green' : 'badge-red'}`}>
                  {stat.change}
                </span>
              )}
           </div>
           <h3 className="text-[#888888] font-medium text-xs mb-1 uppercase tracking-wider">{stat.label}</h3>
           <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
          </Card>
        ))}

        {/* Pro Plan Banner Card */}
        <Card hoverable className="relative overflow-hidden group bg-[#111111] border-[#FFD700]/30 border shadow-[0_0_15px_rgba(255,215,0,0.1)]">
           <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 bg-[#FFD700] rounded-lg text-black shadow-glow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
           </div>
           <h3 className="text-[#FFD700] font-medium text-xs mb-1 uppercase tracking-wider relative z-10">Current Plan</h3>
           <p className="text-3xl font-display font-bold text-white relative z-10">Pro Active</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects List */}
        <div className="lg:col-span-2 flex flex-col">
           <Card className="flex-1 bg-[#1A1A1A] border-[#222222]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-bold text-lg text-white">Active Projects</h2>
                <button className="text-sm text-[#FFD700] hover:text-[#FFE033] hover:underline font-medium transition-colors">
                  View All
                </button>
            </div>
            
            <div className="space-y-4">
                {projects.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.01 }}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#222222] border border-[#333333] hover:border-[#444444] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-4 w-full sm:w-1/2 mb-3 sm:mb-0">
                            <div className={`w-1.5 h-10 rounded-full ${item.color}`}></div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-[#FFD700] transition-colors">{item.name}</h4>
                                <p className="text-xs text-[#888888]">{item.status}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-1/3">
                            <div className="flex-1 h-2 bg-[#333333] rounded-full overflow-hidden shrink-0">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.progress}%` }}
                                  transition={{ duration: 1, ease: 'easeOut' }}
                                  className={`h-full ${item.color}`} 
                                />
                            </div>
                            <span className="text-xs font-bold text-[#888888] w-8 shrink-0">{item.progress}%</span>
                            <div className="text-[#555555] group-hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/10 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
           </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="col-span-1 flex flex-col">
           <Card className="flex-1 bg-[#1A1A1A] border-[#222222]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display font-bold text-lg text-white">Activity List</h2>
                </div>
                
                <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-[#333333]">
                    {activities.map((activity, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#111111] border-2 border-[#333333] group-hover:border-[#FFD700] flex items-center justify-center text-[10px] font-bold z-10 text-white transition-colors">
                                {activity.initials}
                            </div>
                            <div className="bg-[#222222] group-hover:bg-[#2A2A2A] rounded-lg p-3 transition-colors border border-transparent group-hover:border-[#333333]">
                                <p className="text-sm leading-relaxed">
                                    <span className="font-bold text-white">{activity.user}</span>{' '}
                                    <span className="text-[#888888]">{activity.action}</span>{' '}
                                    <span className="font-medium text-[#FFD700] cursor-pointer hover:underline">{activity.target}</span>
                                </p>
                                <p className="text-xs text-[#555555] mt-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
