import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  folder: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  activity: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, title: 'E-commerce Overhaul', status: 'In Progress', type: 'Frontend', lastUpdated: '2 hours ago', progress: 65, stack: ['React', 'Tailwind', 'Next.js'], members: ['Sarah Chen', 'Alex Johnson'] },
  { id: 2, title: 'Payment Gateway V2', status: 'Planning', type: 'Backend', lastUpdated: '1 day ago', progress: 10, stack: ['Node.js', 'Stripe API', 'Redis'], members: ['Alex Johnson', 'Michael Silva'] },
  { id: 3, title: 'Mobile App Beta', status: 'In Review', type: 'Mobile', lastUpdated: '3 days ago', progress: 90, stack: ['React Native', 'Firebase'], members: ['Sarah Chen'] },
  { id: 4, title: 'Marketing Landing Page', status: 'Completed', type: 'Frontend', lastUpdated: '1 week ago', progress: 100, stack: ['Vue', 'GSAP'], members: ['Emily Davis'] },
  { id: 5, title: 'User Analytics Service', status: 'In Progress', type: 'Data', lastUpdated: '4 hours ago', progress: 45, stack: ['Python', 'PostgreSQL', 'Docker'], members: ['Michael Silva', 'Alex Johnson'] },
];

const ANALYTICS = [
  { label: 'Active Projects', value: '4', change: '+1 this week' },
  { label: 'Tasks Completed', value: '142', change: '+24 this week' },
  { label: 'Team Velocity', value: '88%', change: 'On track' },
];

const ACTIVITY_TIMELINE = [
  { id: 1, user: 'Sarah Chen', action: 'moved task', target: 'Design System Update', to: 'Done', time: '10 mins ago' },
  { id: 2, user: 'Michael Silva', action: 'created project', target: 'User Analytics Service', to: null, time: '2 hours ago' },
  { id: 3, user: 'Alex Johnson', action: 'commented on', target: 'Payment Gateway V2', to: null, time: '5 hours ago' },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filters = ['All', 'In Progress', 'Planning', 'In Review', 'Completed'];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'text-[var(--color-primary-light)] bg-[var(--color-primary-glow)] border-[var(--color-primary)]';
      case 'Completed': return 'text-[var(--color-success)] bg-[var(--color-success-muted)] border-transparent';
      case 'Planning': return 'text-[var(--color-warning)] bg-[var(--color-warning-muted)] border-transparent';
      case 'In Review': return 'text-[var(--color-info)] bg-[var(--color-info-muted)] border-transparent';
      default: return 'text-[var(--color-text-muted)] bg-[var(--color-surface-3)] border-[var(--color-border)]';
    }
  };

  return (
    <div className="animate-fade-in pb-12 max-w-[1400px] mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="heading-lg text-[var(--color-text-primary)]">Projects Workspace</h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Manage your team's initiatives, track progress, and stay aligned.
          </p>
        </div>
        <Button variant="primary" leftIcon={Icons.plus} onClick={() => setIsCreateModalOpen(true)}>
          New Project
        </Button>
      </div>

      {/* ── Analytics Overview ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ANALYTICS.map((stat, i) => (
          <Card key={i} className="p-5 flex flex-col justify-between hover:border-[var(--color-primary-glow)] transition-colors">
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="heading-lg text-[var(--color-primary-light)]">{stat.value}</span>
              <span className="text-xs font-medium text-[var(--color-success)]">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ── LEFT: Projects List ── */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--color-surface-2)] p-3 rounded-xl border border-[var(--color-border)]">
            <div className="w-full md:w-72">
              <Input 
                placeholder="Search projects..." 
                leftIcon={Icons.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--color-surface-1)]"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${
                    activeFilter === filter 
                      ? 'bg-[var(--color-primary)] text-white border-transparent shadow-sm' 
                      : 'bg-[var(--color-surface-1)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-[var(--color-surface-2)] rounded-xl border border-dashed border-[var(--color-border-strong)]">
              <div className="w-16 h-16 bg-[var(--color-surface-3)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-text-muted)]">
                {Icons.folder}
              </div>
              <h3 className="heading-sm text-[var(--color-text-primary)] mb-1">No projects found</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 h-full flex flex-col hover:border-[var(--color-primary-glow)] group transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[0.65rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider bg-[var(--color-surface-3)] px-2 py-0.5 rounded">
                        {project.type}
                      </span>
                      <span className={`text-[0.65rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <h3 className="heading-md text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-light)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5 mb-6">
                      {Icons.clock} Updated {project.lastUpdated}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-5 mt-auto">
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-[var(--color-text-secondary)]">Progress</span>
                        <span className="text-[var(--color-text-primary)]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${project.progress === 100 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-primary)]'}`} 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                      <div className="flex gap-1.5 flex-wrap">
                        {project.stack.slice(0,2).map(tech => (
                          <span key={tech} className="text-[0.65rem] text-[var(--color-text-secondary)] bg-[var(--color-surface-3)] px-2 py-1 rounded-md border border-[var(--color-border)]">
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 2 && (
                          <span className="text-[0.65rem] text-[var(--color-text-muted)] bg-[var(--color-surface-3)] px-2 py-1 rounded-md border border-[var(--color-border)]">
                            +{project.stack.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex -space-x-2">
                        {project.members.map((m, idx) => (
                          <Avatar key={idx} name={m} size="xs" className="ring-2 ring-[var(--color-surface-1)]" />
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Activity Timeline ── */}
        <div className="xl:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="heading-sm text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-primary-light)]">{Icons.activity}</span>
              Project Activity
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-[var(--color-border-strong)]">
              {ACTIVITY_TIMELINE.map((item) => (
                <div key={item.id} className="relative flex gap-4 group">
                  <div className="absolute -left-[5px] w-3 h-3 rounded-full bg-[var(--color-surface-2)] border-2 border-[var(--color-border-strong)] group-hover:border-[var(--color-primary)] z-10 transition-colors" />
                  <div className="pl-4 pt-0.5">
                    <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                      <span className="font-semibold text-[var(--color-primary-light)]">{item.user}</span>{' '}
                      <span className="text-[var(--color-text-secondary)]">{item.action}</span>{' '}
                      <span className="font-medium">{item.target}</span>
                      {item.to && <span className="text-[var(--color-text-secondary)]"> to <span className="font-medium text-[var(--color-text-primary)]">{item.to}</span></span>}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm" fullWidth className="mt-8">View all activity</Button>
          </Card>
        </div>

      </div>

      {/* ── Create Modal ── */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
        description="Set up a new workspace for your team's initiative."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Create Project</Button>
          </>
        }
      >
        <div className="space-y-4">
           <Input label="Project Name" placeholder="e.g. Acme Dashboard Rewrite" fullWidth />
           <Input as="textarea" label="Description" placeholder="Briefly describe what this project is about..." rows={3} fullWidth />
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                 <label className="form-label">Project Type</label>
                 <select className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-shadow">
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Fullstack</option>
                    <option>Mobile</option>
                 </select>
              </div>
              <Input label="Primary Tech" placeholder="e.g. React" fullWidth />
           </div>
        </div>
      </Modal>

    </div>
  );
}
