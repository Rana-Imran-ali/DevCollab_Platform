import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  upvote: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
  downvote: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  back: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const PROBLEM = {
  id: 'p1',
  title: 'How to properly implement JWT refresh tokens in Laravel Sanctum?',
  tags: ['Laravel', 'Authentication', 'Security'],
  author: 'Michael Silva',
  time: '2 hours ago',
  views: '1.4k',
  votes: 42,
  body: `
I have set up Sanctum for SPA authentication, but I am confused about how to handle token expiration and refreshing without forcing the user to log in again.

Right now, my token expires after 60 minutes, and the frontend gets a \`401 Unauthenticated\` error.

Here is my current \`cors.php\` configuration:
\`\`\`php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
\`\`\`

What is the standard best practice for handling silent refreshes using Laravel Sanctum with a React frontend? Should I be using a separate refresh token endpoint or relying on the session cookies entirely?
  `,
};

const ANSWERS = [
  {
    id: 'a1',
    author: 'Sarah Chen',
    time: '1 hour ago',
    votes: 85,
    isAccepted: true,
    body: `
When using Laravel Sanctum for an SPA (Single Page Application) running on the same top-level domain, **you shouldn't be using JWTs at all**. Sanctum provides a built-in cookie-based session authentication method specifically for this.

Instead of issuing tokens via \`$user->createToken()\`, you should:

1. Ensure your frontend calls \`GET /sanctum/csrf-cookie\` first.
2. Send a \`POST /login\` request to authenticate via Laravel's standard session facade.
3. Ensure your Axios client has \`withCredentials: true\` configured.

### Axios Setup Example:
\`\`\`javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Critical for Sanctum SPA auth
});
\`\`\`

Because it's a standard HTTP-only session cookie, Laravel handles the lifecycle automatically based on your \`SESSION_LIFETIME\` in \`.env\`. You do not need to implement a "refresh token" flow manually!
    `
  },
  {
    id: 'a2',
    author: 'Alex Rivera',
    time: '30 mins ago',
    votes: 12,
    isAccepted: false,
    body: `
To add to Sarah's answer, if you *must* use API Tokens (e.g. your React app is on a completely different domain or it's a mobile app), Sanctum tokens do not inherently expire unless you define an expiration in \`sanctum.php\`:

\`\`\`php
'expiration' => 60, // minutes
\`\`\`

If you do this, you will need to create a custom endpoint that accepts the current valid token, revokes it, and issues a new one. But again, for a web SPA, stick to the cookie-based approach!
    `
  }
];

export default function ProblemDetails() {
  const { id } = useParams();
  
  // Render Markdown-ish mock logic (In a real app use react-markdown)
  const renderMarkdown = (text) => {
    return text.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('```')) {
        const lang = paragraph.split('\n')[0].replace('```', '');
        const code = paragraph.replace(/```[a-z]*\n/, '').replace(/```/, '').trim();
        return (
          <div key={idx} className="my-4 rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[#0D0D1A] shadow-md">
             <div className="flex items-center px-4 py-1.5 bg-[#161628] border-b border-[var(--color-border)]">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{lang}</span>
             </div>
             <pre className="p-4 text-sm font-mono text-blue-300 overflow-x-auto">
                <code>{code}</code>
             </pre>
          </div>
        );
      }
      return <p key={idx} className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{paragraph}</p>;
    });
  };

  return (
    <div className="animate-fade-in pb-12 max-w-5xl mx-auto">
      
      {/* ── Top Nav ── */}
      <div className="mb-6">
        <Link to="/problems" className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors">
          {Icons.back} Back to all questions
        </Link>
      </div>

      {/* ── Problem Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div className="flex-1">
          <h1 className="heading-lg text-[var(--color-text-primary)] mb-3 leading-snug">
            {PROBLEM.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1.5">
              <Avatar name={PROBLEM.author} size="xs" />
              <span className="text-[var(--color-text-secondary)] font-medium">{PROBLEM.author}</span>
            </div>
            <span>Asked {PROBLEM.time}</span>
            <span>Viewed {PROBLEM.views} times</span>
          </div>
        </div>
        <Button variant="primary" className="shrink-0">Ask Question</Button>
      </div>

      <div className="divider mb-6" />

      {/* ── Problem Body ── */}
      <div className="flex gap-4 sm:gap-6 mb-12">
        {/* Voting Sidebar */}
        <div className="flex flex-col items-center gap-2 shrink-0 w-12">
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-surface-3)] p-1.5 rounded-full transition-colors">
            {Icons.upvote}
          </button>
          <span className="text-xl font-bold text-[var(--color-text-primary)]">{PROBLEM.votes}</span>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-3)] p-1.5 rounded-full transition-colors">
            {Icons.downvote}
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            {renderMarkdown(PROBLEM.body)}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {PROBLEM.tags.map(tag => (
              <span key={tag} className="text-[0.65rem] font-medium px-2 py-1 rounded bg-[var(--color-surface-3)] text-[var(--color-primary-light)] border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-sm font-medium">
            <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Share</button>
            <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Edit</button>
          </div>
        </div>
      </div>

      {/* ── Answers Section ── */}
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-[var(--color-text-primary)] mb-6">
          {ANSWERS.length} Answers
        </h2>

        <div className="space-y-8">
          {ANSWERS.map((answer) => (
            <Card key={answer.id} className={`p-0 overflow-hidden ${answer.isAccepted ? 'border-[var(--color-success)] shadow-[0_0_20px_rgba(34,197,94,0.1)]' : ''}`}>
              <div className="flex gap-4 sm:gap-6 p-6">
                
                {/* Voting Sidebar */}
                <div className="flex flex-col items-center gap-2 shrink-0 w-12">
                  <button className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-surface-3)] p-1.5 rounded-full transition-colors">
                    {Icons.upvote}
                  </button>
                  <span className="text-xl font-bold text-[var(--color-text-primary)]">{answer.votes}</span>
                  <button className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-3)] p-1.5 rounded-full transition-colors">
                    {Icons.downvote}
                  </button>
                  {answer.isAccepted && (
                    <div className="mt-2 text-[var(--color-success)] bg-[var(--color-success-muted)] p-1.5 rounded-full" title="Accepted Solution">
                      {Icons.check}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="mb-6">
                    {renderMarkdown(answer.body)}
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex gap-4 text-sm font-medium">
                      <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Share</button>
                      <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Edit</button>
                    </div>

                    <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-3 w-48 text-xs">
                      <span className="text-[var(--color-text-muted)] mb-1.5 block">answered {answer.time}</span>
                      <div className="flex items-center gap-2">
                        <Avatar name={answer.author} size="xs" />
                        <span className="text-[var(--color-text-primary)] font-semibold">{answer.author}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Your Answer ── */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-bold text-[var(--color-text-primary)] mb-4">
          Your Answer
        </h2>
        
        <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-t-lg p-2 flex gap-1 border-b-0">
          {['B', 'I', '</>', 'link', 'list'].map((tool, i) => (
            <button key={i} className="w-8 h-8 rounded hover:bg-[var(--color-surface-3)] text-xs font-bold text-[var(--color-text-muted)] transition-colors">
              {tool}
            </button>
          ))}
        </div>
        <textarea 
          className="w-full h-48 bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-b-lg p-4 focus:outline-none focus:border-[var(--color-primary)] font-mono resize-y mb-4"
          placeholder="Write your answer..."
        />
        <Button variant="primary">Post Your Answer</Button>
      </div>

    </div>
  );
}
