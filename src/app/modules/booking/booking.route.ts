import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { bookingValidation, updateBookingStatusZodSchema } from "./booking.validation";


const router = Router();

// Define booking routes here
router.post('/create',checkAuth(...Object.values(Role)),validateRequest(bookingValidation),BookingController.createBookingController)
router.get('/',checkAuth(Role.ADMIN,Role.SUPER_ADMIN),BookingController.getBookingController);
router.get('/my-booking',checkAuth(...Object.values(Role)),BookingController.getMyBookingController)
router.get('/:bookingId',checkAuth(...Object.values(Role)),BookingController.getOneBookingController)
router.patch('/:id/status',checkAuth(...Object.values(Role)),validateRequest(updateBookingStatusZodSchema), BookingController.updateBookingController);
router.delete('/:id',checkAuth(...Object.values(Role)),BookingController.deleteBookingController)





export const BookingRoute = router;