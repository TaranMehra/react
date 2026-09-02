import { Router } from "express";
import { AuthRoutes } from "./auth.route.js";
import { AppRoutes } from "./app.route.js";
export const router = Router();

router.use("/auth", AuthRoutes)
router.use("/app", AppRoutes)
console.log("AppRoutes mounted at /app");