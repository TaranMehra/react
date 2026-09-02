import type { NextFunction, Request, Response } from "express";

export const tokenMiddleware = (req:Request,res:Response,next:NextFunction) => {

    
    const token = req.headers.authorization?.split(' ')[1];
    console.log("the reqeuest is ", token);
    if(token === process.env.token) {
       return next();
    } 
    return res.status(401).json({success:false, message:"Please Provide a valid token"});
}


