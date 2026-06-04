"use client";

import { Heart } from "lucide-react";
import PostComments from "./PostComments";

interface PostCardProps {
  post: any;
  onLike: (postId: string) => void;
}

export default function PostCard({
  post,
  onLike,
}: PostCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900">
          {post.author_name}
        </h3>

        <p className="text-sm text-slate-500">
          {new Date(post.created_at).toLocaleDateString(
            "fr-FR"
          )}
        </p>
      </div>

      <p className="whitespace-pre-wrap text-slate-800">
        {post.content}
      </p>

      <div className="mt-5 flex items-center gap-6">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 text-slate-700 hover:text-red-500"
        >
          <Heart size={18} />
          {post.likes_count}
        </button>

        <span className="text-slate-600">
          💬 {post.comments_count}
        </span>
      </div>

      <PostComments postId={post.id} />
    </div>
  );
}

