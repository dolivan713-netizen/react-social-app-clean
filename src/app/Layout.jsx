import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
        <header>
            <NavLink to={"/"} className={({isActive}) => isActive ? 'active-link' : ''}>Home</NavLink>
            <NavLink to={"/posts"} className={({isActive}) => isActive ? 'active-link' : ''}>Posts</NavLink>
            <NavLink to={"/login"} className={({isActive}) => isActive ? 'active-link' : ''}>Login</NavLink>
        </header>
        <Outlet />
        </>
        
    )
}
export {Layout}
