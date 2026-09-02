import type { Request , Response} from "express";
import { userModel, type IUser } from "../models/auth.models.js";

export const loginController = async (req:Request, res:Response) =>{


    const { username, Email : email, Phoneno : phoneno , Password:password} = req.body;

    const userObj  = {
        username,
        password
    }
    if(username && password){
            const data = await userModel.findOne({username:username});
            if(data){
                console.log("User loged In")
                return res.status(200).json({success: true, token: process.env.token, username});
            }
            else{
                return res.status(401).json({success: false, message:"Please Check Username or Password"});
            }
    }
    // console.log("someone called me", username,email, phoneno, password , req.body);
}