import type { Tag } from "../types/Tag";
import api from "./api";

export const fetchAllTags = async (): Promise<Tag[]> => {
  const res = await api.get<Tag[]>("/tag/");
  return res.data;
};
