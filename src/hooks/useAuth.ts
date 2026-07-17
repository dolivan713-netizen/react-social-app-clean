import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function useAuth() {
    const auth = useContext(AuthContext);

    if(auth === undefined) {
        throw new Error("useAuth error used");
    }

    return auth
}