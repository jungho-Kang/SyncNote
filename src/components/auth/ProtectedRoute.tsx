import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAuthStore(state => state.isLogin);

  if (!isLogin) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
