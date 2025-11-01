import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post("/register",userController.createUserController)
router.post("/users",userController.getAllUsersController)

export const UserRoutes = router;