import sendEmail from "../config/email.js";
import Grievance from "../model/grievanceModel.js";
import User from "../model/userModel.js";

export const createGrievance = async(req,res) => {
    const {grievance} = req.body ; 
    if (!grievance){
        return res.status(404).send("grievance is required") ;
    }    
    const complaints = await Grievance.create({grievance , user : req.user.id }) ;
    const userData = await User.findById(req.user.id) ; 
    await sendEmail(userData.email, 'complaint filed Successfully!!', `Hello ${userData.name}, You have successfully filed your complaint . We will notify you when the admin will process your grievance .`); 

    return res.status(200).send(complaints);
}

export const GrievanceDetails = async(req,res) => {
    const grievanceDetails = await Grievance.find({user : req.user.id}) ;
    return res.status(200).send(grievanceDetails) ; 
}