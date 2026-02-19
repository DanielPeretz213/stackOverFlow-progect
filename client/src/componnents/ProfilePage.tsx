import { useEffect, useState } from "react";
import { Card, Typography, Divider, Spin, Button } from "antd";
import ListOfPosts from "./ListOfPosts"; 
import fetchUserPostById from "../utils/fetchUserPostById";
import { useAuto } from "../context/autoContext";
import type { Post } from "../types/Post";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type Props = {
  deletePost: (postId: string) => void;
};

const ProfilePage = ({ deletePost }: Props) => {
  const { user } = useAuto();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchUserPostById();
      setPosts(data);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
        <Button
        type="link" 
        icon={<ArrowRightOutlined />} 
        onClick={() => navigate("/")}
        style={{ marginBottom: 16, padding: 0 }}
      >
        Back to home page
      </Button>
      <Card style={{ marginBottom: 24 }}>
        <Title level={3}>{user?.name}</Title>
        <Text strong>Email: </Text>
        <Text>{user?.email}</Text>
        <br />
        <Text strong>Joining date: </Text>
        <Text>
          {user?.createdAt && new Date(user.createdAt).toLocaleDateString("he-IL")}
        </Text>
      </Card>

      <Divider />

      <Title level={4}>Your posts</Title>

      <ListOfPosts posts={posts} deletePost={deletePost} />
    </div>
  );
};

export default ProfilePage;