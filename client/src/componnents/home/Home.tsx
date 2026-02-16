import { useEffect, useState } from "react";
import AppHeader from "../header/Header";
import ListOfPost from "../ListOfPosts";
import type { Post } from "../../types/Post";
import AddAndFilterBar from "../AddAndFilterBar";
import { fetchAllTags } from "../../utils/fetchAllTags";
import { getPosts } from "../../utils/getPosts";
import { styles } from "./home.styles";
import { Spin } from "antd";

const Home = () => {
  const [listPost, setListPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = async (tag: string) => {
    setLoading(true);
    const tagToFilter = tag === "All" ? null : tag;
    const posts = await getPosts(tagToFilter);
    setListPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts(selectedTags);
  }, [selectedTags]);

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
          <ListOfPost posts={listPost ?? []} />
        )}
      </div>
    </div>
  );
};

export default Home;
