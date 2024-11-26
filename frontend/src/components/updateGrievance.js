import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import './updateGrievance.css';  // Import the CSS file

const UpdateGrievance = () => {
    const [userId, setUserId] = useState("");
    const [grievance, setGrievance] = useState("");
    const [action, setAction] = useState(""); 

    const { grievanceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/grievanceById/${grievanceId}`, { withCredentials: true });
                if (response.status === 200) {
                    setUserId(response.data.user);
                    setGrievance(response.data.grievance);
                }
            } catch (e) {
                console.error("Error fetching data", e);
            }
        };
        fetchData();
    }, [grievanceId]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/admin/updateComplaint/${grievanceId}`, { action }, { withCredentials: true });
            if (response.status === 200) {
                alert("Grievance updated successfully");
                navigate('/dashboard');
            }
        } catch (e) {
            console.error('Error updating grievance', e);
        }
    };

    const handleAction = (e) => {
        setAction(e.target.value);
    };

    return (
        <div className="update-grievance-container">
            <h3>User ID</h3>
            <input value={userId} readOnly />
            
            <h3>Grievance</h3>
            <input value={grievance} readOnly />

            <h3>Action</h3>
            <input value={action} type="text" onChange={handleAction} />

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateGrievance;
