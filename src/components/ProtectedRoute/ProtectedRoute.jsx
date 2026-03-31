import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return children;
}