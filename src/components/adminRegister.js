import { useState } from "react";
import axios from "axios";
import "./register.css";

const AdminRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePass = (e) => setPassword(e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async () => {
        if (!emailRegex.test(email)) {
            setMessage("Invalid email format. Please enter a valid email.");
            return;
        }
        try {
            const data = await axios.post("https://project-y58m.onrender.com/admin/register", {
                name,
                email,
                password,
            });
            if (data) {
                setMessage("Registration successful!");
            }
        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 409) {
                setMessage("User already exists.");
            } else {
                setMessage("Internal server error. Try reloading the page.");
            }
        }
    };

    
    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Admin Sign Up</h1>
                <h3>Name</h3>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleName}
                />
                <h3>Email</h3>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                />
                <h3>Password</h3>
                <input
                    type="password" 
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePass}
                />
                <button onClick={handleSubmit}>Register</button>
                {message && (
                    <p className={message.includes("successful") ? "" : "error"}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminRegister; 
