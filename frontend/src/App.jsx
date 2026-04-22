import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

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
          {/* Add more protected routes here like:
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
        
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
