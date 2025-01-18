"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createThread } from "@/hooks/useForum";
import { getCategories } from "@/hooks/useCategory";
import { Category } from "@/types/Category";
import { CreateThreadRequest } from "@/types/Thread";
import toast from "react-hot-toast";

// Page component for creating a new discussion
export default function CreateDiscussionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        throw error;
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newThread: CreateThreadRequest = {
      title,
      content,
      category_id: Number(category),
    };
    const response = await createThread(newThread);
    if (response.id) {
      toast.success("Thread successfully created!");
      router.push(`/forum/${response.id}`);
    }
  };

  // Handle adding tags when Enter is pressed
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Handle removing a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative bg-black bg-opacity-5 flex items-center justify-center pt-4 pb-32">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Discussion
          </h2>
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
                      <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
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
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
