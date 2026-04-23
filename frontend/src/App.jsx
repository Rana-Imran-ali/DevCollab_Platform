import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Workspace from './pages/Workspace';
import Chat from './pages/Chat';
import TeamManagement from './pages/TeamManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="chat" element={<Chat />} />
          <Route path="team" element={<TeamManagement />} />
        </Route>

        {/* Standalone Workspaces */}
        <Route path="/workspace/:id" element={<Workspace />} />
        
        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-[100vh] flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
            <h1 className="text-9xl font-bold font-display text-[#FFD700] mb-4">404</h1>
            <h2 className="text-2xl mb-8">Page Not Found</h2>
            <a href="/" className="btn btn-primary">Return Home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
