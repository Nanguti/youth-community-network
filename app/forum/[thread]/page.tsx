"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Flag,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Reply,
  Bookmark,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DiscussionThread = () => {
  const [replyContent, setReplyContent] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [sortBy, setSortBy] = useState("top");

  const threadData = {
    id: 1,
    title: "The Future of Renewable Energy in Urban Areas",
    content: `I've been researching innovative solutions for implementing renewable energy in cities, and I'd love to hear your thoughts on this topic.

Some key points I'd like to discuss:
1. Solar panel integration in existing architecture
2. Community-based energy sharing systems
3. The role of smart grids in urban energy management

What are your experiences with renewable energy initiatives in your cities?`,
    author: {
      name: "Alex Chen",
      image: "/api/placeholder/40/40",
      role: "Environmental Specialist",
    },
    stats: {
      upvotes: 156,
      downvotes: 12,
      replies: 45,
    },
    timePosted: "2 hours ago",
    tags: ["renewable-energy", "urban-development", "sustainability"],
  };

  const replies = [
    {
      id: 1,
      content:
        "Great points about solar panel integration! In our city, we've implemented a program that incentivizes building owners to install solar panels on rooftops. The results have been promising so far.",
      author: {
        name: "Sarah Johnson",
        image: "/api/placeholder/40/40",
        role: "Urban Planner",
      },
      stats: {
        upvotes: 89,
        downvotes: 3,
      },
      timePosted: "1 hour ago",
      isVerified: true,
    },
    // Add more replies as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Thread Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Discussion Thread
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Original Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <img
              src={threadData.author.image}
              alt={threadData.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900">
                  {threadData.author.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {threadData.author.role}
                </span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-gray-500">
                  {threadData.timePosted}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {threadData.title}
              </h3>
              <div className="prose prose-sm max-w-none mb-4">
                {threadData.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {threadData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {threadData.stats.upvotes}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyBox(!showReplyBox)}
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Reply Box */}
        {showReplyBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <div className="mb-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      B
                    </Button>
                    <Button variant="ghost" size="sm">
                      I
                    </Button>
                    <Button variant="ghost" size="sm">
                      U
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 focus:outline-none min-h-[120px] resize-y"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReplyBox(false)}>
                Cancel
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Post Reply
              </Button>
            </div>
          </motion.div>
        )}

        {/* Replies Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {threadData.stats.replies} Replies
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none 
              focus:ring-2 focus:ring-indigo-500"
            >
              <option value="top">Top</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div className="space-y-6">
            {replies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={reply.author.image}
                    alt={reply.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {reply.author.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {reply.author.role}
                      </span>
                      {reply.isVerified && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          Verified
                        </span>
                      )}
                      <span className="text-sm text-gray-400">·</span>
                      <span className="text-sm text-gray-500">
                        {reply.timePosted}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{reply.content}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-indigo-600"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">
                          {reply.stats.upvotes}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-indigo-600"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionThread;
