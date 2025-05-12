import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Film,
  User,
  LogOut,
  Folder,
  Box,
  FileText,
  HelpCircle,
  Settings,
  BarChart4,
  DollarSign,
  Users,
  FileVideo,
  Server,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const DashboardNavbar = () => {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const basePath = `/${user.role === 'customer' ? 'dashboard' : user.role === 'videographer' ? 'videographer' : 'admin'}`;
  
  const navItems: NavItem[] = [
    // Customer items
    { 
      name: 'My Projects', 
      path: `${basePath}/projects`, 
      icon: <Folder size={20} />, 
      roles: ['customer'] 
    },
    { 
      name: 'My Assets', 
      path: `${basePath}/assets`, 
      icon: <Box size={20} />, 
      roles: ['customer'] 
    },
    { 
      name: 'Usage & Billing', 
      path: `${basePath}/usage`, 
      icon: <BarChart4 size={20} />, 
      roles: ['customer'] 
    },
    { 
      name: 'Invoices', 
      path: `${basePath}/invoices`, 
      icon: <FileText size={20} />, 
      roles: ['customer'] 
    },
    
    // Videographer items
    { 
      name: 'Assigned Projects', 
      path: `${basePath}/assigned`, 
      icon: <Folder size={20} />, 
      roles: ['videographer'] 
    },
    { 
      name: 'Uploaded Work', 
      path: `${basePath}/uploads`, 
      icon: <FileVideo size={20} />, 
      roles: ['videographer'] 
    },
    { 
      name: 'Project Guidelines', 
      path: `${basePath}/guidelines`, 
      icon: <FileText size={20} />, 
      roles: ['videographer'] 
    },
    { 
      name: 'Payouts', 
      path: `${basePath}/payouts`, 
      icon: <Wallet size={20} />, 
      roles: ['videographer'] 
    },
    { 
      name: 'Usage & Storage', 
      path: `${basePath}/usage`, 
      icon: <BarChart4 size={20} />, 
      roles: ['videographer'] 
    },
    
    // Admin items
    { 
      name: 'Overview', 
      path: `${basePath}/overview`, 
      icon: <BarChart4 size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Customers', 
      path: `${basePath}/customers`, 
      icon: <Users size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Projects', 
      path: `${basePath}/projects`, 
      icon: <Folder size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Videographers', 
      path: `${basePath}/videographers`, 
      icon: <Film size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Assets', 
      path: `${basePath}/assets`, 
      icon: <Box size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Usage & Billing', 
      path: `${basePath}/usage`, 
      icon: <BarChart4 size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'Payouts', 
      path: `${basePath}/payouts`, 
      icon: <DollarSign size={20} />, 
      roles: ['admin'] 
    },
    { 
      name: 'System Logs', 
      path: `${basePath}/logs`, 
      icon: <Server size={20} />, 
      roles: ['admin'] 
    },
    
    // Common items
    { 
      name: 'Support', 
      path: `${basePath}/support`, 
      icon: <HelpCircle size={20} />, 
      roles: ['customer', 'videographer', 'admin'] 
    },
    { 
      name: 'Profile & Settings', 
      path: `${basePath}/profile`, 
      icon: <Settings size={20} />, 
      roles: ['customer', 'videographer', 'admin'] 
    },
  ];

  const filteredNavItems = navItems.filter(
    item => item.roles.includes(user.role)
  );

  return (
    <div className={`h-screen bg-gray-900 text-white ${
      expanded ? 'w-64' : 'w-20'
    } transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 flex items-center">
        <Link to="/" className="flex items-center">
          <div className={`text-lg font-bold text-white tracking-tight transition-all duration-300 ${
            expanded ? 'text-left' : 'text-center'
          }`}>
            {expanded ? (
              <>NORTH<br />BOUND</>
            ) : (
              <>N<br />B</>
            )}
          </div>
        </Link>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {expanded && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* User section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
          {expanded && (
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className={`mt-4 flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
            !expanded ? 'justify-center' : ''
          }`}
        >
          <LogOut size={20} />
          {expanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;