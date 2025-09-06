import express from "express" ;
import { login, register, getProfile, updateProfile, deleteUser, validateToken, logout} from "../controller/userController.js";
import isLoggedIn from "../middleware/authentication.js";

const router = express.Router();

router.post("/register",register) ; 
router.post("/login",login) ;
router.get("/getProfile", isLoggedIn ,getProfile) ; 
router.patch("/updateProfile" , isLoggedIn ,updateProfile) ;
router.delete("/deleteUser", isLoggedIn , deleteUser) ; 
router.get('/validateToken',isLoggedIn,validateToken) ; 
router.post('/logout',isLoggedIn,logout) ;
export default router ; 