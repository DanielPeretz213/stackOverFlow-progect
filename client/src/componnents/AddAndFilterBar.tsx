import React, { useEffect, useState } from "react";
import { Card, Select, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { Tag } from "../types/Tag";
import { useAuto } from "../context/autoContext";

type addAndFilterBarProps = {
  fetchAllTags: () => Promise<Tag[]>;
  onTagChange: (tag: string | null) => void;
};

const AddAndFilterBar: React.FC<addAndFilterBarProps> = ({
  fetchAllTags,
  onTagChange,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuto();

  useEffect(() => {
    const loadTags = async () => {
      setLoading(true);
      try {
        const data = await fetchAllTags();
        setTags(data);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, [fetchAllTags]);

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
        <Select
          allowClear
          loading={loading}
          placeholder="Filter posts by tag"
          style={{ minWidth: 220 }}
          options={[
            { value: "all", label: "All Posts" },
            ...tags.map((tag) => ({
              value: tag._id,
              label: tag.name,
            })),
          ]}
          onChange={(value) => onTagChange(value ?? null)}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(user ? "/create-post" : "/login")}
        >
          Add Post
        </Button>
      </Space>
    </Card>
  );
};

export default AddAndFilterBar;
