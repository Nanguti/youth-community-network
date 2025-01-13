"use client";
import React, { useState } from "react";
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  TrendingUp,
  Hash,
  Users,
  BookmarkPlus,
  BarChart2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PollFormProps {
  onSubmit: (pollData: PollData) => void;
  onClose: () => void;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface PollData {
  title: string;
  description: string;
  category: string;
  options: string[];
  settings: {
    allowMultipleVotes: boolean;
    showResultsBeforeVoting: boolean;
    endDate: string;
    endTime: string;
  };
}

const PollForm: React.FC<PollFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [settings, setSettings] = useState({
    allowMultipleVotes: false,
    showResultsBeforeVoting: true,
    endDate: "",
    endTime: "",
  });
  const categories: Category[] = [
    { id: "all", name: "All Topics", icon: Hash },
    { id: "technology", name: "Technology", icon: BarChart2 },
    { id: "health", name: "Health & Wellness", icon: Users },
    { id: "education", name: "Education", icon: BookmarkPlus },
    { id: "climate", name: "Climate Action", icon: TrendingUp },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredOptions = options.filter((option) => option.trim() !== "");
    const pollData: PollData = {
      title,
      description,
      category,
      options: filteredOptions,
      settings,
    };
    onSubmit(pollData);
  };

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="relative bg-black bg-opacity-5 flex items-center justify-center pt-4 pb-32 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Poll/Survey
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Poll Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your poll question"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-pink-500"
                placeholder="Add context or additional information"
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
          </div>

          {/* Poll Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Poll Options
              </label>
              <span className="text-sm text-gray-500">
                {options.length}/10 options
              </span>
            </div>

            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-grow flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-400">{index + 1}.</span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-grow bg-transparent focus:outline-none"
                      placeholder="Enter option"
                      required
                    />
                  </div>
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {options.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            )}
          </div>

          {/* Poll Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Poll Settings</h3>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Allow Multiple Votes
                </h4>
                <p className="text-sm text-gray-500">
                  Let users select multiple options
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowMultipleVotes}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowMultipleVotes: e.target.checked,
                  })
                }
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Show Results Before Voting
                </h4>
                <p className="text-sm text-gray-500">
                  Display current results to users before they vote
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showResultsBeforeVoting}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    showResultsBeforeVoting: e.target.checked,
                  })
                }
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <div className="relative">
                  <input
                    id="endDate"
                    type="date"
                    value={settings.endDate}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-pink-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time
                </label>
                <div className="relative">
                  <input
                    id="endTime"
                    type="time"
                    value={settings.endTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-pink-500"
                  />
                  <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
              Create Poll
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollForm;
