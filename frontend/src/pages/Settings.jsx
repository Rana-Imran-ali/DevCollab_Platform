import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true, push: false, mentions: true, updates: false,
  });
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 'appearance', label: 'Appearance', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg> },
    { id: 'notifications', label: 'Notifications', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg> },
    { id: 'security', label: 'Security', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ];

  const Toggle = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-[#222222] last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-[#888888] mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#FFD700]' : 'bg-[#333333]'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}></div>
      </button>
    </div>
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="pb-10 animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">Settings</h1>
        <p className="text-[#888888] text-sm">Manage your account preferences and configuration.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <nav className="md:w-52 shrink-0">
          <div className="bg-[#111111] border border-[#222222] rounded-xl p-2 flex md:flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#FFD700]/10 text-[#FFD700]'
                    : 'text-[#888888] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content Panel */}
        <div className="flex-1 space-y-6">

          {/* Account Tab */}
          {activeTab === 'account' && (
            <Card className="bg-[#111111] border-[#222222]">
              <h2 className="font-display font-bold text-lg text-white mb-6">Account Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" fullWidth />
                  <Input label="Last Name" defaultValue="Doe" fullWidth />
                </div>
                <Input label="Email Address" type="email" defaultValue="john@example.com" fullWidth />
                <Input label="Username" defaultValue="johndoe" fullWidth />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-300">Timezone</label>
                  <select className="bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700] py-2.5 px-3">
                    <option>Pacific Time (US & Canada) — UTC-8</option>
                    <option>Eastern Time (US & Canada) — UTC-5</option>
                    <option>UTC+0</option>
                    <option>Central European Time — UTC+1</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center pt-4 border-t border-[#222222]">
                <p className={`text-sm font-medium transition-opacity duration-300 ${saved ? 'text-green-500 opacity-100' : 'opacity-0'}`}>
                  ✓ Changes saved successfully
                </p>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
              </div>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card className="bg-[#111111] border-[#222222]">
              <h2 className="font-display font-bold text-lg text-white mb-6">Appearance</h2>

              <div className="mb-6">
                <p className="text-sm font-medium text-white mb-4">Theme</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsDark(true)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${isDark ? 'border-[#FFD700]' : 'border-[#333333] hover:border-[#555555]'}`}
                  >
                    <div className="w-full h-20 rounded-lg bg-[#0A0A0A] border border-[#333333] mb-3 flex flex-col gap-1 p-2 overflow-hidden">
                      <div className="h-2 w-3/4 rounded bg-[#333333]"></div>
                      <div className="h-2 w-1/2 rounded bg-[#FFD700]/50"></div>
                      <div className="h-2 w-2/3 rounded bg-[#222222]"></div>
                    </div>
                    <p className={`text-sm font-bold ${isDark ? 'text-[#FFD700]' : 'text-white'}`}>Dark Mode</p>
                    <p className="text-xs text-[#888888]">Easy on the eyes at night</p>
                  </button>
                  <button
                    onClick={() => setIsDark(false)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${!isDark ? 'border-[#FFD700]' : 'border-[#333333] hover:border-[#555555]'}`}
                  >
                    <div className="w-full h-20 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0] mb-3 flex flex-col gap-1 p-2 overflow-hidden">
                      <div className="h-2 w-3/4 rounded bg-[#CCCCCC]"></div>
                      <div className="h-2 w-1/2 rounded bg-[#FFD700]"></div>
                      <div className="h-2 w-2/3 rounded bg-[#DDDDDD]"></div>
                    </div>
                    <p className={`text-sm font-bold ${!isDark ? 'text-[#FFD700]' : 'text-white'}`}>Light Mode</p>
                    <p className="text-xs text-[#888888]">Clean and bright interface</p>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#222222] pt-6">
                <p className="text-sm font-medium text-white mb-4">Accent Color</p>
                <div className="flex gap-3">
                  {['#FFD700', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F97316'].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === '#FFD700' ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="bg-[#111111] border-[#222222]">
              <h2 className="font-display font-bold text-lg text-white mb-2">Notification Preferences</h2>
              <p className="text-sm text-[#888888] mb-6">Choose how and when you'd like to be notified.</p>
              <Toggle
                label="Email Notifications"
                description="Receive summaries and alerts directly to your inbox."
                checked={notifications.email}
                onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
              />
              <Toggle
                label="Push Notifications"
                description="Get real-time alerts via browser push notifications."
                checked={notifications.push}
                onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
              />
              <Toggle
                label="Mentions & Replies"
                description="Get notified when someone @mentions you."
                checked={notifications.mentions}
                onChange={() => setNotifications({ ...notifications, mentions: !notifications.mentions })}
              />
              <Toggle
                label="Platform Updates"
                description="News about new features and product releases."
                checked={notifications.updates}
                onChange={() => setNotifications({ ...notifications, updates: !notifications.updates })}
              />
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card className="bg-[#111111] border-[#222222]">
                <h2 className="font-display font-bold text-lg text-white mb-6">Change Password</h2>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" fullWidth />
                  <Input label="New Password" type="password" placeholder="••••••••" helperText="Must be at least 8 characters." fullWidth />
                  <Input label="Confirm New Password" type="password" placeholder="••••••••" fullWidth />
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="primary">Update Password</Button>
                </div>
              </Card>

              <Card className="bg-[#111111] border-[#222222]">
                <h2 className="font-display font-bold text-lg text-white mb-2">Two-Factor Authentication</h2>
                <p className="text-sm text-[#888888] mb-6">Add an extra layer of security by requiring a verification code each time you log in.</p>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1A1A] border border-[#333333]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Authenticator App</p>
                      <p className="text-xs text-green-500 font-medium">Enabled</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </Card>

              <Card className="bg-[#111111] border-red-900/40">
                <h2 className="font-display font-bold text-lg text-red-500 mb-2">Danger Zone</h2>
                <p className="text-sm text-[#888888] mb-6">Permanent actions that cannot be undone. Proceed with caution.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="border-red-900/60 text-red-500 hover:bg-red-500/10 hover:border-red-500">
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="border-red-900/60 text-red-500 hover:bg-red-500/10 hover:border-red-500">
                    Delete Account Permanently
                  </Button>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
