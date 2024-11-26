import mongoose from "mongoose" ;

const db = async(req,res) => {
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://visheshtanwar:${process.env.DATABASE_PASSWORD}@cluster0.rxa0l.mongodb.net/Practice?retryWrites=true&w=majority&appName=Cluster0`
        )
        if (!connection) {
            return res.status(500).send("server down !!") ; 
        }
        return connection ;
    } catch (e){
        console.log(e); 
    }
}

export default db ;