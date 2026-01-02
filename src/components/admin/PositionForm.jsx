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
  <div className="max-w-6xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="
        border rounded-2xl overflow-hidden shadow-xl bg-white 
        grid grid-cols-1 md:grid-cols-2
      "
    >
      {/* ================= LEFT FORM ================= */}
      <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {position?.id ? "Edit Position" : "Create New Position"}
          </h2>
          <p className="text-sm text-gray-500">
            Manage company job roles and titles
          </p>
        </div>

        {/* STATUS */}
        {position?.id && (
          <div>
            {position?.isActive ? (
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

        {/* INPUT */}
        <div>
          <Label htmlFor="title">Position Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Backend Engineer"
            required
            maxLength={100}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading
              ? "Saving..."
              : position?.id
              ? "Update Position"
              : "Create Position"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          {position?.id && !position?.isActive && (
            <Button
              type="button"
              disabled={loading}
              onClick={handleActivate}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Activating..." : "Activate Position"}
            </Button>
          )}
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="
        hidden md:flex flex-col items-center justify-center 
        bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500
        relative px-6
      ">
        {/* Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>

        {/* White Circle */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white shadow-2xl
          flex items-center justify-center">

          <svg
            width="110"
            height="110"
            viewBox="0 0 24 24"
            fill="none"
            className="text-indigo-600 drop-shadow-xl"
          >
            <path
              d="M6 7h12M6 12h12M6 17h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Floating shapes */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/30 rounded-full
            backdrop-blur-md border border-white/40 shadow-lg"></div>

          <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white/30 rounded-xl rotate-12
            backdrop-blur-md border border-white/40 shadow-lg"></div>
        </div>

        {/* Text */}
        <h3 className="mt-10 text-white font-semibold text-xl sm:text-2xl
          text-center leading-snug drop-shadow-lg">
          Organize Roles
          <br />
          Build Strong Teams ⭐
        </h3>
      </div>
    </form>
  </div>
);

}
