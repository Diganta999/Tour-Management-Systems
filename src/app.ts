import express, { Request, Response } from "express"
import cors from "cors"
import { router } from "./router"
import { globalErrorHandler } from "./middleware/globalErrorHandler"
const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1",router)
app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"welcome to tour management system backend"
    })
})
app.use(globalErrorHandler)



export default app;