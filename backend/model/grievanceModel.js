import mongoose, { Schema } from "mongoose";

const grievanceSchema = new Schema({
    grievance : {
        type : String ,
        required : true
    },
    status : {
        type : String , 
        default : "Not Seen"
    },
    action : {
        type : String ,
        default : "--" 
    },
    date : {
        type : Date ,
        default : Date.now() 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true 
    }
})

const Grievance = mongoose.model("grievances",grievanceSchema)

export default Grievance ; 