import { useState, useEffect } from 'react';
import MainNavbar from '../components/navigation/MainNavbar';
import { Play, Filter, Search } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  client: string;
  description: string;
  year: number;
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideo, setShowVideo] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Corporate',
    'Commercial',
    'Event',
    'Documentary',
    'Music Video',
    'Social Media'
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Tech Innovation Summit',
      category: 'Corporate',
      thumbnail: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
      videoUrl: 'https://example.com/video1',
      client: 'TechCorp Inc.',
      description: 'Annual innovation summit highlighting future technologies',
      year: 2025
    },
    {
      id: '2',
      title: 'Summer Collection Launch',
      category: 'Commercial',
      thumbnail: 'https://images.pexels.com/photos/1749057/pexels-photo-1749057.jpeg',
      videoUrl: 'https://example.com/video2',
      client: 'Fashion Forward',
      description: 'Spring/Summer collection campaign',
      year: 2025
    },
    {
      id: '3',
      title: 'Global Music Festival',
      category: 'Event',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      videoUrl: 'https://example.com/video3',
      client: 'Soundwave Events',
      description: 'Three-day music festival coverage',
      year: 2024
    },
    {
      id: '4',
      title: 'Sustainable Living',
      category: 'Documentary',
      thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg',
      videoUrl: 'https://example.com/video4',
      client: 'EcoLife Foundation',
      description: 'Documentary on sustainable living practices',
      year: 2024
    },
    {
      id: '5',
      title: '"Neon Dreams" Music Video',
      category: 'Music Video',
      thumbnail: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
      videoUrl: 'https://example.com/video5',
      client: 'The Midnight',
      description: 'Official music video for "Neon Dreams"',
      year: 2025
    },
    {
      id: '6',
      title: 'Product Launch Campaign',
      category: 'Social Media',
      thumbnail: 'https://images.pexels.com/photos/3059745/pexels-photo-3059745.jpeg',
      videoUrl: 'https://example.com/video6',
      client: 'NextGen Devices',
      description: 'Social media campaign for product launch',
      year: 2025
    }
  ];

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://assets.mixkit.co/videos/preview/mixkit-recording-a-singer-in-a-studio-34472-large.mp4"
            >
              <source 
                src="https://assets.mixkit.co/videos/preview/mixkit-recording-a-singer-in-a-studio-34472-large.mp4" 
                type="video/mp4" 
              />
            </video>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our Work
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A showcase of our finest video productions across various industries
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-black rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setShowVideo(item.id)}
              >
                <div className="aspect-video">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                  <div className="text-sm text-white/70 mb-2">{item.category}</div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/90">{item.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(null)}
          >
            <div className="max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Video player would be implemented here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioPage;