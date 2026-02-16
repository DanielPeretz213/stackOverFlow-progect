import type { Post } from "../types/Post";
import api from "./api";

export const getPosts = async (tagId: string | null): Promise<Post[]> => {
  try {
    const url = tagId && tagId !== "all" ? `/post/filterByTag/${tagId}` : "/post/";
    const response = await api.get<Post[]>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    return []; 
  }
};
