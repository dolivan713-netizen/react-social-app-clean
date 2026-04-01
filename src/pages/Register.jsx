import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom"

export default function Register() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    function handleRegister() {
        setError("")
        if (!email.trim()) {
            setError('Enter email');
            return;
        }   
        if (!password.trim()) {
            setError('Enter password');
            return;
        }
        if (!userName.trim()) {
            setError('Enter userName');
            return;
        }
        login();
        navigate('/posts');
    }
    return <div>

        <h1>Register</h1>
        
        <input 
            placeholder="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        ></input>

        <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        ></input>

        <input 
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        ></input>

        {error && <p>{error}</p>}

        <button onClick={() => handleRegister()}>
            Register
        </button>

        <button onClick={() => navigate(`/login`)}>
            Already have an account? Login
        </button>
    </div>
}





// function handleRegister() {
//         const checkEmail = users.find(user => user.email === email)
//         const checkPassword = users.find(user => user.password === password)
//         const checkUserName = users.find(user => user.userName === userName)
//         if (checkEmail) return 'entry another email' 
//         if (checkPassword) return 'entry another password'
//         if (checkUserName) return 'entry another userName'
//         onCreate({
//             id: Date.now(),
//             email,
//             userName,
//             password
//         })
//         navigate(`/posts`)
//     }