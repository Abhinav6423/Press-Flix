import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import Loader from "../mycomp/Loader";
const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />; // or spinner

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
