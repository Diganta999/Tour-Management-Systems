import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = Router();
 
router.post("/login",AuthController.authLoginController)
router.post("/refresh-token",checkAuth(...Object.values(Role)),AuthController.getNewAccessToken)
router.post("/logout",checkAuth(...Object.values(Role)),AuthController.logoutController)
router.post("/reset-password",checkAuth(...Object.values(Role)),AuthController.resetPasswordController)
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),AuthController.googleCallBackController)

export const AuthRoute = router;