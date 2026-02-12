import type { Post } from "../types/Post";
import api from "./api";

export const fetchAllPost = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>("/post/");
  return res.data;
};
