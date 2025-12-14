import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { positionsAPI } from '@/api/positions.api';

export default function PositionForm({ position, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: position?.title || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (position?.id) {
        // Update position
        await positionsAPI.update(position.id, formData);
      } else {
        // Create position
        await positionsAPI.create(formData);
      }

      setLoading(false);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!position?.id) return;

    setError('');
    setLoading(true);

    try {
      await positionsAPI.update(position.id, { isActive: true });
      setLoading(false);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to activate position');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-md">
      {/* Title */}
      <div>
        <Label htmlFor="title">Position Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Senior Developer"
          required
          maxLength={100}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4 flex-wrap">
        <Button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? 'Saving...' : position?.id ? 'Update Position' : 'Create Position'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>

        {/* Activate Button - Only show if position exists and is inactive */}
        {position?.id && !position?.isActive && (
          <Button
            type="button"
            onClick={handleActivate}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? 'Activating...' : 'Activate Position'}
          </Button>
        )}
      </div>
    </form>
  );
}
