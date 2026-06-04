"use client";

import { useEffect, useState } from "react";

import {
  getComments,
  createComment,
} from "@/lib/posts";

interface Props {
  postId: string;
}

export default function PostComments({
  postId,
}: Props) {
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
  }, []);

  const handleComment = async () => {
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
    <div className="mt-4 border-t pt-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ajouter un commentaire..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="flex-1 rounded-lg border px-3 py-2"
        />

        <button
          onClick={handleComment}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Envoyer
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg bg-slate-50 p-3"
          >
            <p className="font-semibold">
              {comment.author_name}
            </p>

            <p className="text-sm text-slate-700">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

