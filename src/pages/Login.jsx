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
        <div className="auth">
            <h1 className="auth__title">Login</h1>

            <div className="auth__form">
                <input 
                    className="input"
                    type="text"
                    placeholder="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input 
                    className="input"
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="message message--error">{error}</p>}

                <div className="auth__actions">
                    <button className="btn btn--primary" onClick={handleLogin}>Login</button>
                    <button className="btn btn--secondary" onClick={() => navigate("/register")}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
