import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import PostDetails from "../pages/PostDetails"
import Posts from "../pages/Posts"
import Register from "../pages/Register"
import { Layout } from "./Layout"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetails />} />
        </Route>
    </Routes>
  )
}

export default App;