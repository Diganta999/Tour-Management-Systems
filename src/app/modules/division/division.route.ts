import { Router } from "express";
import { DivisionController } from "./division.controller";

const router =Router()




router.post("/create",DivisionController.createDivisionController)
router.get("/allDivision",DivisionController.retrieveAllDivisionController)







export const DivisionRoute= router;