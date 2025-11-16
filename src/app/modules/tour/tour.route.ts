import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createTourZodSchema, tourTypeValidation } from "./tour.validation";
import { TourController } from "./tour.controller";

const router = Router()




router.post("/create-tour-type",validateRequest(tourTypeValidation),TourController.createTourTypeController);
router.get("/all-tour-Type",TourController.retrieveAllTourTypeController);
router.patch("/tour-type/:id",TourController.updateTourTypeController);
router.post("/create",validateRequest(createTourZodSchema),TourController.createTourController);












export const TourRoute = router; 