import { create } from "zustand";
import API from "../utils/axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return {
        success: false,
        msg: err.response?.data?.msg || "Login failed",
      };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return {
        success: false,
        msg: err.response?.data?.msg || "Registration failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }
    set({ isLoading: true });
    try {
      const res = await API.get("/auth/me");
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (err) {
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

export default useAuthStore;
