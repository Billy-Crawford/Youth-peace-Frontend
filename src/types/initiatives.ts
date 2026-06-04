// src/types/initiative.ts

export interface Initiative {
  id: string;
  author: string;
  author_name: string;
  title: string;
  category: "PAIX" | "VBG" | "DIALOGUE" | "COHESION" | "JEUNESSE";
  description: string;
  location: string;
  image: string | null;
  created_at: string;
}