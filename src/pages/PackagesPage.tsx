import { useEffect } from 'react';
import MainNavbar from '../components/navigation/MainNavbar';
import { Check, Film, Camera, Video, Users, Clock, HardDrive, Award } from 'lucide-react';

const PackagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      name: 'Basic',
      description: 'Perfect for social media content and simple promotional videos',
      price: '1,499',
      features: [
        'Up to 2 minutes final video',
        'Professional videographer',
        '4K video quality',
        'Basic color grading',
        'Simple editing',
        '1 round of revisions',
        'Delivery in 5 business days'
      ],
      popular: false
    },
    {
      name: 'Premium',
      description: 'Ideal for commercials, corporate videos, and multi-platform content',
      price: '3,999',
      features: [
        'Up to 5 minutes final video',
        'Director & videographer team',
        '4K video quality',
        'Advanced color grading',
        'Complex editing with motion graphics',
        '2 rounds of revisions',
        'Original music license',
        'Delivery in 10 business days'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for high-end productions and documentaries',
      price: '7,999',
      features: [
        'Up to 10 minutes final video',
        'Full production crew',
        '4K video quality',
        'Premium color grading',
        'Advanced editing with custom animations',
        '3 rounds of revisions',
        'Original music composition',
        'Talent casting assistance',
        'Delivery in 15 business days'
      ],
      popular: false
    }
  ];

  const features = [
    {
      icon: <Film className="h-6 w-6 text-blue-600" />,
      title: '4K Quality',
      description: 'Ultra-high definition video capture'
    },
    {
      icon: <Camera className="h-6 w-6 text-green-600" />,
      title: 'Professional Equipment',
      description: 'State-of-the-art cameras and gear'
    },
    {
      icon: <Video className="h-6 w-6 text-purple-600" />,
      title: 'Expert Editing',
      description: 'Professional post-production'
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: 'Dedicated Team',
      description: 'Experienced production crew'
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-600" />,
      title: 'Quick Turnaround',
      description: 'Fast delivery times'
    },
    {
      icon: <HardDrive className="h-6 w-6 text-indigo-600" />,
      title: 'File Delivery',
      description: 'Multiple format options'
    },
    {
      icon: <Award className="h-6 w-6 text-pink-600" />,
      title: 'Quality Guarantee',
      description: 'Satisfaction assured'
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
              src="https://assets.mixkit.co/videos/preview/mixkit-recording-a-singer-in-a-studio-34472-large.mp4"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-recording-a-singer-in-a-studio-34472-large.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Video Production Packages
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Professional video solutions for every budget and need
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-sm border ${
                  pkg.popular ? 'border-black' : 'border-gray-200'
                } overflow-hidden`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                    <span className="text-gray-600 ml-2">per project</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={`block w-full text-center py-3 px-4 rounded-md font-medium transition-colors ${
                      pkg.popular
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Included in All Packages</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every package comes with our premium features and quality guarantee
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Common questions about our video production packages
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: 'What is included in the final delivery?',
                answer: 'All packages include the final edited video in multiple formats optimized for different platforms (web, social media, broadcast), raw footage, and project files upon request.'
              },
              {
                question: 'How long does the production process take?',
                answer: 'Production timelines vary by package and project complexity. Basic packages typically take 5 business days, Premium 10 days, and Enterprise 15 days from final shoot to delivery.'
              },
              {
                question: 'Can I customize a package?',
                answer: "Yes! We can customize any package to meet your specific needs. Contact us to discuss your requirements and we'll create a tailored solution."
              },
              {
                question: 'What if I need revisions?',
                answer: 'Each package includes a specified number of revision rounds. Additional revisions can be purchased if needed.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your video production needs and find the perfect package for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:bg-gray-100 transition-colors"
              >
                Get in Touch
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

export default PackagesPage;