import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionFormCreate from './SectionFormCreate';
import { modulesAPI } from '@/api/modules.api';

export default function ModuleFormCreate() {
  const navigate = useNavigate();
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [estimatedDays, setEstimatedDays] = useState(7);
  const [sections, setSections] = useState([
    { title: '', description: '', url: '', isFinalSubmission: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare items with orderIndex and set last item as final submission
      // Only include optional fields (description, url) if they have values
      const items = sections.map((section, index) => {
        const item = {
          title: section.title,
          orderIndex: index + 1,
          isFinalSubmission: index === sections.length - 1, // Last item is final submission
        };

        // Only add optional fields if they're not empty
        if (section.description?.trim()) {
          item.descriptions = section.description.trim();
        }
        if (section.url?.trim()) {
          item.url = section.url.trim();
        }

        return item;
      });

      const moduleData = {
        title: moduleTitle,
        description: moduleDesc,
        estimatedDays: parseInt(estimatedDays),
        items,
      };

      await modulesAPI.create(moduleData);

      // Redirect to module list
      navigate({ to: '/manager/modules' });
    } catch (err) {
      setError(err.message || 'Failed to create module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Modul Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="moduleTitle">Judul Modul *</Label>
              <Input
                id="moduleTitle"
                placeholder="Masukkan judul modul"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                required
                maxLength={200}
              />
            </div>
            <div>
              <Label htmlFor="moduleDesc">Deskripsi Modul</Label>
              <Textarea
                id="moduleDesc"
                placeholder="Masukkan deskripsi modul"
                value={moduleDesc}
                onChange={(e) => setModuleDesc(e.target.value)}
                maxLength={2000}
              />
            </div>
            <div>
              <Label htmlFor="estimatedDays">Estimated Days *</Label>
              <Input
                id="estimatedDays"
                type="number"
                min="1"
                max="365"
                placeholder="Estimasi hari untuk menyelesaikan modul"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                required
              />
            </div>
          </div>

          <SectionFormCreate sections={sections} onSectionsChange={handleSectionsChange} />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Simpan Modul'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/manager/modules' })}
              disabled={loading}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
