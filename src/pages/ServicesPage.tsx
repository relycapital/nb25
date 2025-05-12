import { useEffect } from 'react';
import MainNavbar from '../components/navigation/MainNavbar';
import { Camera, Film, Video, Users, Edit, PlayCircle, Share2, Award } from 'lucide-react';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Film className="h-8 w-8" />,
      title: 'Corporate Videos',
      description: 'Professional corporate videos that elevate your brand and communicate your message effectively.',
      features: [
        'Brand storytelling',
        'Company culture videos',
        'Product demonstrations',
        'Training materials',
        'Executive communications'
      ],
      price: 'Starting at $2,500'
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Commercial Production',
      description: 'High-impact commercials that drive results and capture audience attention.',
      features: [
        'TV commercials',
        'Web advertisements',
        'Product launches',
        'Brand campaigns',
        'Social media ads'
      ],
      price: 'Starting at $5,000'
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: 'Event Coverage',
      description: 'Comprehensive event documentation that preserves your special moments.',
      features: [
        'Conferences',
        'Weddings',
        'Corporate events',
        'Live streaming',
        'Multi-camera setup'
      ],
      price: 'Starting at $1,500'
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: 'Social Media Content',
      description: 'Engaging social media videos that boost your online presence.',
      features: [
        'Short-form content',
        'Platform-optimized videos',
        'Story highlights',
        'Social ads',
        'Regular content packages'
      ],
      price: 'Starting at $1,000'
    }
  ];

  const specialties = [
    {
      icon: <PlayCircle className="h-6 w-6 text-blue-600" />,
      title: '4K Video Production',
      description: 'Ultra-high definition video capture and editing'
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: 'Expert Team',
      description: 'Seasoned professionals with industry experience'
    },
    {
      icon: <Edit className="h-6 w-6 text-purple-600" />,
      title: 'Custom Solutions',
      description: 'Tailored approaches for unique project needs'
    },
    {
      icon: <Award className="h-6 w-6 text-red-600" />,
      title: 'Award-Winning',
      description: 'Recognized excellence in video production'
    }
  ];

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-cine-camera-33840-large.mp4"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-cine-camera-33840-large.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Professional video production services tailored to your needs
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-8">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{service.price}</span>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 transition-colors"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine technical expertise with creative excellence to deliver outstanding results
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {specialties.map((specialty, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    {specialty.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{specialty.title}</h3>
                  <p className="text-gray-600">{specialty.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your video production needs and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md shadow-sm text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;