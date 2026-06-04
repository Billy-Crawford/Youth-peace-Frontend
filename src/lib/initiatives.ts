import api from "@/lib/api";

export const getInitiatives = async () => {
  const res = await api.get("/api/posts/initiatives/");
  return res.data;
};

export const createInitiative = async (data: {
  title: string;
  category: string;
  description: string;
  location: string;
  image?: File | null;
}) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("location", data.location);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post(
    "/api/posts/initiatives/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

