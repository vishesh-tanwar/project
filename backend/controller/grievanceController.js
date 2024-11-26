import sendEmail from "../config/email.js";
import Grievance from "../model/grievanceModel.js";
import User from "../model/userModel.js";

export const createGrievance = async (req, res) => {
    try {
        const { grievance } = req.body;
        if (!grievance) {
            return res.status(400).send("Grievance is required");
        }
        const complaints = await Grievance.create({ grievance, user: req.user.id });

        const userData = await User.findById(req.user.id);
        if (!userData) {
            return res.status(404).send("User not found");
        }

        sendEmail(
            userData.email,
            'Complaint Filed Successfully!',
            `Hello ${userData.name}, You have successfully filed your complaint. We will notify you when the admin processes your grievance.`
        );

        return res.status(200).send(complaints);
    } catch (error) {
        console.error("Error in creating grievance:", error);
        return res.status(500).send("An error occurred while creating the grievance. Please try again later.");
    }
};


export const GrievanceDetails = async(req,res) => {
    const grievanceDetails = await Grievance.find({user : req.user.id}) ;
    return res.status(200).send(grievanceDetails) ; 
}