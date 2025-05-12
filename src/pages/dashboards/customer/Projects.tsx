import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, Grid, List, Search, ChevronRight, FileCheck } from 'lucide-react';
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
    id: '2',
    title: 'Product Launch Commercial',
    createdAt: '2025-04-28',
    status: 'draft',
    scriptCompleted: false,
    assetsCount: 3,
    storageUsed: 0.5,
    transferRate: 0.2,
    customerId: 'user123'
  },
  {
    id: '3',
    title: 'Annual Conference Recap',
    createdAt: '2025-03-12',
    status: 'complete',
    scriptCompleted: true,
    assetsCount: 45,
    storageUsed: 12.8,
    transferRate: 5.4,
    customerId: 'user123',
    videographerId: 'video789'
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
  }
];

const Projects = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
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
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="mt-1 text-gray-500">Manage your video production projects</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link
            to="/dashboard/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
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
          
          <div className="border border-gray-300 rounded-md">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-l-md ${
                view === 'grid'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-r-md ${
                view === 'list'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
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
            {['draft', 'submitted', 'estimating', 'approved', 'in_progress', 'review', 'revision', 'complete'].map(status => (
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
      
      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No projects found. Create a new project to get started.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Link
              key={project.id}
              to={`/dashboard/projects/${project.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{project.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    {project.scriptCompleted ? (
                      <FileCheck className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <div className="h-4 w-4 border border-gray-300 rounded mr-1"></div>
                    )}
                    <span>Script</span>
                  </div>
                  
                  <div>
                    <span className="font-medium">{project.assetsCount}</span> assets
                  </div>
                  
                  <div>
                    <span className="font-medium">{project.storageUsed.toFixed(1)}</span> GB
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 text-sm text-gray-700 flex justify-between items-center">
                <span>View Project</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <li key={project.id}>
                <Link
                  to={`/dashboard/projects/${project.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 truncate">{project.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-center text-sm">
                          <span className="text-gray-500">Assets</span>
                          <span className="font-medium">{project.assetsCount}</span>
                        </div>
                        
                        <div className="flex flex-col items-center text-sm">
                          <span className="text-gray-500">Storage</span>
                          <span className="font-medium">{project.storageUsed.toFixed(1)} GB</span>
                        </div>
                        
                        <div className="flex flex-col items-center text-sm">
                          <span className="text-gray-500">Transfer</span>
                          <span className="font-medium">{project.transferRate.toFixed(1)} GB</span>
                        </div>
                        
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                        
                        <ChevronRight className="h-5 w-5 text-gray-400" />
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

export default Projects;