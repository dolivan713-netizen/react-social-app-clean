import { useState } from "react";
import type { Child } from "../types/post";
import { AuthContext } from "./auth";

export function AuthProvider({ children }: Child) {
    
    const [isAuth, setIsAuth] = useState(() => {
        const raw = localStorage.getItem('isAuth');
        if (raw === null) {
            return false;
        }
        const data = JSON.parse(raw);
         
        if (data === true) {
            return true;
        } else {
            return false;
        }
    })

    function login() {
        localStorage.setItem('isAuth', JSON.stringify(true))
        setIsAuth(true)
    }

    function logout() {
        localStorage.removeItem('isAuth')
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}