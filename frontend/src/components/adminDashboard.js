// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./dashboard.css"; // Import the CSS file

// const Dashboard = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   const [status, setStatus] = useState();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/admin/allGrievance",
//           {
//             withCredentials: true,
//           }
//         );
//         if (response.status === 200) {
//           setComplaints(response.data);
//         }
//       } catch (e) {
//         console.error("Error fetching complaints:", e);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = (grievanceId) => async () => {
//     if (!window.confirm("Are you sure you want to delete this grievance?")) {
//       return;
//     }
//     try {
//       const response = await axios.delete(
//         `http://localhost:8000/admin/deleteGrievance/${grievanceId}`,
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         setComplaints((prevState) =>
//           prevState.filter((complaint) => complaint._id !== grievanceId)
//         );
//         console.log("deleted successfully");
//       }
//     } catch (e) {
//       console.error("error deleting grievance ", e);
//     }
//   };

//   const handleStartDate = (e) => {
//     const val = e.target.value;
//     setStartDate(val);
//   };

//   const handleEndDate = (e) => {
//     const val = e.target.value;
//     setEndDate(val);
//   };

//   const handleFilter = async () => {
//     const response = await axios.post(
//       "http://localhost:8000/admin/filterGrievance",
//       { startDate, endDate },
//       { withCredentials: true }
//     );
//     setComplaints(response.data);
//   };

//   const handleRemoveFilter = async () => {
//     const response = await axios.get(
//       "http://localhost:8000/admin/allGrievance",
//       { withCredentials: true }
//     );
//     setComplaints(response.data);
//   };

//   const handleStatus = (e) => {
//     setStatus(e.target.value); 
//   };  

//   const handleStatusFilter = async() => {
//     console.log(status); 
//     const response = await axios.post('http://localhost:8000/admin/statusFilter',{status},{withCredentials:true}) ;
//     setComplaints(response.data) ; 
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="filter-section">
//         <h3>Filter by Date</h3>
//         <input
//           type="date"
//           placeholder="Start Date"
//           value={startDate}
//           onChange={handleStartDate}
//         />
//         <input
//           type="date"
//           placeholder="End Date"
//           value={endDate}
//           onChange={handleEndDate}
//         />
//         <button onClick={handleFilter}>Apply Filter</button>
//         <button onClick={handleRemoveFilter}>Remove Filter</button>
//       </div>
      
//       <div className="filter-section">
//         <h3>Filter by Status</h3>
//         <select value={status} onChange={handleStatus}>
//           <option value="Seen">Seen</option>
//           <option value="Not Seen">Not Seen</option>
//         </select>
//         <button onClick={handleStatusFilter}>Apply</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>GrievanceID</th>
//             <th>Grievance</th>
//             <th>UserID</th>
//             <th>User Name</th>
//             <th>Status</th>
//             <th>Action</th>
//             <th>Date</th>
//             <th>Update</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {complaints.map((data, idx) => (
//             <tr key={idx}>
//               <td>{data._id}</td>
//               <td>{data.grievance}</td>
//               <td>{data.user._id}</td>
//               <td>{data.user.name}</td>
//               <td>{data.status}</td>
//               <td>{data.action}</td>
//               <td>{new Date(data.date).toLocaleDateString()}</td>
//               <td>
//                 <button
//                   onClick={() => navigate(`/updateGrievance/${data._id}`)}
//                 >
//                   Update
//                 </button>
//               </td>
//               <td>
//                 <button 
//                   className="delete" 
//                   onClick={handleDelete(data._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/allGrievance",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setComplaints(response.data);
        }
      } catch (e) {
        console.error("Error fetching complaints:", e);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (grievanceId) => async () => {
    if (!window.confirm("Are you sure you want to delete this grievance?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/deleteGrievance/${grievanceId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setComplaints((prevState) =>
          prevState.filter((complaint) => complaint._id !== grievanceId)
        );
        console.log("deleted successfully");
      }
    } catch (e) {
      console.error("error deleting grievance ", e);
    }
  };

  const handleStartDate = (e) => {
    const val = e.target.value;
    setStartDate(val);
  };

  const handleEndDate = (e) => {
    const val = e.target.value;
    setEndDate(val);
  };

  const handleFilter = async () => {
    const response = await axios.post(
      "http://localhost:8000/admin/filterGrievance",
      { startDate, endDate },
      { withCredentials: true }
    );
    setComplaints(response.data);
  };

  const handleRemoveFilter = async () => {
    const response = await axios.get(
      "http://localhost:8000/admin/allGrievance",
      { withCredentials: true }
    );
    setComplaints(response.data);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value); 
  };  

  const handleStatusFilter = async() => {
    console.log(status); 
    const response = await axios.post('http://localhost:8000/admin/statusFilter',{status},{withCredentials:true}) ;
    setComplaints(response.data) ; 
  };

  // Function to get the status color based on value
  const getStatusColor = (status) => {
    return status === "Seen" ? "green" : "red";
  };

  return (
    <div className="dashboard-container">
      <div className="filter-section">
        <h3>Filter by Date</h3>
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={handleStartDate}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={handleEndDate}
        />
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleRemoveFilter}>Remove Filter</button>
      </div>
      
      <div className="filter-section">
        <h3>Filter by Status</h3>
        <select value={status} onChange={handleStatus}>
          <option value="Seen">Seen</option>
          <option value="Not Seen">Not Seen</option>
        </select>
        <button onClick={handleStatusFilter}>Apply</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>GrievanceID</th>
            <th>Grievance</th>
            <th>UserID</th>
            <th>User Name</th>
            <th>Status</th>
            <th>Action</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((data, idx) => (
            <tr key={idx}>
              <td>{data._id}</td>
              <td>{data.grievance}</td>
              <td>{data.user._id}</td>
              <td>{data.user.name}</td>
              <td style={{ color: getStatusColor(data.status) }}>
                {data.status}
              </td>
              <td>{data.action}</td>
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => navigate(`/updateGrievance/${data._id}`)}
                >
                  Update
                </button>
              </td>
              <td>
                <button 
                  className="delete" 
                  onClick={handleDelete(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
