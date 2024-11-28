import User from "../model/userModel.js";
import bcrypt from "bcryptjs" ; 
import jwt from "jsonwebtoken";
import sendEmail from "../config/email.js";

export const register = async (req, res) => {
    try {
        const userData = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(userData.email)) {
            return res.status(400).send("Invalid email format");
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        const checkExistingData = await User.findOne({ email: userData.email });
        if (checkExistingData) {
            return res.status(409).send("User already exists");
        }

        const data = await User.create(userData);
        if (!data) {
            return res.status(500).send("Error creating User");
        }

        sendEmail(
            userData.email,
            'Successfully Registered!!',
            `Hello ${userData.name}, You have been successfully registered on Campus Voice Hub. Kindly login. Thank you.`
        );

        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Server error");
    }
};


// export const login = async(req,res) => {
//     const userData = req.body ; 
//     const data = await User.findOne({email : userData.email})
//     if (!data) { 
//         return res.status(409).send("wrong credentials");
//     }
//     if (!bcrypt.compare(userData.password,data.password)) {
//         return res.status(409).send("wrong credentials");
//     }
//     const jwttoken = data.generateJWTToken();
//     res.cookie("token",jwttoken,{
//         httpOnly: true, // Always a good practice
//         secure : true ,
//         maxAge : 20 * 24 * 60 * 1000 
//     })  
//     return res.status(200).send("login successful") 
// } 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).send("Wrong credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(409).send("Wrong credentials");
        }

        const jwttoken = user.generateJWTToken();
        res.cookie("token", jwttoken, {
            httpOnly: true,
            secure: true, // For HTTPS
            sameSite: "none", // For cross-origin requests
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
        });

        return res.status(200).send("Login successful");
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("An error occurred");
    }
};


export const getProfile = async(req,res) => {
    const userId = req.user.id ;
    const data = await User.findById(userId) ; 
    res.status(200).send(data) ; 
}

export const updateProfile = async (req, res) => { 
    const id = req.user.id; 
    const { name, password } = req.body;
    
    // Fetch current user data to compare
    const currentUser = await User.findById(id);
    if (!currentUser) {
        return res.status(404).send("User not found");
    }
    
    // Check if the name or password is the same as current values
    if (name && currentUser.name === name) {
        return res.status(400).send("Name is the same as before");
    }
    
    if (password && await bcrypt.compare(password, currentUser.password)) {
        return res.status(400).send("Password is the same");
    }
    
    // Prepare updated data object
    const userData = {};
    if (name) {
        userData.name = name;
    }
    if (password) {
        userData.password = await bcrypt.hash(password, 10); 
    } 
    
    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return res.status(200).send(updatedUser); 
};

export const deleteUser = async(req,res) => {
    const id = req.user.id ; 
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).send("user not found") ; 
    }
    res.clearCookie("token") ; // removing token 
    return res.status(200).send("user deleted") ;  
}


export const validateToken = (req, res) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        return res.status(200).json({
            id: decoded.id, // Extracted user ID
            role: decoded.role, // Extracted user role
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export const logout =  (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).send({ message: "Logged out successfully" });
}; 
