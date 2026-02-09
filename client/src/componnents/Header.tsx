import React, { useEffect, useState } from "react";
import { Avatar, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {type User} from "../types/User";
const { Header } = Layout;
const { Text } = Typography;



const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState< User | null>(null);

  useEffect(() => {
    //בינתיים אני רוצה רק שם
    
  }, []);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile"); // בעתיד: עמוד משתמש
    }
  };

  // יצירת ראשי תיבות (אות מהשם + אות מהמשפחה)
  const getInitials = () => {
    if (!user) return "";

    const first = user.name.charAt(0).toUpperCase() || "";
    const last = user.name.charAt(1).toUpperCase() || "";

    return first + last;
  };

  return (
    <Header style={styles.header}>
      {/* Logo */}
      <Text style={styles.logo}>StackOverflow Clone</Text>

      {/* User Avatar */}
      <div style={styles.userBox} onClick={handleClick}>
        <Avatar size="large" icon={!user && <UserOutlined />}>
          {user && getInitials()}
        </Avatar>
      </div>
    </Header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    background: "#001529",
  },
  logo: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  userBox: {
    cursor: "pointer",
  },
};

export default AppHeader;
