import { Navigate } from "react-router-dom";
import type { Child } from "../../types/post";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }: Child) {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}