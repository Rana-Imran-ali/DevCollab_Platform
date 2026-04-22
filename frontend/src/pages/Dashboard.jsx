const Dashboard = () => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="heading-lg text-white mb-1">Overview</h1>
          <p className="text-[#888888] text-sm">Welcome back! Here's what's happening with your projects today.</p>
        </div>
        <button className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card card-hover">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#FFD700]/10 rounded-lg text-[#FFD700]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <span className="badge badge-green">+12%</span>
           </div>
           <h3 className="text-[#888888] font-medium text-sm mb-1 text-transform: uppercase">Tasks Completed</h3>
           <p className="text-3xl font-display font-bold text-white">142</p>
        </div>
        
        <div className="card card-hover">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <span className="badge badge-red">-2%</span>
           </div>
           <h3 className="text-[#888888] font-medium text-sm mb-1 text-transform: uppercase">Open Issues</h3>
           <p className="text-3xl font-display font-bold text-white">28</p>
        </div>

        <div className="card card-hover">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>
              <span className="badge badge-gray">Neutral</span>
           </div>
           <h3 className="text-[#888888] font-medium text-sm mb-1 text-transform: uppercase">Team Members</h3>
           <p className="text-3xl font-display font-bold text-white">12</p>
        </div>

        <div className="card card-hover relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 bg-[#FFD700] rounded-lg text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
           </div>
           <h3 className="text-[#FFD700] font-medium text-sm mb-1 text-transform: uppercase relative z-10">Pro Plan</h3>
           <p className="text-3xl font-display font-bold text-white relative z-10">Active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
           <div className="card h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="heading-md">Active Projects</h2>
                <button className="text-sm text-[#FFD700] hover:underline font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
                {[
                    {name: 'E-commerce Redesign', status: 'In Progress', progress: 68, color: 'bg-blue-500'},
                    {name: 'API V2 Refactoring', status: 'In Review', progress: 85, color: 'bg-purple-500'},
                    {name: 'Mobile App Beta CI/CD', status: 'Planning', progress: 12, color: 'bg-[#FFD700]'},
                    {name: 'Marketing Landing Page', status: 'Completed', progress: 100, color: 'bg-green-500'},
                ].map((item, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-xl bg-[#1A1A1A] border border-[#222222] hover:border-[#3A3A3A] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4 w-1/2">
                            <div className={`w-2 h-10 rounded-full ${item.color}`}></div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-[#FFD700] transition-colors">{item.name}</h4>
                                <p className="text-xs text-[#888888]">{item.status}</p>
                            </div>
                        </div>
                        <div className="w-1/3 flex items-center gap-3">
                            <div className="flex-1 h-2 bg-[#222222] rounded-full overflow-hidden">
                                <div className={`h-full ${item.color}`} style={{width: `${item.progress}%`}}></div>
                            </div>
                            <span className="text-xs font-bold text-[#888888] w-8">{item.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-1">
           <div className="card h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="heading-md">Recent Activity</h2>
                </div>
                
                <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-[#333333]">
                    {[
                        {user: 'Sarah M.', action: 'pushed to', target: 'main', time: '10 min ago', initial: 'SM'},
                        {user: 'Alex D.', action: 'completed task', target: 'Update Auth Flow', time: '1 hr ago', initial: 'AD'},
                        {user: 'You', action: 'created project', target: 'Mobile App v2', time: '3 hrs ago', initial: 'YO'},
                        {user: 'John K.', action: 'commented on', target: 'API Issue #42', time: '5 hrs ago', initial: 'JK'},
                    ].map((activity, i) => (
                        <div key={i} className="relative">
                            <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#222222] border-2 border-[#111111] flex items-center justify-center text-[10px] font-bold z-10 text-white">
                                {activity.initial}
                            </div>
                            <p className="text-sm">
                                <span className="font-bold text-white">{activity.user}</span>{' '}
                                <span className="text-[#888888]">{activity.action}</span>{' '}
                                <span className="font-medium text-[#FFD700] cursor-pointer hover:underline">{activity.target}</span>
                            </p>
                            <p className="text-xs text-[#555555] mt-1">{activity.time}</p>
                        </div>
                    ))}
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
