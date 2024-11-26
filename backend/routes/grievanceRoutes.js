import express from "express";
import {createGrievance, GrievanceDetails } from "../controller/grievanceController.js";
import isLoggedIn from "../middleware/authentication.js";

const router =express.Router() ;

router.post("/fileComplaint", isLoggedIn ,createGrievance) ; 
router.get("/complaintDetails", isLoggedIn , GrievanceDetails) ; 

export default router ;