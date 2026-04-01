import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {login} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleLogin() {
        setError('')
        if (!userName) {
            setError('Entry userName');
            return;
        }
        if (!password) {
            setError('entry password');
            return;
        }
        login();
        navigate('/posts');
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button onClick={() => handleLogin()}>Login</button>
            <button onClick={() => navigate('/register')}>
                Register
            </button>
        </div>
    )
}
