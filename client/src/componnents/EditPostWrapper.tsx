import { useParams } from "react-router-dom";
import type { Tag } from "../types/Tag";
import PostForm from "./postForm";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import api from "../utils/api";
import { toast } from "react-toastify";
import { Spin } from "antd";

const EditPostWrapper = ({
  fetchAllTags,
}: {
  fetchAllTags: () => Promise<Tag[]>;
}) => {
  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await api.get(`post/fetchPost/${id}`);
        setPost(res.data);
      } catch (error) {
        toast.error("can't find post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (!post) return <div>post not found</div>;

  return (
    <PostForm
      fetchAllTags={fetchAllTags}
      initialValues={post}
      isEditMode={true}
    />
  );
};

export default EditPostWrapper;
