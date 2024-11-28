import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Navbar.css'; 

const Navbar = () => {
    const [user, setUser] = useState(null); // Holds user name if logged in
    const [role, setRole] = useState(null); // Role can be 'user', 'admin', or null
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://project-y58m.onrender.com/user/validateToken", { 
                    withCredentials: true,
                });
                // If token is valid, set user details
                setUser(response.data.id); 
                setRole(response.data.role);
            } catch (error) {
                console.error("Invalid or expired token", error);
                setUser(null);
                setRole(null);
            }
        }; 
        fetchUserData();
    }, []);
    

    const handleLogout = async () => {
        try {
            // Clear cookie on server
            await axios.post("https://project-y58m.onrender.com/user/logout", {}, { withCredentials: true }); 
            setUser(null);
            setRole(null);
            navigate("/");
        } catch (error) {
            console.error("Error during logout", error);
        }
    };

    return (
        <nav>
            <ul className="nav-list">
                {!user && (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/newRegistration">Sign Up</Link>
                        </li>
                    </>
                )}
                {user && role === "user" && (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/fileComplaint">File Complaint</Link>
                        </li>
                    </>
                )}
                {user && role === "admin" && (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/actionDetails">Actions</Link>
                        </li>
                        <li>
                            <Link to="/allAdmins">Admins</Link> 
                        </li>
                    </>
                )}
                <li className="logout">
                    {user && <button onClick={handleLogout}>Logout</button>}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar; 
