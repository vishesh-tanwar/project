import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
    admin : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "admins",
        required : true  
    },
    grievance : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'grievances', 
        required : true 
    }, 
    action : {
        type : String ,
        required : true 
    },
    date : {
        type : Date , 
        default : Date.now()                  
    }
})

const Action = mongoose.model("actions",actionSchema);

export default Action ;