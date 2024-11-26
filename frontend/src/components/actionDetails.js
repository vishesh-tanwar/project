import axios from "axios";
import { useEffect, useState } from "react";

const ActionDetails = () => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/admin/actionDetails",
        { withCredentials: true }
      ); 
      setActions(response.data); 
    };
    fetchData();
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Admin Name</th>
            <th>Grievance ID</th>
            <th>Grievance Name</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, idx) => (
            <tr key={idx}>
              <td>{action.admin?._id || "N/A"}</td>
              <td>{action.admin?.name || "N/A"}</td>
              <td>{action.grievance?._id || "N/A"}</td>
              <td>{action.grievance?.grievance || "N/A"}</td>
              <td>{action.action}</td>
              <td>{new Date(action.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );   
};

export default ActionDetails;
