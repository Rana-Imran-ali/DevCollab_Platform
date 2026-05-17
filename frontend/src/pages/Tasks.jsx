import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  board: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  list: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  comment: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// ── Mock Data ─────────────────────────────────────────────────────────────
const INITIAL_COLUMNS = [
  {
    id: 'todo', label: 'To Do', color: 'border-[var(--color-border-strong)]',
    tasks: [
      { id: 't1', title: 'Design new onboarding flow', priority: 'Medium', assignee: 'Sarah Chen', tag: 'Design', comments: 3 },
      { id: 't2', title: 'Set up CI/CD pipeline', priority: 'High', assignee: 'Alex Rivera', tag: 'DevOps', comments: 0 },
      { id: 't3', title: 'Write unit tests for auth', priority: 'Low', assignee: 'John Doe', tag: 'Testing', comments: 1 },
    ]
  },
  {
    id: 'inprogress', label: 'In Progress', color: 'border-[var(--color-info)]',
    tasks: [
      { id: 't4', title: 'API rate limiting implementation', priority: 'High', assignee: 'Marcus Doe', tag: 'Backend', comments: 5 },
      { id: 't5', title: 'Frontend state management refactor', priority: 'Medium', assignee: 'John Doe', tag: 'Frontend', comments: 2 },
    ]
  },
  {
    id: 'review', label: 'In Review', color: 'border-[var(--color-primary)]',
    tasks: [
      { id: 't6', title: 'Payment webhook handler', priority: 'High', assignee: 'Sarah Chen', tag: 'Backend', comments: 8 },
    ]
  },
  {
    id: 'done', label: 'Done', color: 'border-[var(--color-success)]',
    tasks: [
      { id: 't7', title: 'Upgrade to React 19', priority: 'Medium', assignee: 'Alex Rivera', tag: 'Frontend', comments: 0 },
      { id: 't8', title: 'Fix double-submit bug', priority: 'Low', assignee: 'John Doe', tag: 'Bug', comments: 2 },
    ]
  },
];

const priorityStyles = {
  High:   'bg-[var(--color-danger-muted)] text-[var(--color-danger)]',
  Medium: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
  Low:    'bg-[var(--color-success-muted)] text-[var(--color-success)]',
};

