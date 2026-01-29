import { Navigate , Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null; // loader later
    if (!user) return <Navigate to="/login" />;

    return <Outlet />;
};

export default ProtectedRoute;
