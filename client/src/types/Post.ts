import {type User} from "./User";
import {type Tag} from "./Tag";

export type Post = {
  _id: string;
  title: string;
  content: string;
  creator: User;      
  tags: Tag[];        
  createdAt: string;
  updatedAt: string;
};