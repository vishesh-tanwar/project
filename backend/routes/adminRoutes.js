import express from 'express';
import { actionDetails, allAdmins ,allGrievances, create, deleteGrievance, filterGrievance, grievanceById, loginAdmin, statusFilter, updateGrievance } from '../controller/adminController.js';
import isLoggedIn from '../middleware/authentication.js';
import isAdmin from '../middleware/authorization.js';

const router = express.Router()

router.post('/register',create)
router.post('/login',loginAdmin) 
router.get("/allGrievance",isLoggedIn,isAdmin,allGrievances) ;   
router.put('/updateComplaint/:grievanceId',isLoggedIn, isAdmin ,updateGrievance) ; 
router.get('/grievanceById/:grievanceId',isLoggedIn , isAdmin , grievanceById) ;  
router.delete('/deleteGrievance/:grievanceId',isLoggedIn,isAdmin , deleteGrievance) ;
router.post('/filterGrievance',isLoggedIn,isAdmin,filterGrievance) ; 
router.post('/statusFilter',isLoggedIn,isAdmin,statusFilter) ;
router.get('/actionDetails',isLoggedIn,isAdmin,actionDetails) ;  
router.get('/allAdmins',isLoggedIn,isAdmin,allAdmins) ;

export default router ; 
