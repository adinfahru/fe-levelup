import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export default function SectionFormEdit({
  sections = [],
  onSectionsChange = () => {},
}) {
  const addSection = () => {
    onSectionsChange([
      ...sections,
      { title: "", description: "", url: "" },
    ]);
  };

  const updateSection = (i, key, val) => {
    const copy = [...sections];
    copy[i][key] = val;
    onSectionsChange(copy);
  };

  const removeSection = (i) => {
    onSectionsChange(sections.filter((_, idx) => idx !== i));
  };

  return (
    <Card className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">
            Learning Sections
          </CardTitle>
          <p className="text-sm text-gray-600">
            Update learning steps (order is important)
          </p>
        </div>

        <Button
          type="button"
          onClick={addSection}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                {!isLast && <div className="flex-1 w-px bg-indigo-300 mt-1" />}
              </div>

              <div className="flex-1">
                <Card className="bg-white/20 border border-white/30 rounded-xl shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-white/30 rounded-t-xl">
                    <span className="font-medium text-gray-900">
                      Section {index + 1}
                    </span>

                    {sections.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => removeSection(index)}
                        className="flex gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 p-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateSection(index, "title", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={section.description}
                        onChange={(e) =>
                          updateSection(index, "description", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Material URL</Label>
                      <Input
                        value={section.url}
                        onChange={(e) =>
                          updateSection(index, "url", e.target.value)
                        }
                      />
                    </div>

                    {isLast && (
                      <div className="text-xs text-indigo-700 font-medium bg-indigo-50 border border-indigo-200 rounded-md px-3 py-2">
                        This section will be treated as final submission
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
