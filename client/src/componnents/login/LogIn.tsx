import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useAuto } from "../../context/autoContext";
import { styles } from "./login.styles";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useAuto();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await api.post("/auto/login", values);
      if (response.status === 200) {
        login(response.data.user);
        toast.success(response.data.message);
        navigate("/")
      }
    } catch (err: any) {
      console.log("samting went wrong whth send user details");
      toast.error(err.response?.data || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text>Don't have an account?</Text>
          <br />
          <Link to="/register">Create account</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
