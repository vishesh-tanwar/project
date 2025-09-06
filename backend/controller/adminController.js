import Admin from "../model/adminModel.js"; 
import bcrypt from "bcryptjs" ; 
import Grievance from "../model/grievanceModel.js";
import Action from "../model/actionModel.js";
import sendEmail from "../config/email.js";
import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const data = req.body;

        if (!data || !data.name || !data.email || !data.password) {
            return res.status(400).send("All fields are required.");
        }

        data.password = await bcrypt.hash(data.password, 10);

        const existingAdmin = await Admin.findOne({ email: data.email });
        if (existingAdmin) {
            return res.status(409).send("Admin with this email already exists.");
        }

        const admin = await Admin.create(data);

        return res.status(201).send({
            message: "Admin created successfully.",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).send("Server error. Unable to create admin.");
    }
};

// export const loginAdmin = async(req,res) => {
//     const adminData = req.body ; 
//     const data = await Admin.findOne({email : adminData.email}) ;
//     if (!data) {
//         return res.status(404).send("wrong credentials") ; 
//     } 
//     if (!bcrypt.compare(adminData.password,data.password)) {
//         return res.status(404).send("wrong credentials") ;
//     }
//     const token = data.generateJWTTokenAdmin() ;
//     // res.cookie("token",token) 
//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: true, // Use true if running on HTTPS
//         sameSite: 'None', // Allows cookies for cross-origin requests
//       });
      

//     return res.status(200).send("login successful") ;
// }

export const loginAdmin = async (req, res) => {
    try {
        const adminData = req.body;  
        const data = await Admin.findOne({ email: adminData.email });
        if (!data) {
            return res.status(404).send("Wrong credentials");
        }

        const isPasswordValid = await bcrypt.compare(adminData.password, data.password);
        if (!isPasswordValid) {
            return res.status(401).send("Wrong credentials");
        }

        const token = data.generateJWTTokenAdmin();
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'None', 
        });

        return res.status(200).send("Login successful");
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        return res.status(500).send("Internal server error");
    }
};

export const allGrievances = async(req,res) => {
    try {
        const data = await Grievance.find().populate('user','name').sort({ date: -1 }); ;  
        if (data) {
            return res.status(200).send(data) ;
        }
    } catch (e) {
        return res.status(400).send("error fetching grievances");
    }
}

export const updateGrievance = async (req, res) => {
    try {
        const { grievanceId } = req.params;
        const data = req.body;

        if (!data.action) {
            return res.status(400).send("Please provide the action to update");
        }

        const updatedGrievance = await Grievance.findByIdAndUpdate(
            grievanceId,
            { status: "Seen", action: data.action },
            { new: true }
        );

        if (!updatedGrievance) {
            return res.status(404).send("Grievance not found");
        }

        await Action.create({ admin: req.user.id, grievance: grievanceId, action: data.action });

        const userData = await User.findById(updatedGrievance.user);
        if (!userData) {
            return res.status(404).send("User not found");
        }

        sendEmail(
            userData.email,
            'Grievance Status Updated',
            `Hello ${userData.name}, your grievance -> "${updatedGrievance.grievance}" is under consideration. Kindly login and track your grievance.`
        );

        return res.status(200).send("Updated successfully");
    } catch (error) {
        console.error("Error in updating grievance:", error);
        return res.status(500).send("An error occurred while updating the grievance. Please try again later.");
    }
};


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

export const allAdmins = async (req, res) => {
    try {
        const adminData = await Admin.find();
        if (!adminData || adminData.length === 0) {
            return res.status(404).send("No admins found");
        }
        return res.status(200).json(adminData);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Error fetching Admin Data");
    }
}; 
