import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardNavbar from '../../components/navigation/DashboardNavbar';
import Projects from './customer/Projects';
import Assets from './customer/assets';
import Usage from './customer/usage';
import Invoices from './customer/invoices';
import Support from './customer/support';
import Profile from './customer/profile';
import ProjectWizard from './customer/ProjectWizard';
import ProjectDetail from './customer/ProjectDetail';

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardNavbar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/projects" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<ProjectWizard />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;