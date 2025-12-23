import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/assets/logo.png';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
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
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-indigo-100 via-white to-indigo-200
        relative
      "
    >
      {/* soft background glow */}
      <div
        className="
          absolute -top-40 -right-40
          h-96 w-96
          rounded-full
          bg-indigo-300/30
          blur-3xl
        "
      />

      <div className="w-full max-w-md relative z-10">
        <div
          className="
            bg-white/80 backdrop-blur-xl
            border border-white/40
            rounded-2xl
            shadow-xl
            p-8 space-y-6
          "
        >
          {/* LOGO */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src={Logo}
              alt="LevelUp Logo"
              className="h-14 w-auto"
            />
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-600">
                Sign in to your LevelUp account
              </p>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="
                    absolute inset-y-0 right-0
                    flex items-center pr-3
                    text-gray-500 hover:text-gray-700
                  "
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-indigo-600 hover:bg-indigo-700
                text-white
              "
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* FOOTER */}
          <div className="text-center text-sm">
            <Link
              to="/"
              className="text-indigo-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
