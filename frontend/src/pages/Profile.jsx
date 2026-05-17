import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

const MOCK_SKILLS = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL', 'Tailwind CSS'];

const STATS = [
  { label: 'Projects', value: '12' },
  { label: 'Tasks Done', value: '142' },
  { label: 'Commits', value: '834' },
  { label: 'Lines Added', value: '24K' },
];

const ACTIVITY = [
  { action: 'Merged PR', target: '#42 — Auth Refactor', time: '2 hours ago', icon: 'merge' },
  { action: 'Closed issue', target: '#88 — Fix login loop', time: '5 hours ago', icon: 'issue' },
  { action: 'Pushed to', target: 'main (3 commits)', time: '1 day ago', icon: 'commit' },
  { action: 'Reviewed', target: 'API Gateway PR', time: '2 days ago', icon: 'review' },
  { action: 'Created project', target: 'Mobile App v2', time: '3 days ago', icon: 'project' },
];

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  merge: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>,
  issue: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  commit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>,
  review: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  project: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
};

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState({
    name: user?.name || 'Alex Johnson',
    title: 'Senior Frontend Engineer',
    email: user?.email || 'alex.j@devcollab.com',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    github: 'alexj-dev',
    bio: 'Passionate frontend engineer with 7+ years building high-scale SaaS products. I love clean code, great UX, and collaborative teams.',
    skills: MOCK_SKILLS,
    availableForHire: true
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* ── Header Banner ── */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-20 bg-gradient-to-r from-[var(--color-surface-2)] to-[var(--color-surface-3)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20">
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-1)] to-transparent opacity-80" />
        
        {/* Avatar positioned halfway down the banner */}
        <div className="absolute -bottom-12 left-8 z-10 flex items-end gap-5">
          <div className="relative">
            <Avatar 
              name={form.name} 
              size="xl" 
              className="w-28 h-28 border-4 border-[var(--color-surface-1)] bg-[var(--color-surface-3)] shadow-[var(--shadow-lg)] text-2xl" 
              status="online" 
            />
          </div>
          <div className="mb-14">
            {form.availableForHire && (
              <Badge variant="success" dot className="shadow-lg backdrop-blur-md bg-[var(--color-success-muted)]">
                Available for Collab
              </Badge>
            )}
          </div>
        </div>

        {/* Action button */}
        <div className="absolute top-5 right-5 z-10">
          <Button
            variant={isEditing ? 'primary' : 'secondary'}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            isLoading={isSaving}
            leftIcon={
              !isEditing && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              )
            }
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── LEFT: Profile Details ── */}
        <div className="space-y-6">
          <Card className="p-6">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
                  <Input label="Job Title" name="title" value={form.title} onChange={handleChange} />
                  <Input label="Location" name="location" value={form.location} onChange={handleChange} />
                  <Input label="Website" name="website" value={form.website} onChange={handleChange} />
                  <Input label="GitHub Username" name="github" value={form.github} onChange={handleChange} />
                  <Input 
                    as="textarea" 
                    label="Bio" 
                    name="bio" 
                    value={form.bio} 
                    onChange={handleChange} 
                    rows={4} 
                  />
                  <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-[var(--color-border-strong)] bg-[var(--color-surface-3)] accent-indigo-500 cursor-pointer"
                      checked={form.availableForHire}
                      onChange={(e) => setForm({...form, availableForHire: e.target.checked})}
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">Available for Collaboration</span>
                  </label>
                </motion.div>
              ) : (
                <motion.div 
                  key="view"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="heading-md text-[var(--color-text-primary)]">{form.name}</h2>
                    <p className="text-[var(--color-primary-light)] font-medium text-sm mt-0.5">{form.title}</p>
                  </div>
                  
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{form.bio}</p>
                  
                  <div className="divider" />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <svg className="text-[var(--color-text-muted)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {form.location}
                    </div>
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <svg className="text-[var(--color-text-muted)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      {form.email}
                    </div>
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <svg className="text-[var(--color-text-muted)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      <a href={form.website} target="_blank" rel="noreferrer" className="text-[var(--color-primary-light)] hover:underline">{form.website.replace('https://', '')}</a>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <svg className="text-[var(--color-text-muted)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      <a href={`https://github.com/${form.github}`} target="_blank" rel="noreferrer" className="text-[var(--color-primary-light)] hover:underline">github.com/{form.github}</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-sm text-[var(--color-text-primary)]">Skills & Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              {isEditing && (
                <button className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-dashed border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary-light)] transition-colors">
                  + Add Skill
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* ── RIGHT: Stats + Activity ── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <Card key={i} className="p-5 text-center flex flex-col items-center justify-center hover:border-[var(--color-primary-glow)] transition-colors cursor-default">
                <p className="text-2xl font-display font-bold text-[var(--color-primary-light)]">{stat.value}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Contribution Heatmap (Mock) */}
          <Card className="p-6">
            <h3 className="heading-sm text-[var(--color-text-primary)] mb-4">Contributions (Last 30 days)</h3>
            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: 30 }).map((_, i) => {
                const intensity = Math.floor(Math.random() * 5); // 0-4
                const colors = [
                  'bg-[var(--color-surface-3)] border border-[var(--color-border)]',
                  'bg-indigo-900/40 border border-indigo-500/20',
                  'bg-indigo-700/50 border border-indigo-500/30',
                  'bg-indigo-500/70 border border-indigo-400/50',
                  'bg-indigo-400 border border-indigo-300',
                ];
                return (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-sm shrink-0 ${colors[intensity]}`} 
                    title={`${intensity * 3} contributions`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-[var(--color-text-muted)]">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[var(--color-surface-3)] border border-[var(--color-border)]" />
                <div className="w-3 h-3 rounded-sm bg-indigo-900/40 border border-indigo-500/20" />
                <div className="w-3 h-3 rounded-sm bg-indigo-700/50 border border-indigo-500/30" />
                <div className="w-3 h-3 rounded-sm bg-indigo-500/70 border border-indigo-400/50" />
                <div className="w-3 h-3 rounded-sm bg-indigo-400 border border-indigo-300" />
              </div>
              <span>More</span>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="heading-sm text-[var(--color-text-primary)] mb-6">Recent Activity</h3>
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-[var(--color-border-strong)]">
              {ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative group"
                >
                  {/* Timeline Dot with Icon */}
                  <div className="absolute -left-10 w-7 h-7 rounded-full bg-[var(--color-surface-2)] border-2 border-[var(--color-border-strong)] group-hover:border-[var(--color-primary)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)] z-10 transition-colors flex items-center justify-center">
                    {Icons[item.icon]}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <span className="text-[var(--color-text-secondary)]">{item.action}</span>{' '}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
               <Button variant="ghost" size="sm">View all activity</Button>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
