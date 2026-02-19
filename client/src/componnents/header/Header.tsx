import React, { useState } from "react";
import { Avatar, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuto } from "../../context/autoContext";
import styles from "./heder.styles";

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuto();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile"); 
    }
  };

  const handleStatusConnectedButton = () =>{
    if(user){
      logOut();
      navigate("login")
    }else{
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
      <div style={styles.conection}>
        {/* הורדנו את ה-div המיותר והשתמשנו בסטייל המשופר */}
        <button 
          style={styles.logInOutButton} 
          onClick={handleStatusConnectedButton}
        >
          {user ? "log out" : "log in"}
        </button>

        <div style={styles.userBox} onClick={handleClick}>
          <Avatar size="large" icon={!user && <UserOutlined />}>
            {user && getInitials()}
          </Avatar>
        </div>
      </div>
    </Header>
  );
};


export default AppHeader;
