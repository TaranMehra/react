import type { Request, Response } from "express";
import { userModel } from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  const data = await userModel.findOne({ username });
  if (!data) {
    return res.status(401).json({ success: false, message: "Please check username or password" });
  }

//   const isMatch = await bcrypt.compare(password, data.password);
//   if (!isMatch) {
//     return res.status(401).json({ success: false, message: "Please check username or password" });
//   }

  const accessToken = jwt.sign(
    { username: data.username },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "20s" }
  );

  const refreshToken = jwt.sign(
    { username: data.username },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "40s" }
  );

  data.refreshToken = refreshToken; // fixed typo
  await data.save();

  console.log("User logged in:", data.username);

  return res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    username: data.username,
  });
};