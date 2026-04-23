import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const skills = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL'];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: 'John Doe',
    title: 'Full Stack Engineer',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    bio: 'Passionate developer with 7+ years building high-scale SaaS products. Love clean code, great UX, and collaborative teams.',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const stats = [
    { label: 'Projects', value: '12' },
    { label: 'Tasks Done', value: '142' },
    { label: 'Commits', value: '834' },
    { label: 'Lines Added', value: '24K' },
  ];

  const activity = [
    { action: 'Merged PR', target: '#42 — Auth Refactor', time: '2 hours ago' },
    { action: 'Closed issue', target: '#88 — Fix login loop', time: '5 hours ago' },
    { action: 'Pushed to', target: 'main (3 commits)', time: '1 day ago' },
    { action: 'Reviewed', target: 'API Gateway PR', time: '2 days ago' },
    { action: 'Created project', target: 'Mobile App v2', time: '3 days ago' },
  ];

  return (
    <div className="pb-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#0A0A0A] border border-[#222222]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.15),transparent_60%)]"></div>
        <div className="absolute -bottom-12 left-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-[#FFD700] flex items-center justify-center text-black font-display font-extrabold text-3xl shadow-[0_0_30px_rgba(255,215,0,0.3)] border-4 border-[#0A0A0A]">
              JD
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0A0A0A]"></div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant={isEditing ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Profile
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Profile Info */}
        <div className="space-y-6">
          <Card className="bg-[#111111] border-[#222222]">
            {isEditing ? (
              <div className="space-y-4">
                <Input label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth />
                <Input label="Job Title" name="title" value={form.title} onChange={handleChange} fullWidth />
                <Input label="Location" name="location" value={form.location} onChange={handleChange} fullWidth />
                <Input label="Website" name="website" value={form.website} onChange={handleChange} fullWidth />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300">Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3 placeholder:text-[#555555] min-h-[100px] resize-none"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-display font-bold text-white">{form.name}</h2>
                <p className="text-sm text-[#FFD700] font-medium mb-1">{form.title}</p>
                <p className="text-sm text-[#888888] mt-3 leading-relaxed">{form.bio}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#888888]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {form.location}
                  </div>
                  <div className="flex items-center gap-2 text-[#888888]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    {form.email}
                  </div>
                  <div className="flex items-center gap-2 text-[#888888]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <a href={form.website} className="text-[#FFD700] hover:underline">{form.website}</a>
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Skills */}
          <Card className="bg-[#111111] border-[#222222]">
            <h3 className="font-display font-bold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#1A1A1A] text-[#CCCCCC] border border-[#333333] hover:border-[#FFD700]/50 hover:text-[#FFD700] transition-colors cursor-default">
                  {skill}
                </span>
              ))}
              {isEditing && (
                <button className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 hover:bg-[#FFD700]/20 transition-colors">
                  + Add Skill
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT: Stats + Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} hoverable className="bg-[#111111] border-[#222222] text-center">
                <p className="text-3xl font-display font-bold text-[#FFD700]">{stat.value}</p>
                <p className="text-xs text-[#888888] mt-1 uppercase tracking-wider">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-[#111111] border-[#222222]">
            <h3 className="font-display font-bold text-white mb-6">Recent Activity</h3>
            <div className="relative pl-6 space-y-5 before:absolute before:inset-0 before:left-[10px] before:w-px before:bg-[#222222]">
              {activity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative group"
                >
                  <div className="absolute -left-10 w-5 h-5 rounded-full bg-[#1A1A1A] border-2 border-[#333333] group-hover:border-[#FFD700] z-10 transition-colors flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#555555] group-hover:bg-[#FFD700] transition-colors"></div>
                  </div>
                  <div>
                    <p className="text-sm text-[#CCCCCC]">
                      <span className="text-[#888888]">{item.action}</span>{' '}
                      <span className="font-medium text-white">{item.target}</span>
                    </p>
                    <p className="text-xs text-[#555555] mt-0.5 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
