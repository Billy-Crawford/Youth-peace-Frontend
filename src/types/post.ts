// src/types/post.ts

export interface Post {
  id: string;
  author: string;
  author_name: string;
  content: string;
  image: string | null;

  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;

  created_at: string;
  updated_at: string;
}

export interface CreatePostPayload {
  content: string;
  image?: File | null;
}

export interface Comment {
  id: string;
  author: string;
  author_name: string;
  content: string;
  created_at: string;
}
