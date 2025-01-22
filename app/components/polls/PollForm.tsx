"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, LucideIcon } from "lucide-react";
import { CreatePollInput, UpdatePollInput } from "@/interfaces/poll";

interface PollFormProps {
  initialData?: UpdatePollInput;
  onSubmit: (data: CreatePollInput | UpdatePollInput) => Promise<void>;
  onClose?: () => void;
  categories?: Array<{
    id: number;
    name: string;
    icon: LucideIcon;
  }>;
  isEditing?: boolean;
}

const PollForm = ({
  initialData,
  onSubmit,
  isEditing = false,
}: PollFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    options: initialData?.options?.map((opt) => opt.name) || ["", ""],
    endDate: initialData?.endDate || "",
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) return; // Minimum 2 options required
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validate form
      if (!formData.question.trim()) {
        throw new Error("Question is required");
      }
      if (formData.options.length < 2) {
        throw new Error("At least 2 options are required");
      }
      if (formData.options.some((opt) => !opt.trim())) {
        throw new Error("All options must be filled");
      }
      if (!formData.endDate) {
        throw new Error("End date is required");
      }

      const submitData = {
        ...formData,
        ...(isEditing && initialData?.id ? { id: initialData.id } : {}),
      };

      await onSubmit(submitData);
      router.push("/polls-survey");
      router.refresh();
    } catch (error) {
      console.error("Failed to submit poll:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-32">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Poll" : "Create New Poll"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder="Enter your question"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    disabled={loading}
                  />
                  {formData.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(index)}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                disabled={loading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Option
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="w-full">
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Poll"
                  : "Create Poll"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PollForm;
