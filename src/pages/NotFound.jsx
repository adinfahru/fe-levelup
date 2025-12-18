import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  // Get user from localStorage to determine redirect
  const getUserRole = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.role;
      }
    } catch {
      return null;
    }
    return null;
  };

  const role = getUserRole();
  const dashboardPath =
    role === 'Admin'
      ? '/admin/users'
      : role === 'Manager'
        ? '/manager/dashboard'
        : role === 'Employee'
          ? '/employee/dashboard'
          : '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={dashboardPath}>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="pt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
