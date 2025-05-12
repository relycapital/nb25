import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Project } from '../../../types';

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Company Introduction Video',
    createdAt: '2025-05-15',
    status: 'in_progress',
    scriptCompleted: true,
    assetsCount: 12,
    storageUsed: 2.4,
    transferRate: 1.2,
    customerId: 'user123',
    videographerId: 'video456'
  },
  {
    id: '4',
    title: 'Social Media Advertisement',
    createdAt: '2025-04-05',
    status: 'review',
    scriptCompleted: true,
    assetsCount: 8,
    storageUsed: 1.6,
    transferRate: 0.8,
    customerId: 'user123',
    videographerId: 'video456'
  },
  {
    id: '5',
    title: 'Product Demo Video',
    createdAt: '2025-05-20',
    status: 'approved',
    scriptCompleted: true,
    assetsCount: 5,
    storageUsed: 1.2,
    transferRate: 0.5,
    customerId: 'user789',
    videographerId: 'video456'
  }
];

const AssignedProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'estimating': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'revision': return 'bg-pink-100 text-pink-800';
      case 'complete': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_progress': return 'In Progress';
      case 'draft': return 'Draft';
      case 'submitted': return 'Submitted';
      case 'estimating': return 'Estimating';
      case 'approved': return 'Approved';
      case 'review': return 'In Review';
      case 'revision': return 'Needs Revision';
      case 'complete': return 'Completed';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Projects</h1>
          <p className="mt-1 text-gray-500">Manage your video production assignments</p>
        </div>
      </div>
      
      {/* Alert for new assignments */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You have a new project assigned! Please review the details and confirm your availability.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
              showFilter
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </button>
        </div>
      </div>
      
      {/* Status Filter */}
      {showFilter && (
        <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Filter by Status</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                statusFilter === null
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {['approved', 'in_progress', 'review', 'revision', 'complete'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-sm ${
                  statusFilter === status
                    ? 'bg-gray-800 text-white'
                    : `${getStatusColor(status)} hover:opacity-80`
                }`}
              >
                {getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No projects assigned to you yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <li key={project.id}>
                <Link
                  to={`/videographer/assigned/${project.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1 min-w-0 mb-3 md:mb-0">
                        <div className="flex items-center">
                          <h3 className="text-base font-medium text-gray-900 truncate mr-3">{project.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Assigned: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium">
                            {project.status === 'approved' ? 'Due in 7 days' : project.status === 'in_progress' ? 'Due in 5 days' : project.status === 'review' ? 'In review' : ''}
                          </span>
                        </div>
                        
                        <button
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            alert('Contact button clicked');
                          }}
                        >
                          Contact Producer
                        </button>
                        
                        <button
                          className="px-3 py-1 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            alert('Download button clicked');
                          }}
                        >
                          {project.status === 'approved' ? 'Download Brief' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssignedProjects;