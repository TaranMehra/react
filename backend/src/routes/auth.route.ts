import { loginController } from "../controller/auth.login.controller.js";
import { refreshController } from "../controller/auth.refresh.controller.js";
import { registerController } from "../controller/auth.register.controller.js";
import { Router} from "express";


export const AuthRoutes = Router();



// const AuthRoute = Router();
AuthRoutes.post("/register", registerController);
AuthRoutes.post("/login", loginController);
AuthRoutes.post("/refresh", refreshController);
