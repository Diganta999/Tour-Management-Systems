import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post("/register",validateRequest(createUserZodSchema),UserController.createUserController)
router.get("/users",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),UserController.getAllUsersController)
router.patch("/:id",checkAuth(...Object.values(Role)),UserController.updateUserController)

export const UserRoutes = router;