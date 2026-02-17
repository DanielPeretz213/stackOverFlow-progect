import { useEffect, useState } from "react";
import AppHeader from "../header/Header";
import ListOfPost from "../ListOfPosts";
import type { Post } from "../../types/Post";
import AddAndFilterBar from "../AddAndFilterBar";
import { fetchAllTags } from "../../utils/fetchAllTags";
import { getPosts } from "../../utils/getPosts";
import { styles } from "./home.styles";
import { Spin } from "antd";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useAuto } from "../../context/autoContext";

const Home = () => {
  const [listPost, setListPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuto();

  const loadPosts = async (tag: string) => {
    setLoading(true);
    const tagToFilter = tag === "All" ? null : tag;
    const posts = await getPosts(tagToFilter);
    setListPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      await loadPosts(selectedTags);
    };
    fetch();
  }, [selectedTags, user]);

  const deletePost = async (postId: string) => {
    try {
      const isDelete = await api.delete(`/post/${postId}`);
      if (isDelete.status === 204 || isDelete.status === 200) {
        toast.success("post deleted successsfuly");
        setListPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        toast.error(isDelete.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("faild to delete post");
    }
  };

  return (
    <div style={styles.container}>
      <AppHeader />

      <div style={styles.content}>
        <AddAndFilterBar
          fetchAllTags={fetchAllTags}
          onTagChange={(tagId) => setSelectedTags(tagId || "All")}
        />

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <ListOfPost posts={listPost ?? []} deletePost={deletePost} />
        )}
      </div>
    </div>
  );
};

export default Home;
