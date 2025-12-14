import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    const result = await login(formData);

    if (!result.success) {
      setError(result.error || 'Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your LevelUp account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 text-sm">
          <p className="font-semibold text-gray-700 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-gray-600">
            <p>Admin: admin@levelup.com</p>
            <p>Password: Admin123!</p>
            <p>Manager: manager@levelup.com</p>
            <p>Password: Manager123!</p>
            <p>Employee: employee@levelup.com</p>
            <p>Password: Employee123!</p>
            <p className="text-xs text-gray-500 mt-2">Password: (as per your backend)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
