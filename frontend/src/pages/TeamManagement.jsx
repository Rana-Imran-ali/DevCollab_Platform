import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const TeamManagement = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy team members
  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Owner', lastActive: 'Online now', initials: 'JD', color: 'bg-[#FFD700] text-black' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', lastActive: '5 mins ago', initials: 'SC', color: 'bg-blue-500 text-white' },
    { id: 3, name: 'Alex Rivera', email: 'alex@example.com', role: 'Member', lastActive: '2 hours ago', initials: 'AR', color: 'bg-purple-500 text-white' },
    { id: 4, name: 'Marcus Doe', email: 'marcus@example.com', role: 'Member', lastActive: '1 day ago', initials: 'MD', color: 'bg-green-500 text-white' },
    { id: 5, name: 'Emily Wong', email: 'emily@example.com', role: 'Viewer', lastActive: '1 week ago', initials: 'EW', color: 'bg-pink-500 text-white' },
  ];

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

  return (
    <div className="pb-10 animate-fade-in relative max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">Team Management</h1>
          <p className="text-[#888888] text-sm">Manage who has access to your organization's workspaces.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex">
            Export CSV
          </Button>
          <Button variant="primary" onClick={() => setIsInviteModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Invite Member
          </Button>
        </div>
      </div>

      {/* Plan capacity indicator */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
           </div>
           <div>
              <p className="text-sm font-bold text-white">Seats usage</p>
              <p className="text-xs text-[#888888] mt-0.5">You are currently on the Pro plan.</p>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-baseline gap-1 mb-1">
              <span className="text-xl font-bold text-white">5</span>
              <span className="text-sm text-[#888888]">/ 10 seats</span>
           </div>
           <div className="w-32 h-2 bg-[#222222] rounded-full overflow-hidden">
             <div className="h-full bg-[#FFD700] rounded-full" style={{ width: '50%' }}></div>
           </div>
        </div>
      </div>

      {/* Roster Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full md:w-80">
          <Input 
            placeholder="Search by name or email..." 
            icon={SearchIcon}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A1A] border-[#333333]"
            fullWidth
          />
        </div>
        <div className="flex items-center text-sm font-medium text-[#888888]">
           Showing {filteredMembers.length} active members
        </div>
      </div>

      {/* Grid of Team Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredMembers.map(member => (
          <motion.div key={member.id} variants={itemVariants}>
            <Card hoverable className="bg-[#111111] border-[#222222]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg shadow-lg border border-black/10 ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-snug flex items-center gap-2">
                       {member.name}
                       {member.role === 'Owner' && (
                         <span className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold border border-[#FFD700]/20">Owner</span>
                       )}
                    </h3>
                    <p className="text-xs text-[#888888] mt-0.5">{member.email}</p>
                  </div>
                </div>
                
                {/* Custom select block masquerading as a label for owner to prevent removing self */}
                {member.role === 'Owner' ? (
                  <div className="text-xs text-[#555555] font-bold uppercase tracking-wider px-3">
                     Owner Locked
                  </div>
                ) : (
                  <select 
                    className="bg-transparent border border-[#3A3A3A] text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-[#FFD700] hover:bg-[#1A1A1A] transition-colors appearance-none cursor-pointer text-center font-medium"
                    defaultValue={member.role}
                  >
                    <option value="Admin" className="bg-[#111111]">Admin</option>
                    <option value="Member" className="bg-[#111111]">Member</option>
                    <option value="Viewer" className="bg-[#111111]">Viewer</option>
                    <option value="Remove" className="bg-[#111111] text-red-500">Remove</option>
                  </select>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-[#222222] flex justify-between items-center text-xs">
                <span className="text-[#555555]">Last active: {member.lastActive}</span>
                {member.role !== 'Owner' && (
                   <button className="text-[#888888] hover:text-[#FFD700] transition-colors font-medium flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                      Edit details
                   </button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Invite Modal */}
      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite new users"
        footer={
           <>
              <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Send Invitation</Button>
           </>
        }
      >
        <div className="space-y-6">
           <p className="text-sm text-[#888888]">
              Invited members will instantly get access to all public projects within this organization workspace.
           </p>

           <div className="space-y-4">
              <Input 
                label="Email address" 
                placeholder="colleague@company.com" 
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                fullWidth 
              />
              
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-300">Assign Role</label>
                 <div className="grid grid-cols-2 gap-3 relative z-10">
                    <button 
                       type="button"
                       onClick={() => setInviteRole('Admin')}
                       className={`p-3 rounded-lg border text-left transition-all ${inviteRole === 'Admin' ? 'bg-[#FFD700]/10 border-[#FFD700] ring-1 ring-[#FFD700]' : 'bg-[#1A1A1A] border-[#333333] hover:border-[#555555]'}`}
                    >
                       <p className={`font-bold text-sm mb-1 ${inviteRole === 'Admin' ? 'text-[#FFD700]' : 'text-white'}`}>Admin</p>
                       <p className="text-[10px] text-[#888888]">Full access to manage billing, security, and project deletions.</p>
                    </button>
                    <button 
                       type="button"
                       onClick={() => setInviteRole('Member')}
                       className={`p-3 rounded-lg border text-left transition-all ${inviteRole === 'Member' ? 'bg-[#FFD700]/10 border-[#FFD700] ring-1 ring-[#FFD700]' : 'bg-[#1A1A1A] border-[#333333] hover:border-[#555555]'}`}
                    >
                       <p className={`font-bold text-sm mb-1 ${inviteRole === 'Member' ? 'text-[#FFD700]' : 'text-white'}`}>Member</p>
                       <p className="text-[10px] text-[#888888]">Can edit code, update tasks, and join normal communications.</p>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamManagement;
