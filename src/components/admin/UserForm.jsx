import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { usersAPI } from '@/api/users.api';
import { positionsAPI } from '@/api/positions.api';

export default function UserForm({ user, onSuccess, onCancel, positions }) {
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState('');
  const [allPositions, setAllPositions] = useState(positions || []);

  // Prepare initial form data - exclude password for edit mode
  const initialFormData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'Employee',
    positionId: user?.positionId || '',
  };

  // Only include password field for create mode
  if (!user?.accountId) {
    initialFormData.password = '';
  }

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!positions || positions.length === 0) {
      // Fetch positions if not provided
      positionsAPI.getAll().then(setAllPositions).catch(console.error);
    }
  }, [positions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handlePositionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      positionId: value,
    }));
  };

  const handleActivate = async () => {
    setError('');
    setActivating(true);

    try {
      await usersAPI.activate(user.accountId);
      setActivating(false);
      onSuccess?.();
    } catch (err) {
      console.error('Activate error:', err);
      setError(err.message || 'Failed to activate user');
      setActivating(false);
    }
  };

  const validatePassword = (pwd) => {
    // Min 8 chars, at least 1 uppercase and 1 symbol
    return pwd && pwd.length >= 8 && /[A-Z]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...formData };

      if (user?.accountId) {
        if (!payload.password || payload.password.trim() === '') {
          // Edit mode and no new password - remove password field entirely
          delete payload.password;
        } else {
          // Validate new password
          if (!validatePassword(payload.password)) {
            setError('Password minimal 8 karakter, ada simbol, dan 1 huruf besar');
            setLoading(false);
            return;
          }
        }
      }

      // Validate required fields
      if (!payload.firstName || !payload.lastName || !payload.email) {
        setError('First name, last name, and email are required');
        setLoading(false);
        return;
      }

      // For create mode: password is required
      if (!user?.accountId) {
        if (!payload.password || payload.password.trim() === '') {
          setError('Password is required for new users');
          setLoading(false);
          return;
        }
        if (!validatePassword(payload.password)) {
          setError('Password minimal 8 karakter, ada simbol, dan 1 huruf besar');
          setLoading(false);
          return;
        }
      }

      // Ensure positionId is a valid UUID or null
      if (!payload.positionId || payload.positionId === '' || payload.positionId === '__NA') {
        delete payload.positionId;
      }

      if (user?.accountId) {
        // Update user
        await usersAPI.update(user.accountId, payload);
      } else {
        // Create user
        await usersAPI.create(payload);
      }

      setLoading(false);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

return (
  <div className="max-w-5xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="border rounded-2xl overflow-hidden shadow-xl bg-white grid grid-cols-1 md:grid-cols-2"
    >
      {/* LEFT - FORM */}
      <div className="p-8 space-y-8">

        {/* Title */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.accountId ? "Edit User" : "Create New User"}
          </h2>
          <p className="text-sm text-gray-500">
            Manage user data, role and account status
          </p>
        </div>

        {/* STATUS */}
        {user?.accountId && (
          <div>
            {user.isActive ? (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Inactive
              </span>
            )}
          </div>
        )}

        {/* FORM FIELDS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. John"
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
            />
          </div>
        </div>

        <div>
          <Label>Email</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder={
              user?.accountId
                ? "Leave blank to keep current password"
                : "Min 8 chars, 1 uppercase & symbol"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Position</Label>
            <Select value={formData.positionId} onValueChange={handlePositionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select position (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__NA">N/A</SelectItem>
                {allPositions.map((pos) => (
                  <SelectItem key={pos.id} value={pos.id}>
                    {pos.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-between pt-4">
          {user?.accountId && !user.isActive && (
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleActivate}
            >
              Activate User
            </Button>
          )}

          <div className="ml-auto flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {user?.accountId ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT DECORATION PANEL */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 relative">
        <div className="absolute w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>
        <div className="w-72 h-72 rounded-full bg-white shadow-2xl flex items-center justify-center relative">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            className="text-indigo-600 drop-shadow-xl"
          >
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M4 20c0-4 4-6 8-6s8 2 8 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute -top-3 -left-3 w-10 h-10 bg-white/30 rounded-full backdrop-blur-md border border-white/40 shadow-md"></div>
          <div className="absolute -bottom-4 right-4 w-14 h-14 bg-white/30 rounded-xl rotate-12 backdrop-blur-md border border-white/40 shadow-md"></div>
        </div>

        <h3 className="absolute bottom-10 text-white font-semibold text-xl text-center px-6">
          Manage your users
          <br />
          with confidence ✨
        </h3>
      </div>

    </form>
  </div>
);

}
