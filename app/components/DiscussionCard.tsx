import { Button } from "@/components/ui/button";
import { Comment, Discussion, Reaction } from "@/types/Thread"; // Import Comment from our types
import { Eye, Heart, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CommentSection } from "./forum/CommentSection";

interface DiscussionCardProps {
  discussion: Discussion;
  comments: Comment[];
  reactions: Reaction[];
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: (discussionId: number) => void;
  onReaction: (discussionId: number, reaction: string) => void;
}

export const DiscussionCard = ({
  discussion,
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
  onReaction,
}: DiscussionCardProps) => {
  return (
    <motion.div
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
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-xs">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{discussion.stats.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{discussion.stats.replies}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{discussion.stats.views}</span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-center">
          <Button
            variant="outline"
            className="flex items-center gap-1 mb-2"
            onClick={() => onReaction(discussion.id, "like")}
          >
            <Heart className="h-4 w-4" />
            Like
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => onReaction(discussion.id, "share")}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <CommentSection
        comments={comments}
        newComment={newComment}
        onNewCommentChange={onNewCommentChange}
        onAddComment={() => onAddComment(discussion.id)}
      />
    </motion.div>
  );
};
