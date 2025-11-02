import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router()

router.post("/register",validateRequest(createUserZodSchema),userController.createUserController)
router.post("/users",userController.getAllUsersController)

export const UserRoutes = router;