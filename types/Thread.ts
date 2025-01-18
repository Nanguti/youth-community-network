import { LucideIcon } from "lucide-react";

export interface Author {
  name: string;
  image: string;
}

export interface Category {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  icon: LucideIcon; // Changed from string to LucideIcon
  parent_id?: number; // Made optional since it's not used in current implementation
}

export interface Comment {
  id?: number;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: Comment[];
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
