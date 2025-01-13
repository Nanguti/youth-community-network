"use client";
import React, { useState } from "react";
import {
  X,
  TrendingUp,
  Hash,
  Users,
  BookmarkPlus,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
interface NewDiscussionFormProps {
  onSubmit: (discussion: NewDiscussion) => void;
  onClose: () => void;
  categories: Category[];
}

interface NewDiscussion {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

const NewDiscussionForm: React.FC<NewDiscussionFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const categories: Category[] = [
    { id: "all", name: "All Topics", icon: Hash },
    { id: "technology", name: "Technology", icon: BarChart2 },
    { id: "health", name: "Health & Wellness", icon: Users },
    { id: "education", name: "Education", icon: BookmarkPlus },
    { id: "climate", name: "Climate Action", icon: TrendingUp },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscussion: NewDiscussion = {
      title,
      content,
      category,
      tags,
    };
    onSubmit(newDiscussion);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative inset-0 bg-black bg-opacity-5 flex items-center justify-center pt-4 pb-32">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Discussion
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-pink-500"
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-pink-500"
                placeholder="Share your thoughts..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-pink-500"
                placeholder="Type a tag and press Enter"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
              Post Discussion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDiscussionForm;
