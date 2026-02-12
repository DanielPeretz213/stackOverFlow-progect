import React, { useEffect, useState } from "react";
import { Avatar, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { type User } from "../../types/User";
import { useAuto } from "../../context/autoContext";
import styles from "./heder.styles";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuto();
  const [connectedStatus, setConnectedStatus ] = useState<string>(user ? "logout" : "login")

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      //navigate("/profile"); // בעתיד: עמוד משתמש
    }
  };

  const handleStatusConnectedButton = () =>{
    if(user){
      setConnectedStatus("log Out")
      logOut();
    }else{
      setConnectedStatus("log in")
      navigate("/login")
    }
  }

  const getInitials = () => {
    if (!user) return "";
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <Header style={styles.header}>
      <Text style={styles.logo}>StackOverflow Clone</Text>
      <div>
        <button onClick={handleStatusConnectedButton}>{user ? "log out": "log in"}</button>
      </div>
      <div style={styles.userBox} onClick={handleClick}>
        <Avatar size="large" icon={!user && <UserOutlined />}>
          {user && getInitials()}
        </Avatar>
      </div>
    </Header>
  );
};


export default AppHeader;
