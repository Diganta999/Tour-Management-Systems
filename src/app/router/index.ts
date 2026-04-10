import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { DivisionRoute } from "../modules/division/division.route";

import { BookingRoute } from "../modules/booking/booking.route";
import { TourRoute } from "../modules/tour/tour.route";


export const router =Router()

const moduleRoutes = [
    {
        path:"/user",
        route:UserRoutes
    },{
        path:"/auth",
        route:AuthRoute
    },
    {
        path:"/division",
        route:DivisionRoute
    },{
        path:"/tour",
        route:TourRoute
    }
    ,{
        path:"/booking",
        route:BookingRoute
    }
]

moduleRoutes.forEach((route)=>{
 router.use(route.path,route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)