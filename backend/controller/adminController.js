import Admin from "../model/adminModel.js"; 
import bcrypt from "bcryptjs" ; 
import Grievance from "../model/grievanceModel.js";
import Action from "../model/actionModel.js";
import sendEmail from "../config/email.js";
import User from "../model/userModel.js";

export const create = async(req,res) => {
    const data = req.body ;
    if (!data){
        res.status(401).send("empty fields") 
    }
    data.password = bcrypt.hash(data.password,10);
    await Admin.create(data);
    return res.status(200).send(data) ;
}

export const loginAdmin = async(req,res) => {
    const adminData = req.body ; 
    const data = await Admin.findOne({email : adminData.email}) ;
    if (!data) {
        return res.status(404).send("wrong credentials") ; 
    } 
    if (!bcrypt.compare(adminData.password,data.password)) {
        return res.status(404).send("wrong credentials") ;
    }
    const token = data.generateJWTTokenAdmin() ;
    // res.cookie("token",token) 
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Use true if running on HTTPS
        sameSite: 'None', // Allows cookies for cross-origin requests
      });
      

    return res.status(200).send("login successful") ;
}

export const allGrievances = async(req,res) => {
    try {
        const data = await Grievance.find().populate('user','name') ;  
        if (data) {
            return res.status(200).send(data) ;
        }
    } catch (e) {
        return res.status(400).send("error fetching grievances");
    }
}

export const updateGrievance = async(req,res) => {
    const {grievanceId} = req.params ;
    const data = req.body ;
    if (!data.action) { 
        return res.status(404).send("type the action to update") ; 
    }
    const updatedGrievance = await Grievance.findByIdAndUpdate(grievanceId,{status : "Seen",action : data.action},{new : true}) ;    
    
    if (!updatedGrievance){
        return res.status(404).send("grievance not found") ; 
    } 
    await Action.create({admin : req.user.id , grievance : grievanceId , action : data.action}) 
    const userData = await User.findById(updatedGrievance.user) ; 
     
    await sendEmail(userData.email, 'Grievance Status Updated', `Hello ${userData.name}, your grievance -> "${updatedGrievance.grievance}" is under consideration . Kindly login and track your Grievance .` )
   return res.status(200).send("updated successfully") ;
}

export const grievanceById = async (req, res) => {
    const { grievanceId } = req.params; 
    try {
        const data = await Grievance.findById(grievanceId) ; 
        if (data) {
            return res.status(200).send(data); 
        } else {
            return res.status(404).send("Grievance not found");
        }
    } catch (e) {
        console.error("Error finding grievance by ID:", e);
        return res.status(400).send("Cannot find grievance");
    }
};

export const deleteGrievance = async(req,res) => {
    const {grievanceId} = req.params ; 
    try {
        const data = await Grievance.findByIdAndDelete(grievanceId) ; 
        if (data) {
            return res.status(200).send("deleted successfully ") 
        }
    } catch (e){
        return res.status(400).send("error") 
    }
} 

export const filterGrievance = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).send("Both startDate and endDate are required.");
        }

        // Convert strings to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).send("Invalid date format.");
        }

        const filteredData = await Grievance.find({
            date: {
                $gte: start, // Greater than or equal to startDate
                $lte: end,   // Less than or equal to endDate
            },
        }).populate('user','name'); 

        // Fetch all grievances
        // const allGrievances = await Grievance.find();

        // // Filter grievances based on the date range
        // const filteredGrievances = allGrievances.filter(grievance => {
        //     const grievanceDate = new Date(grievance.date); // Ensure the date field is a Date object
        //     return grievanceDate >= start && grievanceDate <= end;
        // });

        if (filteredData.length === 0) {
            return res.status(404).send("No grievances found in the given date range.");
        }

        return res.status(200).json(filteredData);
    } catch (error) {
        console.error("Error filtering grievances:", error.message);
        return res.status(500).send("Server error.");
    }
};

export const statusFilter = async(req,res) => {
    const {status} = req.body ; 
    const data = await Grievance.find({status:status}).populate('user','name') ; 
    res.status(200).send(data); 
}

export const actionDetails = async(req,res) => {
    const Data = await Action.find().populate('admin','name').populate('grievance','grievance') ;  
    res.status(200).send(Data) ;  
} 