import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = () => {
  // In a real app, this would check an auth context or token
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1A1A1A] p-6 text-white min-h-full">
            <div className="max-w-7xl mx-auto w-full h-full">
              <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
