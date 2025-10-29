import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post("/register",userController.createUserController)

export const UserRoutes = router;