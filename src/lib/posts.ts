// src/lib/posts.ts

import api from "@/lib/api";
import { Post } from "@/types/post";

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/api/posts/");

  return response.data;
};

export const createPost = async (
  content: string,
  image?: File
): Promise<Post> => {
  const formData = new FormData();

  formData.append(
    "content",
    content
  );

  if (image) {
    formData.append(
      "image",
      image
    );
  }

  const response = await api.post(
    "/api/posts/",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const toggleLike = async (
  postId: string
) => {
  const response = await api.post(
    `/api/posts/${postId}/like/`
  );

  return response.data;
};

export const getComments = async (
  postId: string
) => {
  const response = await api.get(
    `/api/posts/${postId}/comments/`
  );

  return response.data;
};

export const createComment = async (
  postId: string,
  content: string
) => {
  const response = await api.post(
    `/api/posts/${postId}/comments/`,
    {
      content,
    }
  );

  return response.data;
};

