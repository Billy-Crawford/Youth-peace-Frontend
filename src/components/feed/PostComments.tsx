"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { getComments, createComment } from "@/lib/posts";

interface Props {
  postId: string;
}

export default function PostComments({ postId }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");

  const loadComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await createComment(postId, content);
      setContent("");
      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Zone de saisie du commentaire */}
      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écrire un commentaire constructif..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <Send size={14} className="mr-1.5" />
          Répondre
        </button>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-center py-4 text-xs font-semibold text-slate-500">
            Aucun commentaire pour le moment. Lancez la discussion !
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 transition-colors hover:bg-slate-100/60"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">
                  {comment.author_name}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

