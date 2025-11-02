import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
 
router.post("/login",AuthController.authLoginController)

export const AuthRoute = router;