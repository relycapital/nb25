import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainNavbar from '../components/navigation/MainNavbar';
import { Film, Camera, UserCog } from 'lucide-react';
import { UserRole } from '../types';

interface AuthPageProps {
  type: 'login' | 'signup';
}

const AuthPage = ({ type }: AuthPageProps) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const roleOptions = [
    { value: 'customer', label: 'Customer', icon: <Film size={20} />, description: 'I need video production services' },
    { value: 'videographer', label: 'Videographer', icon: <Camera size={20} />, description: 'I\'m a videographer looking for work (80% revenue share)' },
    { value: 'admin', label: 'Admin', icon: <UserCog size={20} />, description: 'Studio administrator' }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password, role);
      }
      
      // Redirect based on role
      const routeMap: Record<UserRole, string> = {
        customer: '/dashboard',
        videographer: '/videographer',
        admin: '/admin'
      };
      
      navigate(routeMap[role]);
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {type === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {type === 'login' ? (
                <>
                  Or{' '}
                  <Link to="/signup" className="font-medium text-black hover:text-gray-800">
                    create a new account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-black hover:text-gray-800">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {type === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              
              {type === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <div className="space-y-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`w-full flex items-center p-3 border rounded-lg ${
                          role === option.value
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setRole(option.value as UserRole)}
                      >
                        <div className="flex-shrink-0">
                          {option.icon}
                        </div>
                        <div className="ml-3 text-left">
                          <p className="font-medium">{option.label}</p>
                          <p className={`text-sm ${role === option.value ? 'text-gray-300' : 'text-gray-500'}`}>
                            {option.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading
                  ? 'Processing...'
                  : type === 'login'
                  ? 'Sign in'
                  : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;