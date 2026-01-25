import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createTourZodSchema, tourTypeValidation } from "./tour.validation";
import { TourController } from "./tour.controller";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router()




router.post("/create-tour-type",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),validateRequest(tourTypeValidation),TourController.createTourTypeController);
router.get("/all-tour-Type",TourController.retrieveAllTourTypeController);
router.patch("/tour-type/:id",TourController.updateTourTypeController);
router.post("/create",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),validateRequest(createTourZodSchema),TourController.createTourController);
router.get("/", TourController.retrieveAllTourController);
router.get("/:slug", TourController.retrieveOneTourController);
router.patch("/:id",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),TourController.updateTourController);
router.delete("/:id",checkAuth((Role.ADMIN, Role.SUPER_ADMIN)),TourController.deleteTourController);












export const TourRoute = router; 