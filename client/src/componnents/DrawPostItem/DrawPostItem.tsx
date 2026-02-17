import { Card, Avatar, Typography, Space, Button, Tag } from "antd";
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
  const isOwner = user && post.creator && String(post.creator._id) === String(user._id);
  const isAdmin = user?.isAdmin === true; 
  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{post.creator?.name}</Text>
        </Space>

        {(isAdmin || isOwner) && (
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

        {post.tags && post.tags.length > 0 && (
          <div style={styles.tags}>
            <Space wrap>
              {post.tags.map((tag) => (
                <Tag key={tag._id} color="blue">
                  #{tag.name}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        <Text type="secondary">
          {new Date(post.createdAt).toLocaleDateString("he-IL")}
        </Text>
      </div>
    </Card>
  );
};

export default DrawPostItem;
