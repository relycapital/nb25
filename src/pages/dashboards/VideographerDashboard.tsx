import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardNavbar from '../../components/navigation/DashboardNavbar';
import AssignedProjects from './videographer/AssignedProjects';
import UploadedWork from './videographer/UploadedWork';
import Guidelines from './videographer/Guidelines';
import Payouts from './videographer/Payouts';
import Support from './videographer/Support';
import Profile from './videographer/Profile';
import ProjectDetail from './videographer/ProjectDetail';

const VideographerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardNavbar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/videographer/assigned" replace />} />
            <Route path="/assigned" element={<AssignedProjects />} />
            <Route path="/assigned/:id" element={<ProjectDetail />} />
            <Route path="/uploads" element={<UploadedWork />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default VideographerDashboard;