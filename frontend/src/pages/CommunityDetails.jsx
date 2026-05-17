import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  back: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  share: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  calendar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  video: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const COMMUNITY = {
  id: 'c1',
  name: 'React Developers',
  description: 'The largest community of React, Next.js, and React Native developers. Share patterns, ask questions, and showcase your projects.',
  members: '12.4k',
  online: '1.2k',
  bannerColor: 'from-cyan-500 to-blue-500',
  isJoined: true,
};

const POSTS = [
  {
    id: 'p1',
    author: 'Alex Rivera',
    time: '2 hours ago',
    content: 'Just published a comprehensive guide on migrating from Create React App to Vite! Let me know what you guys think, I found the build times improved by almost 80%.',
    likes: 234,
    comments: 42,
    hasLiked: false,
    image: null,
  },
  {
    id: 'p2',
    author: 'Emily Wong',
    time: '5 hours ago',
    content: 'Can anyone recommend a good headless UI library for React that works well with Tailwind CSS? I have been using Headless UI but want to try something new for my next project.',
    likes: 56,
    comments: 18,
    hasLiked: true,
    image: null,
  },
  {
    id: 'p3',
    author: 'Michael Silva',
    time: '1 day ago',
    content: 'Sneak peek at the new dashboard component I am building using React Server Components. The performance benefits are actually insane for data-heavy views.',
    likes: 890,
    comments: 104,
    hasLiked: false,
    image: true, // mock flag for rendering a placeholder
  }
];

const EVENTS = [
  { id: 'e1', title: 'State Management Deep Dive', date: 'Tomorrow, 2:00 PM', attendees: 145 },
  { id: 'e2', title: 'React 19 Release Party', date: 'Next Friday, 10:00 AM', attendees: 320 },
];

const MENTORS = [
  { id: 'm1', name: 'Sarah Chen', role: 'Staff Engineer @ TechCorp', tags: ['React', 'Architecture'] },
  { id: 'm2', name: 'David Kim', role: 'Senior Frontend', tags: ['Next.js', 'Performance'] },
];

export default function CommunityDetails() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState('');

  return (
    <div className="animate-fade-in pb-12 max-w-[1400px] mx-auto">
      
      {/* ── Top Nav ── */}
      <div className="mb-4">
        <Link to="/communities" className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors">
          {Icons.back} Back to communities
        </Link>
      </div>

      {/* ── Community Header Banner ── */}
      <div className="relative rounded-2xl overflow-hidden mb-8 border border-[var(--color-border)] shadow-md bg-[var(--color-surface-2)]">
        <div className={`h-40 bg-gradient-to-r ${COMMUNITY.bannerColor} relative`}>
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwIDBIMjBMMCAyME00MCA0MFYyMEwyMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        </div>
        
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar overlapping banner */}
            <div className={`w-24 h-24 rounded-2xl border-4 border-[var(--color-surface-2)] bg-gradient-to-br ${COMMUNITY.bannerColor} flex items-center justify-center text-white font-display font-bold text-4xl shadow-lg -mt-12 relative z-10 shrink-0`}>
              {COMMUNITY.name.charAt(0)}
            </div>
            
            <div className="mb-1">
              <h1 className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">{COMMUNITY.name}</h1>
              <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-text-muted)] mt-1">
                <span>{COMMUNITY.members} Members</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" /> {COMMUNITY.online} Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary">Share</Button>
            <Button variant={COMMUNITY.isJoined ? "outline" : "primary"}>
              {COMMUNITY.isJoined ? "Joined" : "Join Community"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── LEFT COLUMN: Social Feed ── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Post Input */}
          <Card className="p-4 flex gap-4">
            <Avatar name="You" size="md" />
            <div className="flex-1">
              <textarea 
                className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-xl p-3 focus:outline-none focus:border-[var(--color-primary)] resize-none"
                placeholder={`Share something with ${COMMUNITY.name}...`}
                rows={2}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-surface-3)] rounded-lg transition-colors">
                    {Icons.image}
                  </button>
                  <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-surface-3)] rounded-lg transition-colors font-bold text-xs flex items-center justify-center w-9 h-9">
                    {'{ }'}
                  </button>
                </div>
                <Button variant="primary" size="sm" disabled={!postContent.trim()}>Post</Button>
              </div>
            </div>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-6">
            {POSTS.map(post => (
              <Card key={post.id} className="p-0 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={post.author} size="md" />
                      <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)]">{post.author}</h4>
                        <p className="text-[0.65rem] font-medium text-[var(--color-text-muted)]">{post.time}</p>
                      </div>
                    </div>
                    <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </div>
                  
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Mock Image Placeholder */}
                  {post.image && (
                    <div className="w-full h-48 bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-xl mb-4 flex items-center justify-center text-[var(--color-text-muted)]">
                       <span className="text-xs">Attached Image / Media</span>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-6">
                      <button className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.hasLiked ? 'text-pink-500' : 'text-[var(--color-text-muted)] hover:text-pink-400'}`}>
                        {Icons.heart} {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors">
                        {Icons.comment} {post.comments}
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                      {Icons.share} Share
                    </button>
                  </div>
                </div>
                
                {/* Mock recent comment preview */}
                {post.comments > 0 && (
                  <div className="bg-[var(--color-surface-2)] px-5 py-3 border-t border-[var(--color-border)]">
                    <div className="flex items-start gap-2">
                       <Avatar name="JD" size="xs" className="mt-1" />
                       <div className="flex-1 bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-xl p-3 text-sm">
                          <span className="font-semibold text-[var(--color-text-primary)] mr-2">John Doe</span>
                          <span className="text-[var(--color-text-secondary)]">This looks awesome! Can't wait to try it out.</span>
                       </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

        </div>

        {/* ── RIGHT COLUMN: Sidebar ── */}
        <div className="lg:col-span-1 space-y-6">
          
          <Card className="p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">About Community</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              {COMMUNITY.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Created March 2023
            </div>
          </Card>

          {/* Events */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Upcoming Events</h3>
              <button className="text-xs text-[var(--color-primary-light)] hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {EVENTS.map(event => (
                <div key={event.id} className="flex gap-3 items-start group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] flex flex-col items-center justify-center shrink-0 group-hover:border-[var(--color-primary)] transition-colors">
                    <span className="text-[0.55rem] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{event.date.split(',')[0]}</span>
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      {event.date.match(/\d+/)?.[0] || '12'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-1">
                      {event.title}
                    </h4>
                    <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-0.5 flex items-center gap-1">
                      {Icons.video} Virtual • {event.attendees} attending
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mentors */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Top Mentors</h3>
              <button className="text-xs text-[var(--color-primary-light)] hover:underline">See All</button>
            </div>
            <div className="space-y-4">
              {MENTORS.map(mentor => (
                <div key={mentor.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Avatar name={mentor.name} size="sm" />
                    <div>
                      <h4 className="text-sm font-medium text-[var(--color-text-primary)]">{mentor.name}</h4>
                      <p className="text-[0.65rem] text-[var(--color-text-muted)] truncate max-w-[120px]">{mentor.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="px-2 py-1 text-xs h-7">Ask</Button>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
