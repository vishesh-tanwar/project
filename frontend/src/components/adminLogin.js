// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './adminLogin.css' 

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleEmail = (e) => setEmail(e.target.value);
//     const handlePassword = (e) => setPassword(e.target.value);

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post(
//                 'https://project-y58m.onrender.com/admin/login',
//                 { email, password },
//                 { withCredentials: true }
//             );
//             if (response.status === 200) {
//                 setMessage("Login successful");
//                 navigate('/dashboard');
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     return (
//         <div className="admin-login-container">
//             <div className="admin-login-card">
//                 <h1>Admin Login</h1>
//                 <h3>Email</h3>
//                 <input type="text" id="email" value={email} onChange={handleEmail} />
//                 <h3>Password</h3>
//                 <input type="password" id="password" value={password} onChange={handlePassword} />
//                 <button onClick={handleLogin}>Login</button>
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './adminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'https://project-y58m.onrender.com/admin/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setMessage("Login successful");
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("Wrong password");
            } else if (error.response && error.response.status === 404) {
                setMessage("Wrong credentials");
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h1>Admin Login</h1>
                <h3>Email</h3>
                <input type="text" id="email" value={email} onChange={handleEmail} />
                <h3>Password</h3>
                <input type="password" id="password" value={password} onChange={handlePassword} />
                <button onClick={handleLogin}>Login</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;

