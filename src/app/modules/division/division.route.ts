import { Router } from "express";
import { DivisionController } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema, updateDivisionSchema } from "./division.validation";

const router =Router()




router.post("/create",validateRequest(createDivisionSchema),DivisionController.createDivisionController)
router.get("/allDivision",DivisionController.retrieveAllDivisionController)
router.patch("/:id",validateRequest(updateDivisionSchema),DivisionController.updateDivisionController)


export const DivisionRoute= router;