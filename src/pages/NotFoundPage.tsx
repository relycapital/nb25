import { Link } from 'react-router-dom';
import MainNavbar from '../components/navigation/MainNavbar';

const NotFoundPage = () => {
  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;