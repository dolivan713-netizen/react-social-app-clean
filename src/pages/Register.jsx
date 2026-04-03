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
    return (
        <div>
            <h1>Register</h1>
            
            <div className="auth__form">
                <input
                    className="input"
                    placeholder="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>

                <input
                    className="input"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <input
                    className="input"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                {error && <p className="message message--error">{error}</p>}

                <div className="auth__actions">
                    <button className="btn btn--primary" onClick={() => handleRegister()}>
                        Register
                    </button>

                    <button className="btn btn--secondary" onClick={() => navigate(`/login`)}>
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    )
    
}





