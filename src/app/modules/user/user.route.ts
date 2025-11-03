import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post("/register",validateRequest(createUserZodSchema),userController.createUserController)
router.post("/users",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),userController.getAllUsersController)

export const UserRoutes = router;