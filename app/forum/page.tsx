"use client";
import { Category, Comment, Discussion, Reaction } from "@/types/Thread";
import { BarChart2, BookmarkPlus, Hash, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import Header from "../components/forum/Header";
import CategorySidebar from "../components/forum/CategorySidebar";
import { SearchBar } from "../components/forum/SearchBar";
import { DiscussionCard } from "../components/DiscussionCard";

const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [comments, setComments] = useState<Record<number, Comment[]>>({
    1: [
      {
        id: 1,
        author: "Jane Smith",
        avatar: "/avatar.jpg",
        content: "This is a fascinating perspective on renewable energy!",
        timeAgo: "1h ago",
        likes: 12,
        replies: [],
      },
    ],
    2: [],
    3: [],
  });
  const [newComment, setNewComment] = useState<string>("");
  const [reactions, setReactions] = useState<Record<number, Reaction[]>>({
    1: [],
    2: [],
    3: [],
  });

  const categories: Category[] = [
    { id: 1, name: "All Topics", icon: Hash, parent_id: 0 },
    { id: 2, name: "Technology", icon: BarChart2, parent_id: 0 },
    { id: 3, name: "Health & Wellness", icon: Users, parent_id: 0 },
    { id: 4, name: "Education", icon: BookmarkPlus, parent_id: 0 },
    { id: 5, name: "Climate Action", icon: TrendingUp, parent_id: 0 },
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      title: "The Future of Renewable Energy in Urban Areas",
      preview:
        "Let's discuss innovative solutions for implementing renewable energy in cities.",
      category: "technology",
      author: { name: "Alex Chen", image: "/avatar.jpg" },
      stats: { replies: 45, views: 1200, likes: 89 },
      tags: ["renewable", "urban", "innovation"],
      timeAgo: "2h ago",
      isHot: true,
      reactions: [],
    },
    {
      id: 2,
      title: "Mental Health in the Digital Age",
      preview:
        "How can we maintain healthy digital habits while staying connected?",
      category: "health",
      author: { name: "Sarah Johnson", image: "/avatar.jpg" },
      stats: { replies: 72, views: 2100, likes: 154 },
      tags: ["mentalhealth", "wellness", "digital"],
      timeAgo: "4h ago",
      isHot: true,
      reactions: [],
    },
    {
      id: 3,
      title: "Online Learning: Best Practices for Educators",
      preview:
        "Exploring effective methods for engaging students in virtual classrooms.",
      category: "education",
      author: { name: "Prof. Michael Brown", image: "/avatar.jpg" },
      stats: { replies: 38, views: 890, likes: 67 },
      tags: ["education", "online", "teaching"],
      timeAgo: "6h ago",
      isHot: false,
      reactions: [],
    },
  ];

  const handleAddComment = (discussionId: number) => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: (comments[discussionId]?.length || 0) + 1,
        author: "Current User",
        avatar: "/avatar.jpg",
        content: newComment,
        timeAgo: "Just now",
        likes: 0,
        replies: [],
      };

      setComments((prev) => ({
        ...prev,
        [discussionId]: [...(prev[discussionId] || []), newCommentObj],
      }));
      setNewComment("");
    }
  };

  const handleReaction = (discussionId: number, reaction: string) => {
    setReactions((prev) => {
      const existingReactions = prev[discussionId] || [];
      const newReactions: Reaction[] = [
        ...existingReactions,
        { type: reaction, userId: "currentUser" },
      ];
      return { ...prev, [discussionId]: newReactions };
    });
  };
  console.log("Reactions", reactions);

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory =
      selectedCategory === "all" || discussion.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  comments={comments[discussion.id] || []}
                  newComment={newComment}
                  onNewCommentChange={setNewComment}
                  onAddComment={handleAddComment}
                  onReaction={handleReaction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
