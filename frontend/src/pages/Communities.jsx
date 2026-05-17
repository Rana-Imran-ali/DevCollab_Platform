import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  trending: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  compass: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const COMMUNITIES = [
  {
    id: 'c1',
    name: 'React Developers',
    description: 'The largest community of React, Next.js, and React Native developers. Share patterns, ask questions, and showcase your projects.',
    members: '12.4k',
    posts: '850',
    tags: ['React', 'Next.js', 'Frontend'],
    isJoined: true,
    bannerColor: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'c2',
    name: 'Laravel Artisans',
    description: 'For PHP developers building robust web applications using the Laravel framework. Discuss architecture, Eloquent, and packages.',
    members: '8.2k',
    posts: '420',
    tags: ['Laravel', 'PHP', 'Backend'],
    isJoined: false,
    bannerColor: 'from-red-500 to-rose-600',
  },
  {
    id: 'c3',
    name: 'UI/UX Design Hub',
    description: 'A place for developers and designers to bridge the gap. Share Figma mockups, CSS tricks, and accessibility guidelines.',
    members: '5.1k',
    posts: '210',
    tags: ['Design', 'Figma', 'CSS'],
    isJoined: true,
    bannerColor: 'from-purple-500 to-fuchsia-500',
  },
  {
    id: 'c4',
    name: 'DevOps & Cloud',
    description: 'Everything about CI/CD, AWS, Docker, Kubernetes, and keeping servers running smoothly.',
    members: '6.7k',
    posts: '390',
    tags: ['AWS', 'Docker', 'CI/CD'],
    isJoined: false,
    bannerColor: 'from-amber-500 to-orange-500',
  },
];

const TRENDING_TOPICS = [
  { id: 't1', title: '#React19', posts: '1.2k posts' },
  { id: 't2', title: '#ServerActions', posts: '850 posts' },
  { id: 't3', title: '#TailwindV4', posts: '640 posts' },
  { id: 't4', title: '#Laravel11', posts: '420 posts' },
];

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCommunities = COMMUNITIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' 
                          || (activeFilter === 'My Communities' && c.isJoined);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in pb-12 max-w-6xl mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="heading-lg text-[var(--color-text-primary)]">Communities</h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Join groups of like-minded developers to share, learn, and grow.
          </p>
        </div>
        <Button variant="primary" leftIcon={Icons.plus}>
          Create Community
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* ── MAIN COLUMN: Communities List ── */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-surface-2)] p-3 rounded-xl border border-[var(--color-border)]">
            <div className="w-full md:max-w-md">
              <Input 
                placeholder="Find a community..." 
                leftIcon={Icons.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--color-surface-1)]"
              />
            </div>
            
            <div className="flex bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-lg p-1 shrink-0 w-full md:w-auto overflow-x-auto scrollbar-hide">
              {['All', 'My Communities', 'Trending'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === tab ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCommunities.map((community, i) => (
              <motion.div key={community.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-0 overflow-hidden hover:border-[var(--color-primary-glow)] transition-all duration-300 flex flex-col h-full group">
                  
                  {/* Banner */}
                  <div className={`h-24 bg-gradient-to-r ${community.bannerColor} relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 pt-0 flex-1 flex flex-col relative">
                    
                    {/* Floating Avatar & Action */}
                    <div className="flex justify-between items-end mb-3 -mt-8 relative z-10">
                      <div className={`w-16 h-16 rounded-xl border-4 border-[var(--color-surface-1)] bg-gradient-to-br ${community.bannerColor} flex items-center justify-center text-white font-display font-bold text-2xl shadow-md`}>
                        {community.name.charAt(0)}
                      </div>
                      {community.isJoined ? (
                        <Button variant="secondary" size="sm">Joined</Button>
                      ) : (
                        <Button variant="primary" size="sm">Join</Button>
                      )}
                    </div>

                    <Link to={`/communities/${community.id}`} className="heading-md text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-1">
                      {community.name}
                    </Link>
                    
                    <div className="flex items-center gap-4 text-[0.65rem] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-1.5">{Icons.users} {community.members} Members</span>
                      <span>•</span>
                      <span>{community.posts} Posts</span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed mb-6 flex-1">
                      {community.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {community.tags.map(tag => (
                        <span key={tag} className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="text-center py-20 bg-[var(--color-surface-2)] rounded-xl border border-dashed border-[var(--color-border-strong)]">
              <div className="w-16 h-16 bg-[var(--color-surface-3)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-text-muted)]">
                {Icons.compass}
              </div>
              <h3 className="heading-sm text-[var(--color-text-primary)] mb-1">No communities found</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your filters or search query.</p>
            </div>
          )}

        </div>

        {/* ── RIGHT COLUMN: Sidebar ── */}
        <div className="xl:col-span-1 space-y-6">
          
          <Card className="p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <span className="text-[var(--color-primary-light)]">{Icons.trending}</span> Trending Topics
            </h3>
            <div className="space-y-4">
              {TRENDING_TOPICS.map(topic => (
                <div key={topic.id} className="group cursor-pointer">
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-0.5">{topic.posts}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 text-center bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface-3)]">
            <div className="w-12 h-12 bg-[var(--color-primary-glow)] rounded-xl flex items-center justify-center mx-auto mb-3 text-[var(--color-primary-light)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Find a Mentor</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">
              Connect with senior developers 1-on-1 to accelerate your learning and career.
            </p>
            <Button variant="secondary" size="sm" fullWidth>Browse Mentors</Button>
          </Card>

        </div>
      </div>

    </div>
  );
}
