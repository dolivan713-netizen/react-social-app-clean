import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Layout = () => {
    const {isAuth, logout} = useContext(AuthContext)
    return (
        <>
            <header className="layout__header">
                <nav className="layout__nav">
                    <span className="layout__brand">React Social App</span>

                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                        Home
                    </NavLink>

                    {isAuth && (
                        <NavLink to="/posts" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                            Posts
                        </NavLink>
                    )}

                    {!isAuth && (
                        <>
                            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                                Login
                            </NavLink>

                            <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
                                Register
                            </NavLink>
                        </>
                    )}

                    {isAuth && (
                        <button className="layout__logout" onClick={logout}>
                            Logout
                        </button>
                    )}
                </nav>
            </header>

            <main className="layout__main">
                <Outlet />
            </main>
        </>
    );
};

export { Layout };
