import { registerController } from "../controller/auth.register.controller.js";
import { Router} from "express";


export const AuthRoutes = Router();



// const AuthRoute = Router();
AuthRoutes.post("/register", registerController);