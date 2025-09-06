import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken" ;

const userSchema = new Schema({
    name : {
        type : String, 
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    password : {
        type : String,
        required : true,
        minLength : [5,"minimum length 5 characters"]
    },
    role : {
        type : String , 
        enum : ['user','admin'],
        default : "user" 
    }
})

userSchema.methods = {
    generateJWTToken : function(){
        return jwt.sign(
            {id : this._id,
            role : this.role},
            process.env.JWT_PASSWORD,
            {expiresIn : "10d"}    
        )
    }
}

const User = mongoose.model("users",userSchema);

export default User ;