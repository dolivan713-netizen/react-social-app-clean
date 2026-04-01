import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [authReady, setAuthRaedy] = useState(false);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('isAuth'));

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