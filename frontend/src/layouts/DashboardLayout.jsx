import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';

const DashboardLayout = () => {
  // In a real app, this would check an auth context or token
  const isAuthenticated = true;
  const user = { name: "John Doe", email: "john@example.com", initials: "JD" };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> },
    { name: 'Projects', href: '/projects', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> },
    { name: 'Tasks', href: '/tasks', badge: '12', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
    { name: 'Chat', href: '/chat', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { name: 'Team', href: '/team', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { name: 'Settings', href: '/settings', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-2.82.33v.1a2 2 0 0 1-4 0v-.1a1.65 1.65 0 0 0-2.82-.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-2.82 1.65 1.65 0 0 0-.33-2.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 2.82-.33v-.1a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 2.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 2.82z"/></svg> },
  ];

  const sidebarFooter = (
    <div className="rounded-lg bg-[#1A1A1A] p-4 text-center border border-[#3A3A3A]">
        <h4 className="text-sm font-bold text-white mb-1">Pro Plan Active</h4>
        <p className="text-xs text-[#888888] mb-3">12 days remaining</p>
        <Button variant="primary" size="sm" className="w-full">Upgrade Now</Button>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar - using the reusable component */}
      <Sidebar 
        items={navItems} 
        logoText="DevCollab" 
        footer={sidebarFooter}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - passing user forces it into auth mode */}
        <Navbar 
          user={user}
          onSearch={(query) => console.log("Searching...", query)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#111111] p-6 text-white min-h-full">
            <div className="max-w-[1400px] mx-auto w-full h-full">
              <Outlet context={{ user }} />
            </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
