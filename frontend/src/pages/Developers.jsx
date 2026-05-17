import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

// ── Mock Data ─────────────────────────────────────────────────────────────
const MOCK_DEVELOPERS = [
  {
    id: 1,
    name: 'Alex Johnson',
    title: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    available: true,
    avatar: '',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Full Stack Developer',
    skills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    available: false,
    avatar: '',
  },
  {
    id: 3,
    name: 'Michael Silva',
    title: 'Backend Engineer',
    skills: ['Laravel', 'PHP', 'MySQL', 'Redis'],
    available: true,
    avatar: '',
  },
  {
    id: 4,
    name: 'Emily Davis',
    title: 'UI/UX Designer & Dev',
    skills: ['Figma', 'React', 'CSS', 'Framer Motion'],
    available: true,
    avatar: '',
  },
  {
    id: 5,
    name: 'David Kim',
    title: 'DevOps Engineer',
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform'],
    available: false,
    avatar: '',
  },
  {
    id: 6,
    name: 'Jessica Taylor',
    title: 'Mobile Developer',
    skills: ['React Native', 'Swift', 'Kotlin'],
    available: true,
    avatar: '',
  }
];

const ALL_SKILLS = ['React', 'TypeScript', 'Node.js', 'Laravel', 'PostgreSQL', 'Docker', 'AWS', 'Python', 'Go', 'Figma'];

// ── Icons ─────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

export default function Developers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Filter logic
  const filteredDevs = MOCK_DEVELOPERS.filter((dev) => {
    // Search filter
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dev.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Skill filter
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.every(skill => dev.skills.includes(skill));
    
    // Availability filter
    const matchesAvailability = !showOnlyAvailable || dev.available;

    return matchesSearch && matchesSkills && matchesAvailability;
  });

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="heading-lg text-[var(--color-text-primary)]">Developers</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          Discover and collaborate with talented developers in the community.
        </p>
      </div>

      {/* ── Filters & Search Bar ── */}
      <Card className="p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input 
              leftIcon={<SearchIcon />}
              placeholder="Search developers by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[var(--color-surface-1)]"
            />
          </div>
          
          {/* Availability Toggle */}
          <div className="flex items-center shrink-0">
             <label className="flex items-center gap-2 cursor-pointer bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] px-4 py-2.5 rounded-lg hover:border-[var(--color-primary-light)] transition-colors h-full">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-[var(--color-border-strong)] bg-[var(--color-surface-3)] accent-[var(--color-success)] cursor-pointer"
                checked={showOnlyAvailable}
                onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Available for Collab
              </span>
            </label>
          </div>
        </div>

        {/* Skills Filter */}
        <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-[var(--color-text-secondary)]">
            <FilterIcon />
            Filter by Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border ${
                    isSelected 
                      ? 'bg-[var(--color-primary-glow)] text-[var(--color-primary-light)] border-[var(--color-primary)]' 
                      : 'bg-[var(--color-surface-1)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
            {selectedSkills.length > 0 && (
              <button 
                onClick={() => setSelectedSkills([])}
                className="text-xs font-medium px-3 py-1.5 text-[var(--color-danger)] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* ── Developers Grid ── */}
      {filteredDevs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevs.map((dev, i) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 h-full flex flex-col hover:border-[var(--color-primary-glow)] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={dev.name} size="lg" status={dev.available ? 'online' : 'offline'} />
                    <div>
                      <Link to={`/profile/${dev.id}`} className="font-display font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary-light)] transition-colors">
                        {dev.name}
                      </Link>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{dev.title}</p>
                    </div>
                  </div>
                  {dev.available && (
                    <Badge variant="success" dot className="hidden sm:inline-flex">Collab</Badge>
                  )}
                </div>

                <div className="flex-1 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                        {skill}
                      </span>
                    ))}
                    {dev.skills.length > 4 && (
                      <span className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                        +{dev.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex gap-2">
                  <Link to={`/profile/${dev.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" fullWidth>View Profile</Button>
                  </Link>
                  <Button variant="primary" size="sm" className="px-3" title="Send Message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--color-surface-2)] rounded-xl border border-dashed border-[var(--color-border-strong)]">
          <div className="w-16 h-16 bg-[var(--color-surface-3)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-text-muted)]">
            <SearchIcon />
          </div>
          <h3 className="heading-sm text-[var(--color-text-primary)] mb-1">No developers found</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your search query or removing some skill filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedSkills([]); setShowOnlyAvailable(false); }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
