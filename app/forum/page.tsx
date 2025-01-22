"use client";
import { Category, Comment, Discussion, Reaction } from "@/types/Thread";
import { BarChart2, BookmarkPlus, Hash, TrendingUp, Users } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/forum/Header";
import CategorySidebar from "../components/forum/CategorySidebar";
import { SearchBar } from "../components/forum/SearchBar";
import { DiscussionCard } from "../components/DiscussionCard";
import {
  createThread,
  fetchThreads as getThreads,
  createComment,
} from "@/hooks/useForum";
import toast from "react-hot-toast";

interface ThreadFormData {
  title: string;
  content: string;
  category_id: number;
}

interface ThreadResponse {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  category: {
    id: number;
    name: string;
    icon: string;
  };
  created_at: string;
  is_pinned: boolean;
  is_locked: boolean;
}

interface ThreadsResponse {
  data: ThreadResponse[];
  current_page: number;
  total: number;
}

const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<string>("");
  const [reactions, setReactions] = useState<Record<string, Reaction[]>>({});
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { id: 1, name: "All Topics", icon: Hash, parent_id: 0 },
    { id: 2, name: "Technology", icon: BarChart2, parent_id: 0 },
    { id: 3, name: "Health & Wellness", icon: Users, parent_id: 0 },
    { id: 4, name: "Education", icon: BookmarkPlus, parent_id: 0 },
    { id: 5, name: "Climate Action", icon: TrendingUp, parent_id: 0 },
  ];

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const response: ThreadsResponse = await getThreads();
      const formattedDiscussions: Discussion[] = response.data.map(
        (thread: ThreadResponse) => ({
          id: thread.id,
          title: thread.title,
          preview: thread.content,
          category: thread.category.name.toLowerCase(),
          author: {
            name: thread.user.name,
            image: thread.user.avatar || "/avatar.jpg",
          },
          stats: {
            replies: 0,
            views: 0,
            likes: 0,
          },
          tags: [],
          timeAgo: new Date(thread.created_at).toLocaleDateString(),
          isHot: thread.is_pinned,
          reactions: [],
        })
      );

      setDiscussions(formattedDiscussions);

      const initialComments: Record<string, Comment[]> = {};
      const initialReactions: Record<string, Reaction[]> = {};

      formattedDiscussions.forEach((discussion) => {
        initialComments[String(discussion.id)] = [];
        initialReactions[String(discussion.id)] = [];
      });

      setComments(initialComments);
      setReactions(initialReactions);
    } catch (error) {
      console.error("Error fetching threads:", error);
      toast.error("Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (
    threadData: ThreadFormData
  ): Promise<void> => {
    try {
      const response = await createThread(threadData);
      if (!response) {
        throw new Error("Invalid response from server");
      }

      await fetchThreads(); // Refresh the threads list
      toast.success("Thread created successfully!");
    } catch (error) {
      console.error("Error creating thread:", error);
      toast.error("Failed to create thread. Please try again.");
    }
  };

  const handleAddComment = async (discussionId: number) => {
    if (newComment.trim()) {
      try {
        const data = await createComment({
          content: newComment,
          thread_id: discussionId,
        });

        const newCommentObj: Comment = {
          id: data.id,
          content: data.content,
          author: data.user?.name || "Current User",
          avatar: data.user?.avatar || "/avatar.jpg",
          timeAgo: "Just now",
          likes: 0,
          replies: [],
          user: {
            name: data.user?.name || "Current User",
            avatar: data.user?.avatar || null,
          },
        };

        setComments((prev) => ({
          ...prev,
          [String(discussionId)]: [
            ...(prev[String(discussionId)] || []),
            newCommentObj,
          ],
        }));
        setNewComment("");
        toast.success("Comment added successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error adding comment:",
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || "Failed to add comment");
        } else {
          console.error("Error adding comment:", error);
          toast.error("Failed to add comment");
        }
      }
    }
  };

  const handleReaction = (discussionId: string, reaction: string | number) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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
                  comments={comments[String(discussion.id)] || []}
                  reactions={
                    discussion.id !== undefined
                      ? reactions[String(discussion.id)] || []
                      : []
                  }
                  newComment={newComment}
                  onNewCommentChange={setNewComment}
                  onAddComment={() => handleAddComment(discussion.id)}
                  onReaction={(reaction) =>
                    handleReaction(String(discussion.id), reaction)
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
