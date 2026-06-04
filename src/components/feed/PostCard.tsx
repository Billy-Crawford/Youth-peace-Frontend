"use client";

import { useState } from "react";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { Post } from "@/types/post";
import PostComments from "./PostComments";

interface Props {
  post: Post;
  onLike: (id: string) => void;
}

export default function PostCard({ post, onLike }: Props) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300">
      {/* Header de la carte */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <h3 className="text-base font-bold text-slate-900">
          {post.author_name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Calendar size={14} className="text-slate-400" />
          <time>
            {new Date(post.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </time>
        </div>
      </div>

      {/* Contenu textuel */}
      <p className="mb-4 whitespace-pre-wrap text-sm font-medium leading-relaxed text-slate-800">
        {post.content}
      </p>

      {/* Image de la publication */}
      {post.image && (
        <div className="mt-4 mb-4 rounded-xl border border-slate-100 overflow-hidden bg-slate-50">
          <img
            src={post.image}
            alt="Illustration de la publication"
            className="w-full max-h-[450px] object-cover transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      )}

      {/* Boutons d'engagements */}
      <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
        <button
          onClick={() => onLike(post.id)}
          className="group flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-red-600"
        >
          <div className="rounded-lg p-1.5 transition-colors group-hover:bg-red-50">
            <Heart size={18} className="transition-transform active:scale-120" />
          </div>
          <span>{post.likes_count ?? 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="group flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-blue-600"
        >
          <div className="rounded-lg p-1.5 transition-colors group-hover:bg-blue-50">
            <MessageCircle size={18} />
          </div>
          <span>{post.comments_count ?? 0}</span>
        </button>
      </div>

      {/* Section Commentaires intégrée */}
      {showComments && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <PostComments postId={post.id} />
        </div>
      )}
    </div>
  );
}