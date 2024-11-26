import express from "express" ;
import userRoutes from "./routes/userRoutes.js" ;
import grievanceRoutes from "./routes/grievanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import db from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors" ; 

dotenv.config();

const app = express() ;

app.use(cors({
    origin : "http://localhost:3000" , credentials : true 
}))

// Middleware to parse incoming request body as JSON
app.use(express.json());

app.use(cookieParser());

app.use('/user',userRoutes) ; 

app.use('/user/complaints',grievanceRoutes); 

app.use('/admin',adminRoutes);

app.use("*",(req,res)=>{
    return res.status(404).send('page not found') ;
})

app.listen(process.env.PORT ,async()=>{
    const database = await db() ; 
    if (!database){
        console.log("error connecting to mongoDB");
    } else {
        console.log("connected to MongoDB");
    }
    console.log("server is on");
}) 