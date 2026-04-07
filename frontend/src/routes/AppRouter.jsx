import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute"; 
import AdminRoute from "./AdminRoute";
import BlogList from "../blog/BlogList";
import PostDetail from "../blog/PostDetail";
import NewPost from "../blog/NewPost";
import EditPost from "../blog/EditPost";
import ManagePosts from "../dashboard/ManagePosts";
import ManageInquiries from "../dashboard/ManageInquiries";
import Settings from "../dashboard/Settings";
import Home from "../pages/Home";

function AppRouter() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/post/:slug" element={<PostDetail />} />

        {/* Admin Only */}
        <Route
          path="/new-post"
          element={
            <AdminRoute>
              <NewPost />
            </AdminRoute>
          }
        />

        <Route
          path="/blog/edit/:id"
          element={
            <AdminRoute>
              <EditPost />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-posts"
          element={
            <AdminRoute>
              <ManagePosts />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-inquiries"
          element={
            <AdminRoute>
              <ManageInquiries />
            </AdminRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
