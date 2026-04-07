import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, register, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthenticated) {
      checkAuth();
    }
  }, [user, isAuthenticated, checkAuth]);

  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    register,
    logout
  };
};
