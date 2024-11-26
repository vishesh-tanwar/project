import mongoose, { Schema } from "mongoose" ;
import jwt from "jsonwebtoken" ;
const adminSchema = new Schema({
    name : {
        type : String , 
        required : true
    },
    email : {
        type : String , 
        required : true 
    },
    password : {
        type : String ,
        required : true 
    },
    role : {
        type : String ,
        default : "admin"
    }
})  
adminSchema.methods = {
    generateJWTTokenAdmin : function(){
        return jwt.sign(
            {id : this._id,
            role : this.role},
            process.env.JWT_PASSWORD,
            {expiresIn : "10d"}    
        )
    }
}

const Admin = mongoose.model("admins",adminSchema) ;

export default Admin ; 
