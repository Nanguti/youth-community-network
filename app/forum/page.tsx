"use client";
import { Category, Comment, Discussion, Reaction } from "@/types/Thread";
import { BarChart2, BookmarkPlus, Hash, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import Header from "../components/forum/Header";
import CategorySidebar from "../components/forum/CategorySidebar";
import { SearchBar } from "../components/forum/SearchBar";
import { DiscussionCard } from "../components/DiscussionCard";
import { createThread } from "@/hooks/useForum";
import toast from "react-hot-toast";

interface ThreadFormData {
  title: string;
  content: string;
  category_id: number;
}

const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [discussions, setDiscussions] = useState<Discussion[]>([
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
  ]);

  const [comments, setComments] = useState<Record<number, Comment[]>>({});

  const [newComment, setNewComment] = useState<string>("");
  const [reactions, setReactions] = useState<Record<number, Reaction[]>>({});

  const categories: Category[] = [
    { id: 1, name: "All Topics", icon: Hash, parent_id: 0 },
    { id: 2, name: "Technology", icon: BarChart2, parent_id: 0 },
    { id: 3, name: "Health & Wellness", icon: Users, parent_id: 0 },
    { id: 4, name: "Education", icon: BookmarkPlus, parent_id: 0 },
    { id: 5, name: "Climate Action", icon: TrendingUp, parent_id: 0 },
  ];

  const handleCreateThread = async (
    threadData: ThreadFormData
  ): Promise<void> => {
    try {
      // Wait for the API response
      const response = await createThread(threadData);
      console.log("log response here->", response);

      // Make sure the response contains the necessary data
      if (!response) {
        throw new Error("Invalid response from server");
      }

      const category = categories.find(
        (cat) => cat.id === threadData.category_id
      );

      const newDiscussion: Discussion = {
        id: response.id || Date.now(),
        title: threadData.title,
        preview: threadData.content,
        category: category?.name.toLowerCase() || "all",
        author: { name: "Current User", image: "/avatar.jpg" },
        stats: { replies: 0, views: 0, likes: 0 },
        tags: [],
        timeAgo: "Just now",
        isHot: false,
        reactions: [],
      };

      setDiscussions((prev) => [newDiscussion, ...prev]);
      if (newDiscussion.id !== undefined) {
        setComments((prev) => ({ ...prev, [newDiscussion.id!]: [] }));
        setReactions((prev) => ({ ...prev, [newDiscussion.id!]: [] }));
      }

      // Show success message after everything is updated
      toast.success("Thread created successfully!");
    } catch (error) {
      console.error("Error creating thread:", error);
      toast.error("Failed to create thread. Please try again.");
    }
  };

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

  const handleReaction = (discussionId: number, reaction: string | number) => {
    setReactions((prev) => {
      const existingReactions = prev[discussionId] || [];
      const newReactions: Reaction[] = [
        ...existingReactions,
        { type: reaction.toString(), userId: "currentUser" },
      ];
      return { ...prev, [discussionId]: newReactions };
    });
  };

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory =
      selectedCategory === 1 ||
      discussion.category ===
        categories
          .find((cat) => cat.id === selectedCategory)
          ?.name.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateThread={handleCreateThread} categories={categories} />

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

            <div className="space-y-4 pb-32">
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  comments={comments[discussion.id] || []}
                  reactions={
                    discussion.id !== undefined
                      ? reactions[discussion.id] || []
                      : []
                  }
                  newComment={newComment}
                  onNewCommentChange={setNewComment}
                  onAddComment={() => handleAddComment(discussion.id)}
                  onReaction={(reaction) =>
                    handleReaction(discussion.id, reaction)
                  }
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
