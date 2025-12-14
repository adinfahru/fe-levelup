import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionFormEdit from './SectionFormEdit';

export default function ModuleFormEdit() {
  // contoh data modul yang diedit (bisa diganti dengan fetch API)
  const existingModule = {
    title: '.Net Learning Path 1',
    description: 'Deskripsi modul awal',
    sections: [
      { title: 'Section 1', description: 'Deskripsi section 1', url: 'https://example.com/1' },
      { title: 'Section 2', description: 'Deskripsi section 2', url: 'https://example.com/2' },
    ],
  };

  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setModuleTitle(existingModule.title);
    setModuleDesc(existingModule.description);
    setSections(existingModule.sections);
  }, []);

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedModule = { title: moduleTitle, description: moduleDesc, sections };
    console.log('Updated module data:', updatedModule);
    // panggil API update modul di sini
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Modul</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Modul Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="moduleTitle">Judul Modul</Label>
              <Input
                id="moduleTitle"
                placeholder="Masukkan judul modul"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="moduleDesc">Deskripsi Modul</Label>
              <Textarea
                id="moduleDesc"
                placeholder="Masukkan deskripsi modul"
                value={moduleDesc}
                onChange={(e) => setModuleDesc(e.target.value)}
              />
            </div>
          </div>

          {/* Section Form */}
          <SectionFormEdit sections={sections} onSectionsChange={handleSectionsChange} />

          {/* Submit & Cancel */}
          <div className="flex gap-3">
            <Button type="submit">Update Modul</Button>
            <Button type="button" variant="outline">
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
