import { create } from "zustand";
import API from "../utils/axios";

const useBlogStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await API.get("/posts");
      set({ posts: res.data, isLoading: false, error: null });
    } catch (err) {
      set({ 
        isLoading: false, 
        error: err.response?.data?.msg || "Failed to fetch posts" 
      });
    }
  },

  getPostBySlug: (slug) => {
    return get().posts.find(p => p.slug === slug);
  },

  addPost: (post) => {
    set((state) => ({ posts: [post, ...state.posts] }));
  },

  updatePost: (updatedPost) => {
    set((state) => ({
      posts: state.posts.map(p => p._id === updatedPost._id ? updatedPost : p)
    }));
  },

  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter(p => p._id !== id)
    }));
  }
}));

export default useBlogStore;
