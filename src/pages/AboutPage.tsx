import { useEffect } from 'react';
import MainNavbar from '../components/navigation/MainNavbar';
import { Film, Users, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              src="https://assets.mixkit.co/videos/preview/mixkit-set-of-cameras-in-a-studio-32831-large.mp4"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-cameras-in-a-studio-32831-large.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Crafting cinematic experiences that capture the essence of your vision
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To revolutionize video production by combining cutting-edge technology with artistic vision,
                delivering exceptional content that exceeds expectations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Film className="h-8 w-8 text-blue-600" />,
                  title: "Premium Production",
                  description: "State-of-the-art equipment and techniques for unmatched quality"
                },
                {
                  icon: <Users className="h-8 w-8 text-green-600" />,
                  title: "Expert Team",
                  description: "Industry veterans with decades of combined experience"
                },
                {
                  icon: <Award className="h-8 w-8 text-purple-600" />,
                  title: "Award Winning",
                  description: "Recognized excellence in video production and storytelling"
                },
                {
                  icon: <Globe className="h-8 w-8 text-red-600" />,
                  title: "Global Reach",
                  description: "Serving clients worldwide with local expertise"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="inline-block p-3 bg-gray-50 rounded-lg mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate professionals dedicated to bringing your vision to life
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Jerome Palencia",
                  role: "Founder / Creative Director",
                  image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                },
                {
                  name: "Toby Morning",
                  role: "Chief Strategist / CTO",
                  image: "https://drive.google.com/uc?export=view&id=1q0qInP6JG5-HRt_NwX2twRmxRSIeGCFr"
                },
                {
                  name: "Emily Rodriguez",
                  role: "Lead Cinematographer / Post-Production Lead",
                  image: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "50+", label: "Industry Awards" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "20+", label: "Years Experience" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;