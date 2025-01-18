import { Comment } from "@/types/Thread";
import { Send, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

export const CommentSection = ({
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
}: CommentSectionProps) => {
  return (
    <div className="mt-6 space-y-4">
      {comments?.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Image
            src={comment.avatar}
            alt={comment.author}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500">{comment.timeAgo}</span>
            </div>
            <p className="text-gray-700 text-sm">{comment.content}</p>

            <div className="flex items-center gap-2 mt-2">
              <ThumbsUp className="h-4 w-4 text-gray-400" />
              <span>{comment.likes}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)}
        />
        <button
          onClick={onAddComment}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
