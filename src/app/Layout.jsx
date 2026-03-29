import { NavLink, Outlet } from "react-router-dom";



const Layout = () => {
    return (
        <>
        <header>
            <NavLink to={"/"} className={({isActive}) => isActive ? 'white' : ''}>Home</NavLink>
            <NavLink to={"/posts"} className={({isActive}) => isActive ? 'active-link' : ''}>Posts</NavLink>
            <NavLink to={"/posts/:id"} className={({isActive}) => isActive ? 'active-link' : ''}>Post</NavLink>
            <NavLink to={"/login"} className={({isActive}) => isActive ? 'active-link' : ''}>Login</NavLink>
        </header>

        <Outlet />
        </>
        
    )
}
export {Layout}
