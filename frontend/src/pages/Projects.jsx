import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Dummy Data
  const projects = [
    { id: 1, title: 'E-commerce Overhaul', status: 'In Progress', type: 'Frontend', lastUpdated: '2 hours ago', stack: ['React', 'Tailwind', 'Next.js'], members: [{ init: 'AM', color: 'bg-blue-500' }, { init: 'JD', color: 'bg-purple-500' }] },
    { id: 2, title: 'Payment Gateway V2', status: 'Planning', type: 'Backend', lastUpdated: '1 day ago', stack: ['Node.js', 'Stripe API', 'Redis'], members: [{ init: 'AM', color: 'bg-blue-500' }, { init: 'JD', color: 'bg-purple-500' }, { init: 'SR', color: 'bg-green-500' }] },
    { id: 3, title: 'Mobile App Beta', status: 'In Review', type: 'Mobile', lastUpdated: '3 days ago', stack: ['React Native', 'Firebase'], members: [{ init: 'JD', color: 'bg-purple-500' }] },
    { id: 4, title: 'Marketing Landing Page', status: 'Completed', type: 'Frontend', lastUpdated: '1 week ago', stack: ['Vue', 'GSAP'], members: [{ init: 'SR', color: 'bg-green-500' }, { init: 'TK', color: 'bg-yellow-500' }] },
    { id: 5, title: 'User Analytics Service', status: 'In Progress', type: 'Data', lastUpdated: '4 hours ago', stack: ['Python', 'PostgreSQL', 'Docker'], members: [{ init: 'AM', color: 'bg-blue-500' }] },
    { id: 6, title: 'Internal Tooling Hub', status: 'Maintenance', type: 'Fullstack', lastUpdated: '2 weeks ago', stack: ['React', 'Node.js', 'MongoDB'], members: [{ init: 'TK', color: 'bg-yellow-500' }, { init: 'JD', color: 'bg-purple-500' }] },
  ];

  const filters = ['All', 'In Progress', 'Completed', 'Planning', 'In Review'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Completed': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Planning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'In Review': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default: return 'text-[#888888] bg-white/5 border-white/10';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

  return (
    <div className="pb-10 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">Projects</h1>
          <p className="text-[#888888] text-sm">Manage and organize all your team's initiatives.</p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Project
        </Button>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-between items-start lg:items-center bg-[#111111] p-4 rounded-xl border border-[#222222]">
        <div className="w-full lg:w-96">
          <Input 
            placeholder="Search projects..." 
            icon={SearchIcon}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A1A] border-[#333333]"
            fullWidth
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === filter 
                  ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30' 
                  : 'bg-transparent text-[#888888] border-[#333333] hover:text-white hover:border-[#555555]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
         <div className="text-center py-20 bg-[#111111] rounded-xl border border-[#222222] border-dashed">
            <svg className="w-12 h-12 mx-auto text-[#333333] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            <h3 className="text-white font-medium mb-1">No projects found</h3>
            <p className="text-[#888888] text-sm">Try adjusting your search or filters.</p>
         </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card hoverable className="h-full bg-[#111111] flex flex-col border-[#222222] hover:border-[#FFD700]/40 group cursor-pointer transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-[#888888] uppercase tracking-wider">{project.type}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
                
                <p className="text-xs text-[#555555] mb-6 flex items-center gap-1.5 mt-auto">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Updated {project.lastUpdated}
                </p>

                {/* Footer Section of Card */}
                <div className="pt-4 mt-auto border-t border-[#222222] flex justify-between items-center group-hover:border-[#333333] transition-colors">
                  {/* Tech Stack */}
                  <div className="flex gap-1.5">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="text-[10px] text-[#888888] bg-[#1A1A1A] px-2 py-1 rounded border border-[#333333]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Members */}
                  <div className="flex -space-x-2">
                    {project.members.map((member, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#111111] ${member.color}`}>
                        {member.init}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create Project Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
        footer={
           <>
              <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Create Project</Button>
           </>
        }
      >
        <div className="space-y-4">
           <Input 
             label="Project Name" 
             placeholder="e.g. Acme Dashboard Rewrite" 
             fullWidth 
           />
           <div className="flex flex-col gap-1.5">
             <label className="text-sm font-medium text-gray-300">Description</label>
             <textarea 
               className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md block w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3 placeholder:text-[#555555] min-h-[100px]"
               placeholder="Briefly describe what this project is about..."
             ></textarea>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-300">Project Type</label>
                 <select className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md block w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3">
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Fullstack</option>
                    <option>Mobile</option>
                 </select>
              </div>
              <Input 
                label="Primary Tech" 
                placeholder="e.g. React" 
                fullWidth 
              />
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
