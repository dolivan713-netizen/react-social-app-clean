import { createContext, useState, useEffect } from "react";
import type { AuthContextValue } from "../types/post";
import type { Child } from "../types/post";

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: Child) {
    const [isAuth, setIsAuth] = useState(false);
    const [authReady, setAuthRaedy] = useState(false);

    useEffect(() => {
        let raw: string | null = localStorage.getItem('isAuth')
        if (raw === null) {
            throw new Error("Error localstorage");
        }
        let data: boolean = JSON.parse(raw);
        if (!data) return;

        if (data) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
        setAuthRaedy(true)
    }, [])

    function login() {
        localStorage.setItem('isAuth', JSON.stringify(true))
        setIsAuth(true)
    }

    function logout() {
        localStorage.removeItem('isAuth')
        setIsAuth(false)
    }
    
    return (
        <AuthContext.Provider value={{ isAuth, authReady, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}