import { Router } from "express";
import { DivisionController } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema, updateDivisionSchema } from "./division.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router =Router()




router.post("/create",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),validateRequest(createDivisionSchema),DivisionController.createDivisionController)
router.get("/",DivisionController.retrieveAllDivisionController)
router.get("/:slug",DivisionController.retrieveSingleDivisionController);
router.patch("/:id",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),validateRequest(updateDivisionSchema),DivisionController.updateDivisionController)
router.delete('/:id',checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),DivisionController.deleteDivisionController)


export const DivisionRoute= router;