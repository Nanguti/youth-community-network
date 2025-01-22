import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/Thread";

interface ThreadFormData {
  title: string;
  content: string;
  category_id: number;
}

interface CreateThreadFormProps {
  onSubmit: (data: ThreadFormData) => Promise<void>;
  onClose: () => void;
  categories: Category[];
}

interface HeaderProps {
  onCreateThread: (data: ThreadFormData) => Promise<void>;
  categories: Category[];
}

const CreateThreadForm: React.FC<CreateThreadFormProps> = ({
  onSubmit,
  onClose,
  categories,
}) => {
  const [formData, setFormData] = useState<ThreadFormData>({
    title: "",
    content: "",
    category_id: categories[0]?.id || 1,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        content: "",
        category_id: categories[0]?.id || 1,
      });
      onClose();
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          minLength={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Select
          value={formData.category_id.toString()}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              category_id: parseInt(value),
            }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          className="w-full px-3 py-2 border rounded-md h-32"
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Discussion"}
        </Button>
      </div>
    </form>
  );
};

const Header: React.FC<HeaderProps> = ({ onCreateThread, categories }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (threadData: ThreadFormData): Promise<void> => {
    await onCreateThread(threadData);
    setIsOpen(false);
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Community Forums</h1>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
                <DialogDescription>
                  Share your thoughts with the community. Be clear and
                  descriptive.
                </DialogDescription>
              </DialogHeader>
              <CreateThreadForm
                onSubmit={handleSubmit}
                onClose={() => setIsOpen(false)}
                categories={categories}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
