import { Card, Avatar, Typography, Space, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Post } from "../../types/Post";
import { styles } from "./DrawPostItem.styles";
import { useAuto } from "../../context/autoContext";

const { Text, Title } = Typography;

type Props = {
  post: Post;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
};

const DrawPostItem = ({ post, onEdit, onDelete }: Props) => {
  const { user } = useAuto();
  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{post.creator?.name}</Text>
        </Space>

        {(post.creator?._id === user?._id || user?.isAdmin) && (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit?.(post._id)}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete?.(post._id)}
            />
          </Space>
        )}
      </div>

      <div style={styles.content}>
        <Title level={4}>{post.title}</Title>
        <Text>{post.content}</Text>
      </div>

      <div style={styles.footer}>
        <Space>
          <MessageOutlined />
          <Text>תגובה</Text>
        </Space>

        <Text type="secondary">
          {new Date(post.createdAt).toLocaleDateString("he-IL")}
        </Text>
      </div>
    </Card>
  );
};

export default DrawPostItem;
