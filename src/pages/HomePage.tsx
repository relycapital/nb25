import { useEffect, useState, useRef } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import MainNavbar from '../components/navigation/MainNavbar';

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToContent = () => {
    const heroHeight = heroRef.current?.offsetHeight || 0;
    window.scrollTo({
      top: heroHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <MainNavbar transparent={!scrolled} />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-cine-camera-33840-large.mp4"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-filming-with-a-cine-camera-33840-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Premium Video Production <br className="hidden md:block" />
            <span className="text-white/90">For Every Story</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            North Bound Films creates stunning cinematic experiences for brands, businesses, and individuals at competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#showreel"
              className="bg-white text-black px-8 py-3 rounded-md font-medium flex items-center transition-transform hover:scale-105"
            >
              <Play size={20} className="mr-2" />
              Watch Showreel
            </a>
            <a
              href="http://calendly.com/seedlingstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium transition-transform hover:scale-105"
            >
              Book A Call
            </a>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button
            onClick={scrollToContent}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
      
      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From concept to final delivery, we handle every aspect of video production with exceptional care and attention to detail.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a
                    href="#"
                    className="text-black font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Packages</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Choose from our carefully crafted packages designed to meet your specific video needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-transform hover:scale-105"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                  <p className="text-white/70 mb-6">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${pkg.price}</span>
                    <span className="text-white/70 ml-1">{pkg.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="block w-full text-center bg-white text-black py-3 rounded-md font-medium transition-colors hover:bg-gray-200"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We take pride in our work and the relationships we build with our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 transition-transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear about your project and help bring your vision to life. Book a call with our team today.
              </p>
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Location</h4>
                <address className="not-italic text-gray-600 mb-4">
                  847 Howard Street<br />
                  2nd Floor<br />
                  San Francisco, CA 94107
                </address>
                <a
                  href="http://calendly.com/seedlingstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-medium inline-flex items-center"
                >
                  Book a call with our team
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <iframe
                title="North Bound Films Location"
                className="w-full h-96 rounded-xl shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2197209762377!2d-122.40232768468178!3d37.78299997975756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c18e5684d%3A0x45fee5acf5d5891f!2s847%20Howard%20St%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1651356864559!5m2!1sen!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://drive.google.com/uc?export=view&id=1g2PqIdjYFiSfSvMOCwHSEX0t7kjzHPie" 
                alt="North Bound Films" 
                className="h-10 w-auto mb-4"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const icon = document.createElement('div');
                    parent.appendChild(icon);
                    icon.outerHTML = '<div class="text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 14c-1.23 0-2.42.38-3.5 1.01V7c0-1.66-1.34-3-3-3-1.66 0-3 1.34-3 3v8.99C8.42 14.38 7.23 14 6 14c-3.31 0-6 2.69-6 6v0c0 1.1.9 2 2 2h4l2-3L10 22h4l2-3 2 3h4c1.1 0 2-.9 2-2v0c0-3.31-2.69-6-6-6z"/></svg></div>';
                  }
                }}
              />
              <p className="text-gray-400 mb-4">
                Premium video production services for brands, businesses, and individuals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="/packages" className="text-gray-400 hover:text-white transition-colors">Packages</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Corporate Videos</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Commercials</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Event Coverage</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Social Media Content</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Documentaries</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Music Videos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400 mb-4">
                847 Howard Street<br />
                2nd Floor<br />
                San Francisco, CA 94107
              </address>
              <a
                href="http://calendly.com/seedlingstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium inline-flex items-center hover:underline"
              >
                Book a call with our team
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} North Bound Films. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

// Sample data
const services = [
  {
    title: 'Corporate Videos',
    description: 'Elevate your corporate communications with professional videos that engage your audience and convey your message effectively.',
    image: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Commercials',
    description: 'Create compelling commercials that showcase your products or services and drive sales with our expert production team.',
    image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Event Coverage',
    description: 'Capture the essence of your events with professional videography that preserves the moments and creates lasting memories.',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Social Media Content',
    description: 'Engage your audience with eye-catching social media content that drives engagement and increases your brand visibility.',
    image: 'https://images.pexels.com/photos/3059745/pexels-photo-3059745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Documentaries',
    description: 'Tell compelling stories through beautifully crafted documentaries that captivate viewers and convey powerful messages.',
    image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Music Videos',
    description: 'Bring music to life with visually stunning music videos that showcase artists and create memorable visual experiences.',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const packages = [
  {
    title: 'Basic Package',
    description: 'Perfect for social media content and simple promotional videos.',
    price: '1,499',
    unit: 'per project',
    features: [
      'Up to 2 minutes final video',
      'Professional videographer',
      '4K video quality',
      'Basic color grading',
      'Simple editing',
      '1 round of revisions',
      'Delivery in 5 business days'
    ]
  },
  {
    title: 'Premium Package',
    description: 'Ideal for commercials, corporate videos, and multi-platform content.',
    price: '3,999',
    unit: 'per project',
    features: [
      'Up to 5 minutes final video',
      'Director & videographer team',
      '4K video quality',
      'Advanced color grading',
      'Complex editing with motion graphics',
      '2 rounds of revisions',
      'Original music license',
      'Delivery in 10 business days'
    ]
  },
  {
    title: 'Enterprise Package',
    description: 'Comprehensive solution for high-end productions and documentaries.',
    price: '7,999',
    unit: 'per project',
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
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    quote: 'North Bound Films created an exceptional product video that perfectly captured our brand vision. The team was professional, creative, and delivered beyond our expectations.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Michael Chen',
    company: 'Innovate Solutions',
    quote: 'Working with North Bound was a game-changer for our company. Their corporate video helped us secure major investments and communicate our mission effectively.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Jessica Williams',
    company: 'Fashion Forward',
    quote: 'The commercial North Bound produced for our spring collection exceeded all expectations. Professional, stylish, and delivered on time and on budget.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default HomePage;