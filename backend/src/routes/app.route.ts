import { Router } from "express";
import { tokenMiddleware } from "../middleware/token.middleware.js";
import { appGetUserController } from "../controller/app.getUser.controller.js";
import { appGetProfileBioController } from "../controller/app.getProfileBio.js";

export const AppRoutes = Router();
AppRoutes.get('/dash/user/me', tokenMiddleware, appGetUserController);
AppRoutes.get('/profile/user/me', tokenMiddleware, appGetProfileBioController);
