import axios from "axios";
import { useEffect, useState } from "react";
import "./complaintdetails.css";

const ComplaintDetails = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/complaints/complaintdetails', {
                    withCredentials: true
                });
                setComplaints(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="complaint-details-container">
            <h1>Complaint Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Grievance</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((data, idx) => (
                        <tr key={idx}>
                            <td>{data.grievance}</td>
                            <td>{data.status}</td>
                            <td>{data.action}</td>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ComplaintDetails;
