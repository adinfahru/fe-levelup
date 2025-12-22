import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionFormEdit from "./SectionFormEdit";
import { modulesAPI } from "@/api/modules.api";

export default function ModuleFormEdit({ moduleId }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [sections, setSections] = useState([]);
  const [originalSectionCount, setOriginalSectionCount] = useState(0);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await modulesAPI.getById(moduleId);

        setModuleTitle(data.title || "");
        setModuleDesc(data.description || "");
        setEstimatedDays(data.estimatedDays || "");

        const transformed = (data.items || [])
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((item) => ({
            id: item.id,
            title: item.title || "",
            description: item.descriptions || "",
            url: item.url || "",
            isFinalSubmission: item.isFinalSubmission,
          }));

        setSections(transformed);
        setOriginalSectionCount(transformed.length);
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
    setSubmitting(true);

    try {
      const days = parseInt(estimatedDays);

      await modulesAPI.update(moduleId, {
        title: moduleTitle.trim(),
        description: moduleDesc.trim(),
        estimatedDays: days,
        isActive: false,
      });

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

      navigate({
        to: "/manager/module/detail",
        search: { id: moduleId },
      });
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          Loading module data...
        </CardContent>
      </Card>
    );
  }

  if (error && !submitting) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-red-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">

      <Card className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl">
        <CardHeader>
          <CardTitle>Module Information</CardTitle>
          <p className="text-sm text-gray-600">
            Update basic module information
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Module Title *</Label>
            <Input
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              required
            />
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
            <Textarea
              value={moduleDesc}
              onChange={(e) => setModuleDesc(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <SectionFormEdit
        sections={sections}
        onSectionsChange={setSections}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {submitting ? "Updating..." : "Update Module"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            navigate({
              to: "/manager/module/detail",
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
