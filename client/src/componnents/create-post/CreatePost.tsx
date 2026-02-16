import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useAuto } from "../../context/autoContext";
import { useForm } from "antd/es/form/Form";
import type { Tag } from "../../types/Tag";
const { Title } = Typography;
const { TextArea } = Input;

interface CreatePostPayload {
  title: string;
  content: string;
  tags?: string[];
}

interface CreatePostProps {
  fetchAllTags: () => Promise<Tag[]>;
}

const CreatePost: React.FC<CreatePostProps> = ({ fetchAllTags }) => {
  const [form] = useForm<CreatePostPayload>();
  const navigate = useNavigate();
  const { user } = useAuto();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchAllTags();
        setTags(data);
      } catch {
        toast.error("Failed to load tags");
      }
    };
    loadTags();
  }, [fetchAllTags]);

  const onFinish = async (values: CreatePostPayload) => {
    try {
      await api.post("/post", values);
      toast.success("Post created successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to create post");
    }
  };

  return (
    <div className="page-container" style={{height:"100vh"}}>
      <Card style={{ maxWidth: 800, margin: "0 auto"}}>
        <Title level={2}>Add New Post</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Post Title"
            name="title"
            rules={[
              { required: true, message: "Title is required" },
              { min: 2, max: 80 },
            ]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Content is required" },
              { min: 10 },
            ]}
          >
            <TextArea rows={6} placeholder="Write your post here..." />
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select
              mode="multiple"
              allowClear
              placeholder="Select tags (optional)"
              options={tags.map((tag) => ({
                label: tag.name, 
                value: tag._id, 
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Publish Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePost;
