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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare payload - only send fields that exist in formData
      const payload = { ...formData };

      // For edit mode: remove password field unless it has a non-empty value
      if (user?.accountId) {
        if (!payload.password || payload.password.trim() === '') {
          // Edit mode and no new password - remove password field entirely
          delete payload.password;
        }
        // else: user entered a new password, keep it
      }

      // Validate required fields
      if (!payload.firstName || !payload.lastName || !payload.email) {
        setError('First name, last name, and email are required');
        setLoading(false);
        return;
      }

      // For create mode: password is required
      if (!user?.accountId && (!payload.password || payload.password.trim() === '')) {
        setError('Password is required for new users');
        setLoading(false);
        return;
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
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl">
      {/* Status Badge - Only show in edit mode */}
      {user?.accountId && (
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-medium">Status:</span>
          {user.isActive ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Inactive
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            maxLength={100}
          />
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            maxLength={100}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">
          Password{' '}
          {user?.accountId && (
            <span className="text-gray-500 text-xs">(leave empty to keep current)</span>
          )}
        </Label>
        <Input
          id="password"
          name="password"
          type="text"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder={
            user?.accountId ? 'Leave empty to keep current password' : 'Minimum 8 characters'
          }
          required={!user?.accountId}
          minLength={8}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Role */}
        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Position */}
        <div>
          <Label htmlFor="position">Position</Label>
          <Select value={formData.positionId} onValueChange={handlePositionChange}>
            <SelectTrigger id="position">
              <SelectValue placeholder="Select position" />
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading || activating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? 'Saving...' : user?.accountId ? 'Update User' : 'Create User'}
        </Button>

        {/* Activate Button - Only show in edit mode when user is inactive */}
        {user?.accountId && !user.isActive && (
          <Button
            type="button"
            disabled={loading || activating}
            onClick={handleActivate}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {activating ? 'Activating...' : 'Activate User'}
          </Button>
        )}

        <Button type="button" variant="outline" onClick={onCancel} disabled={loading || activating}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
