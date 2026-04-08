import { Children, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import type { AuthContextValue } from "../../types/post";
import type { Child } from "../../types/post";

export default function ProtectedRoute({ children }: Child) {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("AuthContext is missing")
    }
    const { isAuth, authReady } = auth;

    if (!authReady) {
        return <p>Loading...</p>;
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}