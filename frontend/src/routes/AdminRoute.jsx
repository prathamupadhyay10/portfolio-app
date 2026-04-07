import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

function AdminRoute({ children }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-yellow-400" size={48} />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
