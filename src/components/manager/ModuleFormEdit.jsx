import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionFormEdit from './SectionFormEdit';
import { modulesAPI } from '@/api/modules.api';
import { useNavigate } from '@tanstack/react-router';

export default function ModuleFormEdit({ moduleId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [sections, setSections] = useState([]);
  const [originalSectionCount, setOriginalSectionCount] = useState(0);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        setLoading(true);
        const data = await modulesAPI.getById(moduleId);
        setModuleTitle(data.title || '');
        setModuleDesc(data.description || '');
        setEstimatedDays(data.estimatedDays || '');

        // Transform items to sections format
        const transformedSections = (data.items || [])
          .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
          .map((item) => ({
            id: item.id,
            title: item.title || '',
            description: item.descriptions || '', // API uses "descriptions" (plural)
            url: item.url || '',
            orderIndex: item.orderIndex,
            isFinalSubmission: item.isFinalSubmission || false,
          }));

        setSections(transformedSections);
        setOriginalSectionCount(transformedSections.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) {
      fetchModule();
    }
  }, [moduleId]);

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
  };

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

    // Check if items were added or deleted
    const itemsChanged = sections.length !== originalSectionCount;
    const hasNewItems = sections.some((s) => !s.id);

    try {
      setSubmitting(true);
      setError(null);

      // Re-fetch latest module data to get current activeCount
      // (activeCount might have changed since page load)
      const latestModule = await modulesAPI.getById(moduleId);
      const currentActiveCount = latestModule.activeCount || 0;

      // If module has active enrollments, block add/delete items
      if (currentActiveCount > 0 && (itemsChanged || hasNewItems)) {
        alert(
          `❌ Cannot add or delete items\n\n` +
            `This module currently has ${currentActiveCount} active enrollment(s).\n\n` +
            `You can only update existing items. Wait until all enrollments are completed or paused before adding/deleting items.`
        );
        setSubmitting(false);
        return;
      }

      // 1. Update module basic info
      const moduleData = {
        title: moduleTitle.trim(),
        description: moduleDesc.trim(),
        estimatedDays: days,
        isActive: false, // Keep as inactive when editing
      };

      await modulesAPI.update(moduleId, moduleData);

      // 2. Update/Add items
      // Note: API uses "descriptions" (plural) not "description"
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        if (section.id) {
          // Update existing item
          // Only include non-empty optional fields
          const updateItemPayload = {
            title: section.title,
            isFinalSubmission: i === sections.length - 1,
          };

          // Only include descriptions and url if not empty
          if (section.description && section.description.trim()) {
            updateItemPayload.descriptions = section.description.trim();
          }
          if (section.url && section.url.trim()) {
            updateItemPayload.url = section.url.trim();
          }

          console.log('Updating item payload:', updateItemPayload); // Debug
          await modulesAPI.updateItem(moduleId, section.id, updateItemPayload);
        } else {
          // Add new item (only allowed if activeCount === 0)
          // Remove empty optional fields for backend validation
          const addItemPayload = {
            title: section.title,
            orderIndex: i + 1,
            isFinalSubmission: i === sections.length - 1,
          };

          // Only include descriptions and url if not empty
          if (section.description && section.description.trim()) {
            addItemPayload.descriptions = section.description.trim();
          }
          if (section.url && section.url.trim()) {
            addItemPayload.url = section.url.trim();
          }

          console.log('Adding item payload:', addItemPayload); // Debug
          await modulesAPI.addItem(moduleId, addItemPayload);
        }
      }

      // 3. Delete removed items (compare with original)
      // TODO: Implement delete logic if needed

      // Navigate back to module detail
      navigate({ to: '/manager/module/detail', search: { id: moduleId } });
    } catch (err) {
      setError(err.message);

      // Parse error message for better UX
      let errorMessage = err.message;

      if (
        errorMessage.includes('ongoing enrollments') ||
        errorMessage.includes('ongoing enrollment')
      ) {
        errorMessage =
          `❌ Cannot add items to this module\n\n` +
          `This module currently has active enrollments.\n\n` +
          `Please wait until all enrollments are completed or paused before adding new items.\n\n` +
          `Backend error: ${err.message}`;
      }

      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-gray-500">Loading module data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error && !submitting) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-red-500">Error: {error}</p>
          <Button onClick={() => navigate({ to: '/manager/modules' })} className="mt-4">
            Back to Modules
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Module</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Module Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="moduleTitle">Module Title *</Label>
              <Input
                id="moduleTitle"
                placeholder="Enter module title (max 200 characters)"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                maxLength={200}
                required
              />
            </div>
            <div>
              <Label htmlFor="moduleDesc">Module Description</Label>
              <Textarea
                id="moduleDesc"
                placeholder="Enter module description (max 2000 characters)"
                value={moduleDesc}
                onChange={(e) => setModuleDesc(e.target.value)}
                maxLength={2000}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="estimatedDays">Estimated Days *</Label>
              <Input
                id="estimatedDays"
                type="number"
                placeholder="Enter estimated days (1-365)"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                min={1}
                max={365}
                required
              />
            </div>
          </div>

          {/* Section Form */}
          <SectionFormEdit sections={sections} onSectionsChange={handleSectionsChange} />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit & Cancel */}
          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Module'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/manager/module/detail', search: { id: moduleId } })}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
