import type { Request , Response} from "express";
import { userModel, type IUser } from "../models/auth.models.js";

export const appGetUserController = async (req:Request, res:Response) =>{
    // console.log("HIT appGetUserController", req.method, req.url, Date.now());
    const {username} =  await req.body;
    // console.log("we reached to the app.getUser.controller.ts : with username ", username);
    const data = await userModel.findOne({username});
    if(data) {
        return res.status(200).json({success: true, data: data});
    } else{
        return res.status(404).json({success: false, message:"Unable to fetch the user, Please Try again later"}); 
        // i can also intentionally return the 204 no-content
    }
}