export default function Tasks() {
  const [activeView, setActiveView] = useState('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [columns] = useState(INITIAL_COLUMNS);
  
  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Opens Task Details Modal

  const allTasks = columns.flatMap(c => c.tasks.map(t => ({ ...t, status: c.label })));
  const filteredListTasks = allTasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // ── Drag & Drop Mock Handlers ──
  const handleDragStart = (e, taskId, colId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('colId', colId);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    // In a real app, update state here by moving the task from source column to target column.
    console.log(`Dropped task ${e.dataTransfer.getData('taskId')} into column ${targetColId}`);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full max-w-[1600px] mx-auto">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h1 className="heading-lg text-[var(--color-text-primary)]">Tasks Board</h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Drag and drop tasks, track issues, and manage sprint progress.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* View Toggle */}
          <div className="flex bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-1 shrink-0">
            <button
              onClick={() => setActiveView('board')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'board' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
            >
              {Icons.board}
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'list' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
            >
              {Icons.list}
            </button>
          </div>
          <Button variant="primary" leftIcon={Icons.plus} onClick={() => setIsCreateOpen(true)} className="flex-1 sm:flex-none">
            New Task
          </Button>
        </div>
      </div>

      {/* ── Search Bar (Visible mainly in list view, but useful for both) ── */}
      <div className="mb-6 w-full max-w-md">
        <Input 
          placeholder="Search tasks..." 
          leftIcon={Icons.search} 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="bg-[var(--color-surface-2)]"
        />
      </div>

      {/* ── Board View (Kanban) ── */}
      {activeView === 'board' && (
        <div className="flex gap-6 overflow-x-auto pb-4 flex-1 scrollbar-hide">
          {columns.map(col => (
            <div 
              key={col.id} 
              className="w-80 shrink-0 flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full border-[3px] ${col.color.replace('border-t-', 'border-')}`} />
                  <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{col.label}</h3>
                  <span className="text-xs font-bold bg-[var(--color-surface-3)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                </div>
                <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  {Icons.plus}
                </button>
              </div>
              
              <div className="bg-[var(--color-surface-2)]/50 border border-[var(--color-border)] rounded-xl p-3 space-y-3 flex-1 overflow-y-auto">
                {col.tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(task => (
                  <motion.div
                    key={task.id}
                    layoutId={`task-${task.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                    onClick={() => setSelectedTask(task)}
                    className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-lg p-3.5 cursor-grab active:cursor-grabbing hover:border-[var(--color-primary-light)] transition-colors shadow-sm group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[0.65rem] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-3)] px-2 py-0.5 rounded">
                        {task.tag}
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug mb-4">
                      {task.title}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-medium">
                        {Icons.comment} {task.comments}
                      </div>
                      <Avatar name={task.assignee} size="xs" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Empty State / Drop Zone indicator */}
                {col.tasks.length === 0 && (
                  <div className="h-24 rounded-lg border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-xs text-[var(--color-text-muted)]">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── List View ── */}
      {activeView === 'list' && (
        <Card className="p-0 overflow-hidden flex-1 flex flex-col">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider sticky top-0">
            <div className="col-span-6 sm:col-span-5">Task Name</div>
            <div className="col-span-2 hidden sm:block">Status</div>
            <div className="col-span-3 sm:col-span-2">Priority</div>
            <div className="col-span-3">Assignee</div>
          </div>
          
          <div className="divide-y divide-[var(--color-border)] overflow-y-auto">
            {filteredListTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedTask(task)}
                className="grid grid-cols-12 px-6 py-4 items-center hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer group"
              >
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3 pr-4">
                  <div className="w-4 h-4 rounded border-2 border-[var(--color-border-strong)] group-hover:border-[var(--color-primary)] transition-colors shrink-0" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">{task.title}</span>
                </div>
                <div className="col-span-2 hidden sm:block">
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${priorityStyles[task.priority]}`}>{task.priority}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <Avatar name={task.assignee} size="xs" />
                  <span className="text-xs text-[var(--color-text-secondary)] hidden lg:block truncate">{task.assignee}</span>
                </div>
              </motion.div>
            ))}
            {filteredListTasks.length === 0 && (
              <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">No tasks found.</div>
            )}
          </div>
        </Card>
      )}

      {/* ── Create Task Modal ── */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Task"
        description="Add a new issue or task to the backlog."
        footer={<><Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button variant="primary">Create Task</Button></>}
      >
        <div className="space-y-4">
          <Input label="Task Title" placeholder="e.g. Fix login redirect bug" fullWidth />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="form-label">Priority</label>
              <select className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="form-label">Assign To</label>
              <select className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]">
                <option>Unassigned</option>
                <option>John Doe (You)</option>
                <option>Sarah Chen</option>
              </select>
            </div>
          </div>
          <Input as="textarea" label="Description" placeholder="Add detailed context, links, or acceptance criteria..." rows={4} fullWidth />
        </div>
      </Modal>

      {/* ── Task Details Modal (Mocked) ── */}
      <AnimatePresence>
        {selectedTask && (
          <Modal
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            title={`Task: ${selectedTask.id.toUpperCase()}`}
            maxWidth="max-w-2xl"
          >
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <h2 className="heading-md text-[var(--color-text-primary)] mb-4">{selectedTask.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">Status:</span>
                    <Badge variant="secondary">{selectedTask.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">Priority:</span>
                    <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${priorityStyles[selectedTask.priority]}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">Assignee:</span>
                    <Avatar name={selectedTask.assignee} size="xs" />
                    <span className="font-medium text-[var(--color-text-secondary)]">{selectedTask.assignee}</span>
                  </div>
                </div>
              </div>

              <div className="divider" />

              {/* Description Placeholder */}
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Description</h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-surface-2)] p-4 rounded-lg border border-[var(--color-border)]">
                  No description provided. Click to add a description.
                </p>
              </div>

              {/* Comments Section */}
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Comments ({selectedTask.comments})</h4>
                <div className="space-y-4 mb-4">
                  {/* Mock Comment */}
                  {selectedTask.comments > 0 && (
                    <div className="flex gap-3">
                      <Avatar name="Sarah Chen" size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[var(--color-text-primary)]">Sarah Chen</span>
                          <span className="text-[0.65rem] text-[var(--color-text-muted)]">2 hours ago</span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] p-3 rounded-lg border border-[var(--color-border)] rounded-tl-none">
                          I'll start taking a look at this tomorrow morning.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Comment Input */}
                <div className="flex gap-3">
                  <Avatar name="You" size="sm" />
                  <div className="flex-1">
                    <Input as="textarea" placeholder="Write a comment..." rows={2} fullWidth />
                    <div className="flex justify-end mt-2">
                      <Button variant="primary" size="sm">Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}
