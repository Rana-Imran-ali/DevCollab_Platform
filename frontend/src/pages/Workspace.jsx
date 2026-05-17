import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  project: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  task: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  collab: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ai: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  trendUp: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  activity: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: Icons.project, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Pending Tasks', value: '34', change: '-5', trend: 'down', icon: Icons.task, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Team Members', value: '8', change: '0', trend: 'neutral', icon: Icons.collab, color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary-glow)]' },
  { label: 'AI Code Reviews', value: '156', change: '+24', trend: 'up', icon: Icons.ai, color: 'text-[var(--color-success)]', bg: 'bg-[var(--color-success-muted)]' },
];

const RECENT_PROJECTS = [
  { id: 'p1', title: 'E-commerce Overhaul', progress: 65, status: 'In Progress', updated: '2h ago' },
  { id: 'p2', title: 'Payment Gateway V2', progress: 10, status: 'Planning', updated: '1d ago' },
  { id: 'p3', title: 'Mobile App Beta', progress: 90, status: 'In Review', updated: '3d ago' },
];

const COLLAB_INSIGHTS = [
  { id: 'i1', user: 'Sarah Chen', action: 'merged PR', target: '#42 Auth Fix', time: '1 hr ago' },
  { id: 'i2', user: 'Alex Rivera', action: 'commented on task', target: 'API Rate Limiting', time: '3 hrs ago' },
  { id: 'i3', user: 'Marcus Doe', action: 'completed', target: 'Design System V2', time: 'Yesterday' },
];

export default function Workspace() {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="animate-fade-in pb-12 max-w-[1400px] mx-auto space-y-8">
      
      {/* ── Welcome Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
            {getGreeting()}, <span className="text-[var(--color-primary-light)]">{user?.name || 'Developer'}</span>!
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1.5 text-sm">
            Here's what's happening across your workspace today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/tasks">
            <Button variant="outline" leftIcon={Icons.plus}>New Task</Button>
          </Link>
          <Link to="/projects">
            <Button variant="primary" leftIcon={Icons.plus}>New Project</Button>
          </Link>
        </div>
      </div>

      {/* ── Top Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 flex flex-col justify-between hover:border-[var(--color-primary-glow)] transition-colors h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                {stat.trend === 'up' && (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold text-[var(--color-success)] bg-[var(--color-success-muted)] px-2 py-1 rounded">
                    {Icons.trendUp} {stat.change}
                  </span>
                )}
                {stat.trend === 'down' && (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold text-[var(--color-danger)] bg-[var(--color-danger-muted)] px-2 py-1 rounded">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-display tracking-tight">{stat.value}</h3>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Projects & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Projects Summary */}
          <Card className="p-0 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface-2)]">
              <h2 className="heading-sm text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="text-[var(--color-primary)]">{Icons.project}</span>
                Active Projects
              </h2>
              <Link to="/projects" className="text-xs font-medium text-[var(--color-primary-light)] hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-[var(--color-border)] flex-1">
              {RECENT_PROJECTS.map(project => (
                <div key={project.id} className="p-6 hover:bg-[var(--color-surface-2)] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{project.title}</h3>
                      <Badge variant="secondary">{project.status}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">Last updated {project.updated}</p>
                  </div>
                  <div className="w-full sm:w-48 shrink-0">
                    <div className="flex justify-between text-[0.65rem] font-bold mb-1.5">
                      <span className="text-[var(--color-text-secondary)]">Progress</span>
                      <span className="text-[var(--color-text-primary)]">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-surface-3)] rounded-full overflow-hidden border border-[var(--color-border)]">
                      <div 
                        className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-1000" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/ai">
              <Card className="p-5 flex items-center gap-4 hover:border-[var(--color-primary-glow)] hover:bg-[var(--color-primary-glow)]/5 cursor-pointer transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  {Icons.ai}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-0.5">AI Code Assistant</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">Analyze code, debug, or chat.</p>
                </div>
              </Card>
            </Link>
            
            <Link to="/problems">
              <Card className="p-5 flex items-center gap-4 hover:border-[var(--color-primary-glow)] hover:bg-[var(--color-surface-2)] cursor-pointer transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-text-secondary)] shrink-0 group-hover:text-[var(--color-primary-light)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-0.5">Community Q&A</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">Ask the DevCollab community.</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Right Column: Activity Insights */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="p-0 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <h2 className="heading-sm text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="text-[var(--color-primary)]">{Icons.activity}</span>
                Collaboration Insights
              </h2>
            </div>
            
            <div className="p-6 flex-1 space-y-6 relative before:absolute before:inset-y-6 before:left-[39px] before:w-px before:bg-[var(--color-border-strong)]">
              {COLLAB_INSIGHTS.map((item) => (
                <div key={item.id} className="relative flex gap-4 group">
                  <div className="relative z-10 shrink-0">
                    <Avatar name={item.user} size="sm" className="ring-4 ring-[var(--color-surface-1)] shadow-sm" />
                  </div>
                  <div className="pt-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                      <span className="font-semibold text-[var(--color-text-primary)]">{item.user}</span>{' '}
                      <span className="text-[var(--color-text-secondary)]">{item.action}</span>{' '}
                      <span className="font-medium text-[var(--color-primary-light)] truncate block sm:inline">{item.target}</span>
                    </p>
                    <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-1 font-medium tracking-wide uppercase">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <Link to="/team">
                <Button variant="ghost" size="sm" fullWidth className="text-xs">View Full Activity Log</Button>
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
