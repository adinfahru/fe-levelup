import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SectionFormCreate({ sections, onSectionsChange }) {
  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    onSectionsChange(newSections);
  };

  const addSection = () => {
    onSectionsChange([...sections, { title: "", description: "", url: "" }]);
  };

  const removeSection = (index) => {
    onSectionsChange(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Section Learning</Label>
        <Button type="button" onClick={addSection}>
          Tambah Section
        </Button>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Section {index + 1}</span>
            {sections.length > 1 && (
              <Button type="button" variant="destructive" size="sm" onClick={() => removeSection(index)}>
                Hapus
              </Button>
            )}
          </div>

          <div>
            <Label htmlFor={`sectionTitle-${index}`}>Judul Section</Label>
            <Input
              id={`sectionTitle-${index}`}
              placeholder="Judul section"
              value={section.title}
              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`sectionDesc-${index}`}>Deskripsi Section</Label>
            <Textarea
              id={`sectionDesc-${index}`}
              placeholder="Deskripsi section"
              value={section.description}
              onChange={(e) => handleSectionChange(index, "description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`sectionUrl-${index}`}>URL Materi (optional)</Label>
            <Input
              id={`sectionUrl-${index}`}
              placeholder="URL materi"
              value={section.url}
              onChange={(e) => handleSectionChange(index, "url", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
