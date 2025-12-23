import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Welcome to <span className="text-indigo-600">LevelUp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Employee Development Management System
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Empower employee with structured learning paths, track progress, and achieve
            professional growth together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === 'Admin'
                      ? '/admin/users'
                      : user?.role === 'Manager'
                        ? '/manager/dashboard'
                        : '/employee/dashboard'
                  }
                >
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                    Login <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Structured Learning</h3>
            <p className="text-gray-600">
              Access carefully curated training modules designed to accelerate professional growth
              and skill development.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Track Progress</h3>
            <p className="text-gray-600">
              Monitor learning progress in real-time with detailed analytics and milestone tracking
              for continuous improvement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Employee Management</h3>
            <p className="text-gray-600">
              Empower managers to oversee employee, review submissions, and provide
              meaningful feedback.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 Metrodata. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
