import axios from "axios";
import { useEffect, useState } from "react";

const Admins = () => {
    const [admins, setAdmins] = useState([]); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://project-y58m.onrender.com/admin/allAdmins", 
                    { withCredentials: true }
                );
                setAdmins(response.data); 
            } catch (e) {
                console.error(e);
                setError("Failed to fetch admins. Please try again later.");
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Admin ID</th>
                            <th>Admin Name</th>
                            <th>Admin Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, idx) => (
                            <tr key={idx}>
                                <td>{admin._id || "N/A"}</td>
                                <td>{admin.name || "N/A"}</td>
                                <td>{admin.email || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Admins;
