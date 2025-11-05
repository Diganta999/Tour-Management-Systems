import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
 
router.post("/login",AuthController.authLoginController)
router.post("/refresh-token",AuthController.getNewAccessToken)

export const AuthRoute = router;