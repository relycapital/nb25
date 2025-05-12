import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Image,
  HardDrive,
  Upload,
  MessageSquare,
  Edit,
  ArrowLeft
} from 'lucide-react';
import { Project } from '../../../types';

// Mock data
const mockProjects: Record<string, Project> = {
  '1': {
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
  '2': {
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
  '3': {
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
  '4': {
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
};

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ProjectDetail = () => {
  const { id = '' } = useParams<{ id: string }>();
  const project = mockProjects[id];
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4">Project not found</p>
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
    );
  }
  
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
  
  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'script', label: 'Script', icon: <FileText className="h-5 w-5" /> },
    { id: 'assets', label: 'Assets', icon: <Image className="h-5 w-5" /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive className="h-5 w-5" /> },
    { id: 'deliverables', label: 'Deliverables', icon: <Upload className="h-5 w-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> }
  ];

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center text-gray-700 hover:text-black mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
              <span className="ml-4 text-sm text-gray-500 flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Timeline</div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Est. completion in 10 days</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Assets</div>
                <div>
                  <span className="text-xl font-medium">{project.assetsCount}</span> files
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Storage Used</div>
                <div>
                  <span className="text-xl font-medium">{project.storageUsed.toFixed(1)}</span> GB
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Progress</h3>
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-black h-full rounded-full"
                  style={{ width: '40%' }}
                ></div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <div className={`h-4 w-4 rounded-full ${project.scriptCompleted ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                  <span className="text-sm">Script</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Assets</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Production</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-sm">Delivery</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-3 bg-gray-50">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Videographer assigned to your project
                        </p>
                        <p className="text-sm text-gray-500">
                          John Doe will be handling your video production
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 text-sm text-gray-500">
                        2 days ago
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Production schedule confirmed
                        </p>
                        <p className="text-sm text-gray-500">
                          Filming will begin on June 2nd, 2025
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 text-sm text-gray-500">
                        3 days ago
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Script approved
                        </p>
                        <p className="text-sm text-gray-500">
                          Your script has been reviewed and approved by the production team
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 text-sm text-gray-500">
                        5 days ago
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Project created
                        </p>
                        <p className="text-sm text-gray-500">
                          You created this project
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'script' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Project Script</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-900">
                <Edit className="mr-2 h-4 w-4" />
                Edit Script
              </button>
            </div>
            
            {project.scriptCompleted ? (
              <div className="prose max-w-none">
                <h1>Company Introduction Video</h1>
                <h2>Opening Scene</h2>
                <p>
                  <em>[Aerial shot of city skyline, gradually zooming in on company headquarters]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "In today's fast-paced digital world, innovation isn't just an advantage—it's a necessity."
                </p>
                <p>
                  <em>[Cut to busy office environment with employees collaborating]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "At TechCorp, we've been at the forefront of digital transformation for over 15 years, helping businesses like yours navigate the complex landscape of technology."
                </p>
                <h2>Problem Statement</h2>
                <p>
                  <em>[Series of short clips showing business challenges]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "In an era of unprecedented change, businesses face challenges unlike any before. Legacy systems that can't keep pace. Data silos that hinder collaboration. Security threats that evolve by the minute."
                </p>
                <h2>Solution</h2>
                <p>
                  <em>[Transition to product demonstration]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "Our flagship platform, TechCore, brings together cutting-edge AI, seamless integration capabilities, and bank-level security—all in one intuitive solution."
                </p>
                <h2>Closing</h2>
                <p>
                  <em>[Return to office environment, showing diverse team members]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "With a team of over 200 experts across 15 countries, we're more than just a technology provider—we're your partner in progress."
                </p>
                <p>
                  <em>[Cut to logo with tagline]</em>
                </p>
                <p>
                  <strong>Narrator:</strong> "TechCorp. Technology that transforms."
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Script Added Yet</h3>
                <p className="text-gray-500 mb-4">
                  Add a script to help our team understand your vision for the video.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Script
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'assets' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Project Assets</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-900">
                <Upload className="mr-2 h-4 w-4" />
                Upload Assets
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-700">Your Uploads</h4>
                <span className="text-sm text-gray-500">8 items</span>
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3, 4].map(item => (
                    <li key={item} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                          <Image className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item === 1 ? 'company_logo.png' : item === 2 ? 'office_exterior.jpg' : item === 3 ? 'team_photo.jpg' : 'product_demo.mp4'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item === 4 ? '24.5 MB' : `${(item * 0.8).toFixed(1)} MB`} · Uploaded {item} day{item !== 1 ? 's' : ''} ago
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button className="text-sm text-black hover:text-gray-700">
                            Download
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-700">North Bound Files</h4>
                <span className="text-sm text-gray-500">4 items</span>
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3, 4].map(item => (
                    <li key={item} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                          <Image className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item === 1 ? 'shot_list.pdf' : item === 2 ? 'storyboard_v1.pdf' : item === 3 ? 'production_schedule.xlsx' : 'filming_locations.jpg'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(item * 0.5).toFixed(1)} MB · Added {item + 3} days ago
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button className="text-sm text-black hover:text-gray-700">
                            Download
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'overview' && activeTab !== 'script' && activeTab !== 'assets' && (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-500">
              This feature is currently under development.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;