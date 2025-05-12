import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, FileText, Image, Video, Trash2, Share2, HardDrive } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  project: string;
  owner: string;
  uploadDate: string;
  status: 'active' | 'archived';
  url: string;
  thumbnail?: string;
}

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Mock data
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Product Demo Final.mp4',
      type: 'video',
      size: '2.4 GB',
      project: 'TechCorp Product Launch',
      owner: 'John Smith',
      uploadDate: '2025-03-15',
      status: 'active',
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg'
    },
    {
      id: '2',
      name: 'Company Logo.png',
      type: 'image',
      size: '1.8 MB',
      project: 'InnovateX Branding',
      owner: 'Emily Chen',
      uploadDate: '2025-03-14',
      status: 'active',
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg'
    },
    {
      id: '3',
      name: 'Script Draft.pdf',
      type: 'document',
      size: '245 KB',
      project: 'Global Events Conference',
      owner: 'Michael Rodriguez',
      uploadDate: '2025-03-13',
      status: 'archived',
      url: '#'
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || asset.type === typeFilter;
    const matchesStatus = !statusFilter || asset.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'document':
        return <FileText className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const totalStorage = assets.reduce((acc, asset) => {
    const size = parseFloat(asset.size.split(' ')[0]);
    const unit = asset.size.split(' ')[1];
    if (unit === 'GB') return acc + size;
    if (unit === 'MB') return acc + size / 1024;
    if (unit === 'KB') return acc + size / (1024 * 1024);
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="mt-1 text-gray-500">Manage and monitor all uploaded assets</p>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <HardDrive className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Total Storage</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">{totalStorage.toFixed(2)} GB</h3>
          <p className="text-sm text-gray-500 mt-1">Across all projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Video Files</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {assets.filter(a => a.type === 'video').length}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Active video assets</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Image className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Images & Docs</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {assets.filter(a => a.type !== 'video').length}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Supporting assets</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTypeFilter(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                !typeFilter ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('video')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setTypeFilter('image')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'image' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setTypeFilter('document')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'document' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Documents
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="aspect-video relative bg-gray-100">
              {asset.thumbnail ? (
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getAssetIcon(asset.type)}
                </div>
              )}
              {asset.type === 'video' && (
                <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-sm">
                  {asset.size}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.project}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Uploaded by {asset.owner}</span>
                <span className="mx-2">•</span>
                <span>{new Date(asset.uploadDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  asset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </span>
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;