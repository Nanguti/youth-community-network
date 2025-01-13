"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  TrendingUp,
  Clock,
  Hash,
  Users,
  ChevronRight,
  Filter,
  PlusCircle,
  BookmarkPlus,
  ThumbsUp,
  Share2,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: Hash },
    { id: "technology", name: "Technology", icon: BarChart2 },
    { id: "health", name: "Health & Wellness", icon: Users },
    { id: "education", name: "Education", icon: BookmarkPlus },
    { id: "climate", name: "Climate Action", icon: TrendingUp },
  ];

  const discussions = [
    {
      id: 1,
      title: "The Future of Renewable Energy in Urban Areas",
      preview:
        "Let's discuss innovative solutions for implementing renewable energy in cities...",
      category: "technology",
      author: {
        name: "Alex Chen",
        image: "/api/placeholder/32/32",
      },
      stats: {
        replies: 45,
        views: 1200,
        likes: 89,
      },
      tags: ["renewable", "urban", "innovation"],
      timeAgo: "2h ago",
      isHot: true,
    },
    // Add more discussion items as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Community Forums
            </h1>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={discussion.author.image}
                          alt={discussion.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">
                          {discussion.author.name} · {discussion.timeAgo}
                        </span>
                        {discussion.isHot && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                            Hot
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {discussion.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{discussion.preview}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {discussion.stats.replies}
                        </span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {discussion.stats.likes}
                        </span>
                      </button>
                      <span className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {discussion.stats.views} views
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
