import { Link } from 'react-router-dom';
import { Film, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface MainNavbarProps {
  transparent?: boolean;
}

const MainNavbar = ({ transparent = false }: MainNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'customer':
        return '/dashboard';
      case 'videographer':
        return '/videographer';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-colors duration-300 ${
      transparent ? 'bg-transparent' : 'bg-black/90 backdrop-blur-md shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-white tracking-tight">
                NORTH<br />BOUND
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/packages">Packages</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              
              {user ? (
                <Link 
                  to={getDashboardLink()}
                  className="text-white font-medium hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="text-white font-medium hover:text-gray-300 transition-colors"
                >
                  Sign In / Sign Up
                </Link>
              )}
              
              <Link
                to="http://calendly.com/seedlingstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Book A Call
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
            <MobileNavLink to="/portfolio" onClick={toggleMenu}>Portfolio</MobileNavLink>
            <MobileNavLink to="/services" onClick={toggleMenu}>Services</MobileNavLink>
            <MobileNavLink to="/packages" onClick={toggleMenu}>Packages</MobileNavLink>
            <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
            
            {user ? (
              <MobileNavLink to={getDashboardLink()} onClick={toggleMenu}>
                Dashboard
              </MobileNavLink>
            ) : (
              <MobileNavLink to="/login" onClick={toggleMenu}>
                Sign In / Sign Up
              </MobileNavLink>
            )}
            
            <div className="pt-4">
              <Link
                to="http://calendly.com/seedlingstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
                onClick={toggleMenu}
              >
                Book A Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="text-white font-medium hover:text-gray-300 transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link 
    to={to}
    className="block py-2 px-3 text-white font-medium hover:bg-gray-700 rounded-md transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default MainNavbar;