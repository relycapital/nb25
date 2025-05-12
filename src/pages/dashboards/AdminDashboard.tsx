import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardNavbar from '../../components/navigation/DashboardNavbar';
import Overview from './admin/Overview';
import Customers from './admin/Customers';
import Projects from './admin/Projects';
import Videographers from './admin/Videographers';
import Assets from './admin/Assets';
import Usage from './admin/Usage';
import Payouts from './admin/Payouts';
import SystemLogs from './admin/SystemLogs';
import Support from './admin/Support';
import Settings from './admin/Settings';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardNavbar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/overview" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/videographers" element={<Videographers />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard