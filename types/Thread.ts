import { LucideIcon } from "lucide-react";

export interface Author {
  name: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  parent_id?: number | null;
  icon: LucideIcon;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CreateCommentRequest {
  content: string;
  thread_id: number;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  avatar: string;
  timeAgo: string;
  likes: number;
  replies: Comment[];
  user: {
    name: string;
    avatar: string | null;
  };
}
export interface CreateCommentResponse {
  id: number;
  content: string;
  user?: {
    name: string;
    avatar: string | null;
  };
}

export interface Discussion {
  id: number;
  title: string;
  preview: string;
  category: string;
  author: Author;
  stats: {
    replies: number;
    views: number;
    likes: number;
  };
  tags: string[];
  timeAgo: string;
  isHot: boolean;
  reactions: Reaction[];
}

export interface Reaction {
  type: string;
  userId: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  avatar: string | null;
  bio: string | null;
  is_admin: boolean;
  last_login_at: string | null;
}

export interface Reply {
  id?: number;
  content: string;
  user_id?: number;
  thread_id: number;
  parent_id?: number | null;
  created_at?: string;
  updated_at?: string;
  user?: User;
  stats?: {
    replies?: number;
    views?: number;
    likes?: number;
    upvotes?: number;
    downvotes?: number;
  };
}

export interface Thread {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number;
  is_pinned: boolean;
  is_locked: boolean;
  last_reply_at: string;
  created_at: string;
  updated_at: string;
  user: User;
  category: Category;
  replies: Reply[];
  votes: any[];
  tags: string[];
  stats: {
    replies?: number;
    views?: number;
    likes?: number;
    upvotes?: number;
    downvotes?: number;
  };
}

export interface CreateThreadRequest {
  id?: number;
  title: string;
  content: string;
  category_id: number;
}

export interface ThreadResponse {
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
