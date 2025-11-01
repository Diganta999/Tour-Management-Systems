
import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("Connected to Database")
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
         console.log(error)
    }
}



startServer()

process.on("SIGINT",()=>{
     console.log("SIGINT signal caught ! Server Shouting down .......... ")
     if(server){
        server.close(()=>{
            process.exit(1)
        })
     }
     process.exit(1)
})
process.on("unhandledRejection",(err)=>{
     console.log("Unhandle rejection caught ! Server Shouting down .......... Error is ", err)
     if(server){
        server.close(()=>{
            process.exit(1)
        })
     }
     process.exit(1)
})
process.on("uncaughtException",(err)=>{
     console.log("Uncaught Exception caught ! Server Shouting down .......... Error is ", err)
     if(server){
        server.close(()=>{
            process.exit(1)
        })
     }
     process.exit(1)
})





