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
  invite: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@devcollab.com', role: 'Owner', status: 'online', joinedAt: '2023-01-15' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@devcollab.com', role: 'Admin', status: 'offline', joinedAt: '2023-03-22' },
  { id: 3, name: 'Michael Silva', email: 'michael@devcollab.com', role: 'Developer', status: 'busy', joinedAt: '2023-06-10' },
  { id: 4, name: 'Emily Davis', email: 'emily@devcollab.com', role: 'Designer', status: 'online', joinedAt: '2023-08-05' },
];

const COLLAB_REQUESTS = [
  { id: 101, name: 'David Kim', role: 'DevOps', message: 'Hi! I saw your post looking for CI/CD help. Would love to join.', time: '2 hours ago' },
  { id: 102, name: 'Jessica Taylor', role: 'Mobile Dev', message: 'I have experience with React Native and want to contribute to the mobile app.', time: '1 day ago' },
];

const SUGGESTED_TEAMMATES = [
  { id: 201, name: 'Ryan Patel', title: 'Full Stack Engineer', match: '95%', skills: ['React', 'Node.js', 'PostgreSQL'] },
  { id: 202, name: 'Lisa Wang', title: 'UI/UX Designer', match: '88%', skills: ['Figma', 'CSS', 'Framer'] },
  { id: 203, name: 'Tom Hardy', title: 'Backend Developer', match: '82%', skills: ['Laravel', 'Redis', 'Docker'] },
];

const ACTIVITY_FEED = [
  { id: 301, user: 'Sarah Chen', action: 'merged PR #42 into main', time: '10 mins ago' },
  { id: 302, user: 'Michael Silva', action: 'completed task "Setup Redis Cache"', time: '2 hours ago' },
  { id: 303, user: 'Alex Johnson', action: 'invited David Kim to the team', time: '5 hours ago' },
  { id: 304, user: 'Emily Davis', action: 'uploaded new Figma designs', time: '1 day ago' },
];

export default function TeamManagement() {
  const [activeTab, setActiveTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Developer');

  const filteredMembers = TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in pb-12 max-w-6xl mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="heading-lg text-[var(--color-text-primary)]">Collaboration Hub</h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Manage your team, handle requests, and discover new collaborators.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="primary" leftIcon={Icons.invite} onClick={() => setIsInviteModalOpen(true)}>
            Invite Member
          </Button>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-[var(--color-border)] mb-8 gap-6">
        {[
          { id: 'members', label: 'My Team', count: TEAM_MEMBERS.length },
          { id: 'requests', label: 'Requests', count: COLLAB_REQUESTS.length },
          { id: 'discover', label: 'Find Teammates' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              pb-3 text-sm font-medium transition-colors relative whitespace-nowrap
              ${activeTab === tab.id ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}
            `}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[0.65rem] font-bold ${
                activeTab === tab.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface-3)] text-[var(--color-text-muted)]'
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Main Layout (Grid) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left/Main Column: Tab Content */}
        <div className="xl:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* TAB: Members */}
            {activeTab === 'members' && (
              <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                <Input 
                  placeholder="Search team members..." 
                  leftIcon={Icons.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="grid gap-4">
                  {filteredMembers.map(member => (
                    <Card key={member.id} className="p-4 flex items-center justify-between hover:border-[var(--color-primary-glow)] transition-colors group">
                      <div className="flex items-center gap-4">
                        <Avatar name={member.name} size="md" status={member.status} />
                        <div>
                          <div className="flex items-center gap-2">
                            <Link to={`/profile/${member.id}`} className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary-light)] transition-colors">
                              {member.name}
                            </Link>
                            {member.role === 'Owner' && <Badge variant="primary">Owner</Badge>}
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)]">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {member.role !== 'Owner' ? (
                          <select 
                            className="bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                            defaultValue={member.role}
                          >
                            <option>Admin</option>
                            <option>Developer</option>
                            <option>Designer</option>
                            <option>Viewer</option>
                            <option className="text-[var(--color-danger)]">Remove</option>
                          </select>
                        ) : (
                          <span className="text-xs text-[var(--color-text-muted)] font-medium px-2">Owner Locked</span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: Requests */}
            {activeTab === 'requests' && (
              <motion.div key="requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {COLLAB_REQUESTS.map(req => (
                  <Card key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar name={req.name} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-[var(--color-text-primary)]">{req.name}</h4>
                          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                            {Icons.clock} {req.time}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-primary-light)] font-medium mb-2">{req.role}</p>
                        <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-3)] p-3 rounded-lg border border-[var(--color-border)]">
                          "{req.message}"
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0 pt-1">
                      <Button variant="primary" size="sm" leftIcon={Icons.check}>Approve</Button>
                      <Button variant="secondary" size="sm" leftIcon={Icons.x}>Decline</Button>
                    </div>
                  </Card>
                ))}
                {COLLAB_REQUESTS.length === 0 && (
                  <div className="text-center py-12 text-[var(--color-text-muted)]">No pending requests.</div>
                )}
              </motion.div>
            )}

            {/* TAB: Discover */}
            {activeTab === 'discover' && (
              <motion.div key="discover" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUGGESTED_TEAMMATES.map(dev => (
                    <Card key={dev.id} className="p-5 flex flex-col h-full hover:border-[var(--color-primary-glow)] transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={dev.name} size="md" />
                          <div>
                            <Link to={`/profile/${dev.id}`} className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary-light)]">
                              {dev.name}
                            </Link>
                            <p className="text-xs text-[var(--color-text-muted)]">{dev.title}</p>
                          </div>
                        </div>
                        <Badge variant="success" className="bg-[var(--color-success-muted)] text-[var(--color-success)] text-[0.65rem] border-none">
                          {dev.match} Match
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                        {dev.skills.map(skill => (
                          <span key={skill} className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-text-secondary)]">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <Button variant="secondary" size="sm" fullWidth>Invite to Team</Button>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="xl:col-span-1">
          <Card className="p-5 sticky top-6">
            <h3 className="heading-sm text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
              <svg className="text-[var(--color-primary-light)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Activity Feed
            </h3>
            
            <div className="space-y-5 relative before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-[var(--color-border)]">
              {ACTIVITY_FEED.map((feed, i) => (
                <div key={feed.id} className="relative flex gap-4">
                  <div className="absolute -left-[5px] w-3 h-3 rounded-full bg-[var(--color-surface-2)] border-2 border-[var(--color-primary-light)] z-10" />
                  <div className="pl-4">
                    <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                      <span className="font-semibold">{feed.user}</span> {feed.action}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{feed.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm" fullWidth className="mt-6">View all activity</Button>
          </Card>
        </div>
      </div>

      {/* ── Invite Modal ── */}
      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite developers"
        description="Invite external developers to collaborate on your projects."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Send Invitation</Button>
          </>
        }
      >
        <div className="space-y-5">
          <Input 
            label="Email address" 
            placeholder="colleague@company.com" 
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            leftIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
          />
          
          <div className="space-y-2">
            <label className="form-label">Assign Role</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { role: 'Admin', desc: 'Full access to manage team and settings.' },
                { role: 'Developer', desc: 'Can edit code and complete tasks.' }
              ].map(r => (
                <button 
                  key={r.role}
                  type="button"
                  onClick={() => setInviteRole(r.role)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    inviteRole === r.role 
                      ? 'bg-[var(--color-primary-glow)] border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' 
                      : 'bg-[var(--color-surface-2)] border-[var(--color-border-strong)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <p className={`font-semibold text-sm mb-0.5 ${inviteRole === r.role ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-text-primary)]'}`}>
                    {r.role}
                  </p>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)] leading-tight">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
