import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const createDBConnection =  async () =>{
    if(!process.env.MONGO_URI){
        return 
    }
    
    try {
        
        console.log("functiont triggered")
        const con =  await mongoose.connect(process.env.MONGO_URI);
        return con.connection;
        // console.log("connected bro", con)
        // connection.on("connection", ()=> console.log("connected bro", connection.readyState))
        // return connection;
                      
    } catch (error) {
        console.error("Failed to connect with Db", error);
        throw error;
        // process.exit(1);
        
    }

    
    
}