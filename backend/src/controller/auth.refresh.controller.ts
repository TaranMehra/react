import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/auth.models.js";

export const refreshController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err:any, decoded: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
    }

    const user = await userModel.findOne({ username: decoded.username });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ success: false, message: "Refresh token mismatch or revoked" });
    }

    const newAccessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  });
};