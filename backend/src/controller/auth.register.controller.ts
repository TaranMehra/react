import type { Request , Response} from "express";
import { userModel, type IUser } from "../models/auth.models.js";

export const registerController = async (req:Request, res:Response) =>{


    const { username, Email : email, Phoneno : phoneno , Password:password} = req.body;

    const userObj  = {
        username,
        email,
        phoneno,
        password
    }
    if(username && email && phoneno && password){
            const isStored = await userModel.create(userObj);
            if(isStored){
                return res.status(201).json({success: true , data:isStored});
            }
    }
    // console.log("someone called me", username,email, phoneno, password , req.body);
}