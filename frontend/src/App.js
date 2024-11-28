import {BrowserRouter , Route , Routes} from "react-router-dom" ;
import Register from "./components/register.js";
import Login from "./components/login.js";
import Profile from "./components/profile.js";
import FileComplaint from "./components/fileComplaint.js"; 
import ComplaintDetails from "./components/complaintDetails.js";
import AdminLogin from "./components/adminLogin.js";
import Dashboard from "./components/adminDashboard.js";
import UpdateGrievance from "./components/updateGrievance.js";
import ActionDetails from "./components/actionDetails.js";
import Navbar from "./components/navbar.js";
import Home from "./components/home.js";
import Admins from "./components/admins.js";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
          <Route path="/" element={<Home/>}/>  
          <Route path="/newRegistration" element={<Register/>}/>  
          <Route path="/login" element={<Login/>}/>  
          <Route path="/profile" element={<Profile/>}/>  
          <Route path="/fileComplaint" element={<FileComplaint/>}/>
          <Route path="/complaintDetails" element={<ComplaintDetails/>}/> 
          <Route path="/adminLogin" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/> 
          <Route path="/updateGrievance/:grievanceId" element={<UpdateGrievance/>}/>
          <Route path="/actionDetails" element={<ActionDetails/>} /> 
          <Route path="/allAdmins" element={<Admins/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
