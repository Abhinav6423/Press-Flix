import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null; // or spinner

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
