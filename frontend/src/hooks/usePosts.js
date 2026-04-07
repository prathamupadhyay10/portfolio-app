import { useEffect } from "react";
import useBlogStore from "../store/useBlogStore";

export const usePosts = () => {
  const { posts, isLoading, error, fetchPosts } = useBlogStore();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    refreshPosts: fetchPosts
  };
};
