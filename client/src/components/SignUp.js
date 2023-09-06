import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


const API_URL = "http://localhost:5000";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch(`${API_URL}/register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))

        navigate('/')
    }

    return (
        <div className="register">
            <h1>Welcome to Mandal's Electronics</h1> <br />
            <h3>Please Register Your Details</h3>
            <h5 className="bapan">If u already Registrated , click on (LogIn)</h5>

            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="aapButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp