import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Layout = () => {
    const {isAuth, logout} = useContext(AuthContext)
    return (
        <>
            <header>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Home
                </NavLink>

                {isAuth && (
                    <NavLink
                        to="/posts"
                        className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        Posts
                    </NavLink>
                )}

                {!isAuth && (
                    <>
                        <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Register
                        </NavLink>
                    </>
                )}

                {isAuth && (
                    <>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export { Layout };
