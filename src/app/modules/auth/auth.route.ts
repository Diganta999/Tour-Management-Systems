import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();
 
router.post("/login",AuthController.authLoginController)
router.post("/refresh-token",checkAuth(...Object.values(Role)),AuthController.getNewAccessToken)
router.post("/logout",checkAuth(...Object.values(Role)),AuthController.logoutController)
router.post("/reset-password",checkAuth(...Object.values(Role)),AuthController.resetPasswordController)

export const AuthRoute = router;