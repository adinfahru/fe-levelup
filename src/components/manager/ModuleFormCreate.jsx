import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionFormCreate from "./SectionFormCreate";

export default function ModuleFormCreate() {
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [sections, setSections] = useState([{ title: "", description: "", url: "" }]);

  const handleSectionsChange = (newSections) => {
    setSections(newSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const moduleData = { title: moduleTitle, description: moduleDesc, sections };
    console.log("Module data:", moduleData);
    // panggil API save modul di sini
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

          <SectionFormCreate sections={sections} onSectionsChange={handleSectionsChange} />

          <div className="flex gap-3">
            <Button type="submit">Simpan Modul</Button>
            <Button type="button" variant="outline">Batal</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
