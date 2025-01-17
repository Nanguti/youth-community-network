"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  TrendingUp,
  Hash,
  Users,
  Filter,
  PlusCircle,
  BookmarkPlus,
  ThumbsUp,
  Share2,
  BarChart2,
  SortAsc,
  Eye,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Author {
  name: string;
  image: string;
}

interface Stats {
  replies: number;
  views: number;
  likes: number;
}

interface Discussion {
  id: number;
  title: string;
  preview: string;
  category: string;
  author: Author;
  stats: Stats;
  tags: string[];
  timeAgo: string;
  isHot: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  const [comments, setComments] = useState<Record<number, Comment[]>>({
    1: [
      {
        id: 1,
        author: "Jane Smith",
        avatar: "/avatar.jpg",
        content: "This is a fascinating perspective on renewable energy!",
        timeAgo: "1h ago",
        likes: 12,
      },
    ],
    2: [],
    3: [],
  });
  const [newComment, setNewComment] = useState<string>("");

  const categories: Category[] = [
    { id: "all", name: "All Topics", icon: Hash },
    { id: "technology", name: "Technology", icon: BarChart2 },
    { id: "health", name: "Health & Wellness", icon: Users },
    { id: "education", name: "Education", icon: BookmarkPlus },
    { id: "climate", name: "Climate Action", icon: TrendingUp },
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      title: "The Future of Renewable Energy in Urban Areas",
      preview:
        "Let's discuss innovative solutions for implementing renewable energy in cities. From solar panels on skyscrapers to wind turbines integrated into architecture...",
      category: "technology",
      author: {
        name: "Alex Chen",
        image: "/avatar.jpg",
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
    {
      id: 2,
      title: "Mental Health in the Digital Age",
      preview:
        "How can we maintain healthy digital habits while staying connected? Share your experiences and strategies for digital wellness...",
      category: "health",
      author: {
        name: "Sarah Johnson",
        image: "/avatar.jpg",
      },
      stats: {
        replies: 72,
        views: 2100,
        likes: 154,
      },
      tags: ["mentalhealth", "wellness", "digital"],
      timeAgo: "4h ago",
      isHot: true,
    },
    {
      id: 3,
      title: "Online Learning: Best Practices for Educators",
      preview:
        "Exploring effective methods for engaging students in virtual classrooms. What tools and techniques have worked best for you?",
      category: "education",
      author: {
        name: "Prof. Michael Brown",
        image: "/avatar.jpg",
      },
      stats: {
        replies: 38,
        views: 890,
        likes: 67,
      },
      tags: ["education", "online", "teaching"],
      timeAgo: "6h ago",
      isHot: false,
    },
  ];

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory =
      selectedCategory === "all" || discussion.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddComment = (discussionId: number) => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments[discussionId].length + 1,
        author: "Current User",
        avatar: "/avatar.jpg",
        content: newComment,
        timeAgo: "Just now",
        likes: 0,
      };

      setComments((prev) => ({
        ...prev,
        [discussionId]: [...prev[discussionId], newCommentObj],
      }));
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Community Forums
            </h1>
            <Link
              href="/forum/create"
              className="text-sm font-medium text-indigo-600
             hover:text-indigo-500"
            >
              <Button className="bg-pink-600 hover:bg-pink-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Now Sticky */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center px-4 py-2 text-sm rounded-lg
                           transition-colors ${
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

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Forum Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Discussions</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Members</span>
                    <span className="font-semibold">10.5k</span>
                  </div>
                </div>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="flex items-center">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src={discussion.author.image}
                          alt={discussion.author.name}
                          width={32}
                          height={32}
                          className="rounded-full bg-gray-200"
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
                      <button
                        className="flex items-center text-gray-500 hover:text-indigo-600"
                        onClick={() =>
                          setActiveCommentId(
                            activeCommentId === discussion.id
                              ? null
                              : discussion.id
                          )
                        }
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {comments[discussion.id].length}
                        </span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {discussion.stats.likes}
                        </span>
                      </button>
                      <span className="flex items-center text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
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

                  {/* Comments Section */}
                  {activeCommentId === discussion.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-lg font-semibold mb-4">Comments</h4>
                      <div className="space-y-4">
                        {comments[discussion.id].map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex space-x-3">
                                  <Image
                                    src={comment.avatar}
                                    alt={comment.author}
                                    width={32}
                                    height={32}
                                    className="rounded-full bg-gray-200"
                                  />
                                  <span className="font-medium">
                                    {comment.author}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {comment.timeAgo}
                                  </span>
                                </div>
                                <p className="text-gray-600 mt-1">
                                  {comment.content}
                                </p>
                              </div>
                              <div className="flex items-center mt-2 space-x-2">
                                <button className="text-sm text-gray-500 hover:text-indigo-600">
                                  <ThumbsUp className="h-4 w-4 inline mr-1" />
                                  {comment.likes}
                                </button>
                                <button className="text-sm text-gray-500 hover:text-indigo-600">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment */}
                      <div className="mt-4 flex items-start space-x-3">
                        <Image
                          src="/avatar.jpg"
                          alt="Current user"
                          width={32}
                          height={32}
                          className="rounded-full bg-gray-200"
                        />
                        <div className="flex-1">
                          <div className="relative">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              rows={3}
                            />
                            <Button
                              onClick={() => handleAddComment(discussion.id)}
                              className="absolute bottom-2 right-2"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
