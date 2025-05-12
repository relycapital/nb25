import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Film,
  Calendar,
  Clock,
  Upload,
  MessageSquare,
  CheckCircle,
  FileText,
  Image,
  Video,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  title: string;
  type: string;
  status: string;
  client: string;
  shootDate: string;
  duration: string;
  deadline: string;
  description: string;
  requirements: string[];
  deliverables: string[];
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const project: ProjectDetail = {
    id: id || '',
    title: 'Company Introduction Video',
    type: 'Corporate',
    status: 'in_progress',
    client: 'TechCorp Inc.',
    shootDate: '2025-06-15',
    duration: '6 hours',
    deadline: '2025-06-30',
    description: 'Create a professional company introduction video highlighting TechCorp\'s innovative solutions and company culture.',
    requirements: [
      'Professional lighting setup required',
      'Multiple camera angles',
      'Interviews with key staff members',
      'B-roll of office environment',
      'Drone shots of headquarters (weather permitting)'
    ],
    deliverables: [
      'Full edited video (5-7 minutes)',
      'Social media cuts (30s, 60s)',
      'Raw footage archive',
      'Project files'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/videographer/assigned"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{project.title}</h1>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          In Progress
        </span>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Project Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Project Type</p>
                <p className="font-medium">{project.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shoot Date</p>
                <p className="font-medium">{new Date(project.shootDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-3">
              {project.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Deliverables</h2>
            <ul className="space-y-3">
              {project.deliverables.map((del, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
                <Upload className="h-4 w-4 mr-2" />
                Upload Content
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Client
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Download Brief
              </button>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Shoot Date</span>
                </div>
                <span className="text-sm font-medium">{new Date(project.shootDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Deadline</span>
                </div>
                <span className="text-sm font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Project Files */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Project Files</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">Project Brief.pdf</span>
                </div>
                <Download className="h-4 w-4 text-gray-500 cursor-pointer" />
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Image className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">Style Guide.pdf</span>
                </div>
                <Download className="h-4 w-4 text-gray-500 cursor-pointer" />
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Video className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">Reference Video.mp4</span>
                </div>
                <Download className="h-4 w-4 text-gray-500 cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;