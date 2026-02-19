import { toast } from "react-toastify";
import api from "./api";

const deletePostByID = async (postId: string) => {
    try {
      const isDelete = await api.delete(`/post/${postId}`);
      if (isDelete.status === 204 || isDelete.status === 200) {
        toast.success("post deleted successsfuly");
      } else {
        toast.error(isDelete.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("faild to delete post");
    }
  };

  export default deletePostByID;