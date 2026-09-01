import { Router } from "express";
import { AuthRoutes } from "./auth.route.js";
export const router = Router();

router.use("/auth", AuthRoutes)