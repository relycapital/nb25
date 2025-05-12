import { useState } from 'react';
import { Search, Filter, Upload, Video, Clock, CheckCircle, AlertCircle, Download, Share2, Trash2 } from 'lucide-react';

interface UploadedWork {
  id: string;
  title: string;
  projectId: string;
  client: string;
  uploadDate: string;
  status: 'pending_review' | 'approved' | 'needs_revision';
  fileSize: string;
  duration: string;
  thumbnail: string;
}

const UploadedWork = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Mock data
  const uploads: UploadedWork[] = [
    {
      id: '1',
      title: 'Final Cut - Company Introduction.mp4',
      projectId: 'P1001',
      client: 'TechCorp Inc.',
      uploadDate: '2025-03-15',
      status: 'pending_review',
      fileSize: '2.4 GB',
      duration: '2:45',
      thumbnail: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg'
    },
    {
      id: '2',
      title: 'Product Demo - Final Version.mp4',
      projectId: 'P1002',
      client: 'InnovateX',
      uploadDate: '2025-03-14',
      status: 'approved',
      fileSize: '1.8 GB',
      duration: '1:30',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg'
    },
    {
      id: '3',
      title: 'Event Highlights - Draft 1.mp4',
      projectId: 'P1003',
      client: 'Global Events',
      uploadDate: '2025-03-13',
      status: 'needs_revision',
      fileSize: '3.2 GB',
      duration: '4:15',
      thumbnail: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'
    }
  ];

  const filteredUploads = uploads.filter(upload => {
    const matchesSearch = upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || upload.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'needs_revision':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'Pending Review';
      case 'approved':
        return 'Approved';
      case 'needs_revision':
        return 'Needs Revision';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Uploaded Work</h1>
          <p className="mt-1 text-gray-500">Manage and track your video submissions</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Video
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search uploads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStatusFilter(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                !statusFilter ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending_review')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                statusFilter === 'pending_review' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                statusFilter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter('needs_revision')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                statusFilter === 'needs_revision' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Needs Revision
            </button>
          </div>
        </div>
      </div>

      {/* Uploads Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUploads.map((upload) => (
          <div
            key={upload.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="aspect-video relative">
              <img
                src={upload.thumbnail}
                alt={upload.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm">
                {upload.duration}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">{upload.title}</h3>
                  <p className="text-sm text-gray-500">{upload.client}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                  {getStatusLabel(upload.status)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>Uploaded {new Date(upload.uploadDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{upload.fileSize}</span>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Guidelines */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Guidelines</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <Video className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Supported Formats</h3>
              <p className="mt-1 text-sm text-gray-500">MP4, MOV, AVI (max 10GB)</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quality Requirements</h3>
              <p className="mt-1 text-sm text-gray-500">Minimum 1080p, 4K preferred</p>
            </div>
          </div>
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-gray-400 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">Review Process</h3>
              <p className="mt-1 text-sm text-gray-500">24-48 hours for initial review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedWork;