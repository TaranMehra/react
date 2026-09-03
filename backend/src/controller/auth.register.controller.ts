import type { Request , Response} from "express";
import { userModel, type IUser } from "../models/auth.models.js";
import bcrypt from 'bcrypt';

export const registerController = async (req:Request, res:Response) =>{


    const { username, Email : email, Phoneno : phoneno , Password:password} = req.body;

    const userObj  = {
        username,
        email,
        phoneno,
        password
    }
    if(username && email && phoneno && password){

        const hashedPass = bcrypt.hash(password, 10);
        const enCryptedUser = {
            username,
            email,
            phoneno,
            hashedPass
        }

           const isStored = await userModel.create(enCryptedUser);
            if(isStored){
                return res.status(201).json({success: true});
            }
    }
    // console.log("someone called me", username,email, phoneno, password , req.body);
}