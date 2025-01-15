import { User } from "./User";

export interface Thread {
  id?: number;
  title: string;
  content: string;
  user_id?: number;
  category_id: number;
  is_pinned?: boolean;
  is_locked?: boolean;
  created_at?: string;
  user?: User;
  tags?: string[];
  stats?: {
    upvotes: number;
    downvotes: number;
    replies: number;
  };
  replies?: Reply[];
}
export interface Reply {
  id?: number;
  content: string;
  user_id?: number;
  thread_id: number;
  created_at?: string;
  user?: User;
  stats?: {
    upvotes: number;
    downvotes: number;
    replies: number;
  };
}
