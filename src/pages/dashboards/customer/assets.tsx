import { useState } from 'react';
import { Search, Filter, Upload, FolderOpen, Image, Video, FileText, Download, Trash2, Share2 } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadedAt: string;
  url: string;
  thumbnail?: string;
}

const Assets = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Mock data
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Product Demo Final.mp4',
      type: 'video',
      size: '256 MB',
      uploadedAt: '2025-03-15',
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg'
    },
    {
      id: '2',
      name: 'Company Logo.png',
      type: 'image',
      size: '2.4 MB',
      uploadedAt: '2025-03-14',
      url: '#',
      thumbnail: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg'
    },
    {
      id: '3',
      name: 'Script Draft.pdf',
      type: 'document',
      size: '1.2 MB',
      uploadedAt: '2025-03-13',
      url: '#'
    }
    // Add more mock assets as needed
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || asset.type === selectedType;
    return matchesSearch && matchesType;
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
        return <FolderOpen className="h-6 w-6" />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets Library</h1>
          <p className="mt-1 text-gray-500">Manage your project assets and files</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
            <Upload className="mr-2 h-4 w-4" />
            Upload Assets
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
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
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                !selectedType ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('image')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                selectedType === 'image' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                selectedType === 'video' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedType('document')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                selectedType === 'document' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Documents
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredAssets.length === 0 ? (
          <div className="p-8 text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assets found</h3>
            <p className="mt-1 text-sm text-gray-500">Upload new assets or try a different search.</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="aspect-video rounded-md overflow-hidden bg-gray-200 mb-4">
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
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">{asset.name}</h3>
                    <p className="text-sm text-gray-500">{asset.size}</p>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-md hover:bg-gray-200">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-200">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-200">
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;