import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/auth.models.js";

export const appGetProfileBioController = async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload; // set by tokenMiddleware
  const username = decoded?.username as string | undefined;
  console.log("gett the user ", username);

  if (!username) {
    return res.status(401).json({ success: false, message: "Invalid token payload" });
  }

  const data = await userModel.findOne({ username });


  if (data) {
    return res.status(405).json({ success: true, data });
  } else {
    return res.status(500).json({ success: false, message: "Unable to fetch the user, please try again later" });
  }
};