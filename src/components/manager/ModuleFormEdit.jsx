import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionFormEdit from './SectionFormEdit';
import { modulesAPI } from '@/api/modules.api';

export default function ModuleFormEdit({ moduleId }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [sections, setSections] = useState([]);
  const [originalSectionIds, setOriginalSectionIds] = useState([]);
  const handleSectionsChange = (newSections) => setSections(newSections);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await modulesAPI.getById(moduleId);

        setModuleTitle(data.title || '');
        setModuleDesc(data.description || '');
        setEstimatedDays(data.estimatedDays || '');

        const transformed = (data.items || [])
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((item) => ({
            id: item.id,
            title: item.title || '',
            description: item.descriptions || '',
            url: item.url || '',
            isFinalSubmission: item.isFinalSubmission,
          }));

        setSections(transformed);
        setOriginalSectionIds(transformed.map((s) => s.id).filter(Boolean));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) fetchModule();
  }, [moduleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!moduleTitle.trim() || moduleTitle.length > 200) {
      alert('Module title is required and must be less than 200 characters');
      return;
    }

    if (moduleDesc.length > 2000) {
      alert('Description must be less than 2000 characters');
      return;
    }

    const days = parseInt(estimatedDays);
    if (!days || days < 1 || days > 365) {
      alert('Estimated days must be between 1 and 365');
      return;
    }

    // Detect added or removed items by comparing IDs
    const currentIds = sections.map((s) => s.id).filter(Boolean);
    const removedIds = originalSectionIds.filter((id) => !currentIds.includes(id));
    const itemsRemoved = removedIds.length > 0;
    const hasNewItems = sections.some((s) => !s.id);

    try {
      setSubmitting(true);
      setError(null);

      // Re-fetch latest module data to get current activeCount
      // (activeCount might have changed since page load)
      const latestModule = await modulesAPI.getById(moduleId);
      const currentActiveCount = latestModule.activeCount || 0;

      // If module has active enrollments, block add/delete items
      if (currentActiveCount > 0 && (itemsRemoved || hasNewItems)) {
        alert(
          `❌ Cannot add or delete items\n\n` +
            `This module currently has ${currentActiveCount} active enrollment(s).\n\n` +
            `You can only update existing items. Wait until all enrollments are completed or paused before adding/deleting items.`
        );
        return;
      }

      // 1. Update module basic info
      await modulesAPI.update(moduleId, {
        title: moduleTitle.trim(),
        description: moduleDesc.trim(),
        estimatedDays: days,
        isActive: false,
      });

      // 2. Update/Add items
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];

        if (s.id) {
          await modulesAPI.updateItem(moduleId, s.id, {
            title: s.title,
            isFinalSubmission: i === sections.length - 1,
            ...(s.description && { descriptions: s.description }),
            ...(s.url && { url: s.url }),
          });
        } else {
          await modulesAPI.addItem(moduleId, {
            title: s.title,
            orderIndex: i + 1,
            isFinalSubmission: i === sections.length - 1,
            ...(s.description && { descriptions: s.description }),
            ...(s.url && { url: s.url }),
          });
        }
      }

      // 3. Delete removed items (compare with original)
      if (removedIds.length > 0) {
        for (const removedId of removedIds) {
          try {
            await modulesAPI.deleteItem(moduleId, removedId);
          } catch (delErr) {
            console.error('Failed to delete item', removedId, delErr);
            throw delErr;
          }
        }
      }

      // Navigate back to module detail
      navigate({ to: '/manager/module/detail', search: { id: moduleId } });
    } catch (err) {
      let errorMessage = err.message || 'An unknown error occurred';

      if (
        errorMessage.includes('ongoing enrollments') ||
        errorMessage.includes('ongoing enrollment') ||
        errorMessage.includes('active enrollments') ||
        errorMessage.includes('active enrollment')
      ) {
        errorMessage =
          `❌ Cannot modify module\n\n` +
          `This module currently has active enrollments.\n\n` +
          `Please wait until all enrollments are completed or paused before making changes.\n\n` +
          `Backend error: ${err.message}`;
      } else if (errorMessage.includes('Error 400') || errorMessage.trim() === '') {
        errorMessage =
          `❌ Update failed\n\n` +
          `This might be due to active enrollments or invalid data.\n\n` +
          `Please check if there are active users enrolled in this module and try again later.\n\n`;
      }

      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-[-6px_8px_18px_rgba(15,23,42,0.15)]">
        <CardContent className="p-8 text-center text-gray-500">Loading module data...</CardContent>
      </Card>
    );
  }

  if (error && !submitting) {
    return (
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-[-6px_8px_18px_rgba(15,23,42,0.15)]">
        <CardContent className="p-8 text-center text-red-600">{error}</CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* ===== MODULE INFO ===== */}
      <Card
        className="
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-[-6px_8px_18px_rgba(15,23,42,0.15)]
        "
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Module Information</CardTitle>
          <p className="text-sm text-gray-600">Update basic module information</p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Module Title *</Label>
            <Input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} required />
          </div>

          <div>
            <Label>Estimated Days *</Label>
            <Input
              type="number"
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea rows={4} value={moduleDesc} onChange={(e) => setModuleDesc(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* ===== SECTIONS ===== */}
      <SectionFormEdit sections={sections} onSectionsChange={handleSectionsChange} />

      {/* ===== ACTIONS ===== */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {submitting ? 'Updating...' : 'Update Module'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            navigate({
              to: '/manager/module/detail',
              search: { id: moduleId },
            })
          }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
