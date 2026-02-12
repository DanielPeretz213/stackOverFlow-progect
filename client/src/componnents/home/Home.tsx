import React, { useEffect, useState } from "react";
import AppHeader from "../header/Header";
import ListOfPost from "../ListOfPosts";
import { fetchAllPost } from "../../utils/fetchAllPost";
import type { Post } from "../../types/Post";

const Home = () => {
  const [listPost, setListPosts] = useState<Post[] | null>();

  useEffect(() => {
    const fetchPost = async () => {
      const posts: Post[] = await fetchAllPost();
      setListPosts(posts);
    };
    fetchPost();
  }, []);

  return (
    <div className="container">
      <AppHeader />
      
      <ListOfPost
        posts={listPost ? listPost : []} //מציג את הכל אלה אם נבחר לסנן לפי טאג אז  אני רוצה להציג את כל הפוסטים שיש להם את הטאג הזה
      />
    </div>
  );
};

export default Home;
