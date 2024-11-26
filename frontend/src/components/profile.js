import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
    // Initialize the data state to an empty object 
    const [data, setData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/getProfile', {
                    withCredentials: true,
                });
                setData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h1>Profile</h1>
                <h3>Name</h3>
                <input value={data.name} readOnly />
                <h3>Email</h3>
                <input value={data.email} readOnly />
                <button onClick={() => navigate("/fileComplaint")}>
                    File Complaint
                </button>
                <button onClick={() => navigate("/complaintDetails")}>
                    All Grievance Details
                </button>
            </div>
        </div>
    );
};

export default Profile;
