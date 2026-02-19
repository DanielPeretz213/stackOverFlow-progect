import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useAuto } from "../context/autoContext";
import type { Post } from "../types/Post";
import type { Tag } from "../types/Tag";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

interface PostFormProps {
  fetchAllTags: () => Promise<Tag[]>;
  initialValues?: Post;
  isEditMode?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  fetchAllTags,
  initialValues,
  isEditMode,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useAuto();
  const [tags, setTags] = useState<Tag[]>([]);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        tags: initialValues.tags?.map((t: any) => (t._id ? t._id : t)),
      });
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      if (isEditMode && initialValues) {
        await api.patch(`/post/${initialValues._id}`, values);
        toast.success("Post updated successfully");
      } else {
        await api.post("/post", values);
        toast.success("Post created successfully");
      }
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Button 
        type="link" 
        icon={<ArrowRightOutlined />} 
        onClick={() => navigate("/")}
        style={{ marginBottom: 16, padding: 0 }}
      >
       Back to home page
      </Button>
      <Card
        style={{
          maxWidth: 800,
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2}>{isEditMode ? "Edit Post" : "Add New Post"}</Title>

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
              {
                min: 2,
                max: 80,
                message: "Title must be between 2 and 80 characters",
              },
            ]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Content is required" },
              { min: 10, message: "Content must be at least 10 characters" },
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

          <Form.Item style={{ marginTop: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={submitting}
              size="large"
            >
              {isEditMode ? "Save Changes" : "Publish Post"}
            </Button>
            {isEditMode && (
              <Button
                style={{ marginTop: "8px" }}
                block
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostForm;
