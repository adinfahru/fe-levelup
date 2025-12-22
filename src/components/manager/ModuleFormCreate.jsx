import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionFormCreate from "./SectionFormCreate";
import { modulesAPI } from "@/api/modules.api";

export default function ModuleFormCreate() {
  const navigate = useNavigate();

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [estimatedDays, setEstimatedDays] = useState(7);
  const [sections, setSections] = useState([
    { title: "", description: "", url: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = sections.map((section, index) => ({
      title: section.title,
      descriptions: section.description,
      url: section.url,
      orderIndex: index + 1,
      isFinalSubmission: index === sections.length - 1,
    }));

    await modulesAPI.create({
      title: moduleTitle,
      description: moduleDesc,
      estimatedDays,
      items,
    });

    navigate({ to: "/manager/modules" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">

      <Card className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl">
        <CardHeader>
          <CardTitle>Module Information</CardTitle>
          <p className="text-sm text-gray-600">
            Basic information about the learning module
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Module Title *</Label>
            <Input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} />
          </div>

          <div>
            <Label>Estimated Days *</Label>
            <Input type="number" value={estimatedDays} onChange={(e) => setEstimatedDays(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea value={moduleDesc} onChange={(e) => setModuleDesc(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <SectionFormCreate sections={sections} onSectionsChange={setSections} />

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Create Module
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: "/manager/modules" })}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
