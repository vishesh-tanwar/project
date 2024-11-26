import axios from "axios";
import { useState } from "react";
import "./complaint.css";

const Complaint = () => {
    const [grievance, setGrievance] = useState("");
    const [message, setMessage] = useState(""); 

    const handleComplaint = (e) => {
        const val = e.target.value;
        setGrievance(val); 
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/user/complaints/fileComplaint',
                { grievance },
                { withCredentials: true }
            );
            if (response.status === 200) {
                setMessage("Complaint Filed Successfully");
            }
            setGrievance("") ;
        } catch (e) {
            console.error(e);
            setMessage("Internal Server Error. Try again later!");
        }
    };

    return (
        <div className="complaint-container">
            <div className="complaint-box">
                <h1>File Complaint</h1>
                <textarea 
                    id="complaintBox" 
                    className="complaintBox" 
                    rows="3" 
                    columns="10" 
                    value={grievance} 
                    onChange={handleComplaint} 
                />
                <button onClick={handleSubmit}>Submit</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Complaint;
