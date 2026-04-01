import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuth, authReady } = useContext(AuthContext);

    if (!authReady) {
        return <p>Loading...</p>;
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}