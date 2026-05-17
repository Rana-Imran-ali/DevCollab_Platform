import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrowUp: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
  message: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  trending: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    id: 'p1',
    title: 'How to properly implement JWT refresh tokens in Laravel Sanctum?',
    excerpt: 'I have set up Sanctum for SPA authentication, but I am confused about how to handle token expiration and refreshing without forcing the user to log in again...',
    votes: 42,
    answers: 3,
    isSolved: true,
    tags: ['Laravel', 'Authentication', 'Security'],
    author: 'Michael Silva',
    time: '2 hours ago',
  },
  {
    id: 'p2',
    title: 'React useEffect dependency array causing infinite loop when fetching data',
    excerpt: 'When I pass my fetch function into the useEffect dependency array, it triggers an infinite re-render loop. If I remove it, I get an ESLint warning. What is the standard approach?',
    votes: 128,
    answers: 15,
    isSolved: true,
    tags: ['React', 'Hooks', 'JavaScript'],
    author: 'Sarah Chen',
    time: '5 hours ago',
  },
  {
    id: 'p3',
    title: 'Docker compose networking issue between Node.js and PostgreSQL',
    excerpt: 'My Node backend cannot connect to the Postgres container. I am using the service name as the host, but it says connection refused.',
    votes: 15,
    answers: 0,
    isSolved: false,
    tags: ['Docker', 'PostgreSQL', 'Node.js'],
    author: 'Alex Rivera',
    time: '1 day ago',
  },
  {
    id: 'p4',
    title: 'Framer Motion layout animations jumping on parent height change',
    excerpt: 'When the parent container changes height due to a state change, the layout ID animations inside the child components jitter before settling.',
    votes: 8,
    answers: 2,
    isSolved: false,
    tags: ['React', 'Framer Motion', 'CSS'],
    author: 'Emily Davis',
    time: '2 days ago',
  },
];

const TRENDING = [
  { id: 't1', title: 'Why is Tailwind CSS not applying my custom theme colors?', views: '1.2k' },
  { id: 't2', title: 'Understanding React Server Components vs SSR', views: '850' },
  { id: 't3', title: 'Best practices for structuring a large Laravel 11 application', views: '640' },
];

const POPULAR_TAGS = ['React', 'Laravel', 'TypeScript', 'Node.js', 'CSS', 'Docker', 'PostgreSQL'];

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('newest');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  return (
    <div className="animate-fade-in pb-12 max-w-6xl mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="heading-lg text-[var(--color-text-primary)]">Community Q&A</h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Share knowledge, ask questions, and solve coding problems together.
          </p>
        </div>
        <Button variant="primary" leftIcon={Icons.plus} onClick={() => setIsAskModalOpen(true)}>
          Ask Question
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* ── MAIN COLUMN: Questions List ── */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:max-w-md">
              <Input 
                placeholder="Search questions..." 
                leftIcon={Icons.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[var(--color-surface-2)]"
              />
            </div>
            
            <div className="flex bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-1 shrink-0 w-full md:w-auto overflow-x-auto scrollbar-hide">
              {['newest', 'active', 'unanswered'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeTab === tab ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {PROBLEMS.map((prob) => (
              <Card key={prob.id} className="p-0 overflow-hidden hover:border-[var(--color-primary-glow)] transition-colors group">
                <div className="flex flex-col sm:flex-row">
                  
                  {/* Left Stats Column */}
                  <div className="flex sm:flex-col gap-4 sm:gap-2 justify-start sm:justify-start items-center sm:items-end p-5 bg-[var(--color-surface-2)] sm:w-32 border-b sm:border-b-0 sm:border-r border-[var(--color-border)] shrink-0">
                    <div className="text-center">
                      <span className="block text-sm font-bold text-[var(--color-text-primary)]">{prob.votes}</span>
                      <span className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wider">votes</span>
                    </div>
                    <div className={`text-center px-2 py-1 rounded border ${prob.isSolved ? 'bg-[var(--color-success-muted)] border-[var(--color-success)] text-[var(--color-success)]' : prob.answers > 0 ? 'border-[var(--color-border-strong)] text-[var(--color-text-primary)]' : 'border-transparent text-[var(--color-text-muted)]'}`}>
                      <span className="block text-sm font-bold">{prob.answers}</span>
                      <span className="text-[0.65rem] uppercase tracking-wider">answers</span>
                    </div>
                  </div>

                  {/* Right Content Column */}
                  <div className="p-5 flex-1">
                    <Link to={`/problems/${prob.id}`} className="heading-md text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2 block line-clamp-2">
                      {prob.title}
                    </Link>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                      {prob.excerpt}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {prob.tags.map(tag => (
                          <span key={tag} className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-primary-light)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <Avatar name={prob.author} size="xs" />
                        <span className="text-[var(--color-text-primary)] font-medium">{prob.author}</span>
                        <span className="text-[var(--color-text-muted)]">asked {prob.time}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="ghost">Load more questions</Button>
          </div>

        </div>

        {/* ── RIGHT COLUMN: Sidebar ── */}
        <div className="xl:col-span-1 space-y-6">
          
          <Card className="p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <span className="text-[var(--color-warning)]">{Icons.trending}</span> Trending
            </h3>
            <div className="space-y-4">
              {TRENDING.map(t => (
                <div key={t.id} className="group cursor-pointer">
                  <h4 className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2 leading-snug">
                    {t.title}
                  </h4>
                  <p className="text-[0.65rem] text-[var(--color-text-muted)] mt-1">{t.views} views</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map(tag => (
                <span key={tag} className="text-[0.65rem] font-medium px-2.5 py-1.5 rounded bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* ── Ask Question Modal ── */}
      <Modal 
        isOpen={isAskModalOpen} 
        onClose={() => setIsAskModalOpen(false)}
        title="Ask a Question"
        maxWidth="max-w-3xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAskModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Post Question</Button>
          </>
        }
      >
        <div className="space-y-5">
          <Input 
            label="Title" 
            placeholder="e.g. How to properly implement JWT refresh tokens in Laravel Sanctum?" 
            fullWidth 
          />
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="form-label">Body</label>
              <span className="text-[0.65rem] text-[var(--color-text-muted)] bg-[var(--color-surface-3)] px-2 py-0.5 rounded">Markdown supported</span>
            </div>
            {/* Formatting Toolbar Mock */}
            <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-t-lg p-2 flex gap-1 border-b-0">
              {['B', 'I', '</>', 'link', 'list'].map((tool, i) => (
                <button key={i} className="w-8 h-8 rounded hover:bg-[var(--color-surface-3)] text-xs font-bold text-[var(--color-text-muted)] transition-colors">
                  {tool}
                </button>
              ))}
            </div>
            <textarea 
              className="w-full h-48 bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-b-lg p-4 focus:outline-none focus:border-[var(--color-primary)] font-mono resize-y"
              placeholder="Provide context, what you've tried, and code snippets..."
            />
          </div>

          <Input 
            label="Tags" 
            placeholder="e.g. react, laravel, typescript (comma separated)" 
            fullWidth 
          />
        </div>
      </Modal>

    </div>
  );
}
