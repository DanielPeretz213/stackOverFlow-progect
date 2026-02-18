import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import Login from "./componnents/login/LogIn";
import Register from "./componnents/register/Register";
import Home from "./componnents/home/Home";
import { fetchAllTags } from "./utils/fetchAllTags";
import PostForm from "./componnents/postForm";
import EditPostWrapper from "./componnents/EditPostWrapper";

const { Content } = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <ToastContainer />

      <BrowserRouter>
        <Content className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-post"
              element={<PostForm fetchAllTags={fetchAllTags} />}
            />
            <Route
              path="/edit-post/:id"
              element={<EditPostWrapper fetchAllTags={fetchAllTags} />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
