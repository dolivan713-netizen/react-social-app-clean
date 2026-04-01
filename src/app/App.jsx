import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import PostDetails from "../pages/PostDetails"
import Posts from "../pages/Posts"
import Register from "../pages/Register"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import { Layout } from "./Layout"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route 
            path="posts" 
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />

          <Route
            path="posts/:id" 
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            } 
          />
        </Route>
    </Routes>
  )
}

export default App;