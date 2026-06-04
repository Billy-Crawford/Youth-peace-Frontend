// src/app/(protected)/feed/page.tsx

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Image as ImageIcon, Send, Loader2 } from "lucide-react";

import PostCard from "@/components/feed/PostCard";
import { getPosts, createPost, toggleLike } from "@/lib/posts";
import { Post } from "@/types/post";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      toast.error("Impossible de charger les publications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!content.trim() && !image) {
      return;
    }

    try {
      setPublishing(true);
      await createPost(content, image || undefined);
      setContent("");
      setImage(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview("");
      toast.success("Publication créée");
      await loadPosts();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la publication");
    } finally {
      setPublishing(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await toggleLike(postId);
      await loadPosts();
    } catch {
      toast.error("Impossible d'aimer cette publication");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Fil d'actualités
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-600">
          Partagez vos initiatives et échangez avec la communauté YouthPeace.
        </p>
      </div>

      {/* Création publication */}
      <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-100">
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Exprimez-vous, partagez une initiative..."
            className="min-h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Zone Image / Upload */}
        <div className="mt-3 flex flex-col gap-4">
          <label className="relative flex align-center justify-center cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-blue-600">
            <ImageIcon size={18} className="text-slate-500 group-hover:text-blue-600" />
            <span>Ajouter une illustration</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (preview) {
                  URL.revokeObjectURL(preview);
                }
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {preview && (
            <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src={preview}
                alt="Prévisualisation"
                className="max-h-[350px] w-full object-cover"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setPreview("");
                }}
                className="absolute top-3 right-3 rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
          <button
            onClick={handleCreatePost}
            disabled={publishing || (!content.trim() && !image)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/10 transition-all hover:bg-blue-700 active:scale-98 disabled:pointer-events-none disabled:opacity-40"
          >
            {publishing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Publication...
              </>
            ) : (
              <>
                <Send size={16} />
                Publier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-12 text-center shadow-sm">
          <Loader2 size={32} className="animate-spin text-blue-600" />
          <p className="mt-3 text-sm font-semibold text-slate-700">Chargement des publications...</p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-12 text-center shadow-sm">
              <p className="text-sm font-bold text-slate-800">Aucune publication pour le moment.</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Soyez le premier à partager un message !</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))
          )}
        </div>
      )}
    </div>
  );
}