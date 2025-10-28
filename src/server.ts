import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import { error } from "console";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://tour-management-system:WejDEzTaRTzYhqKK@cluster0.gdiz8.mongodb.net/tour-management-system?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to Database")
        server = app.listen(5000, () => {
            console.log("Server is listening to port 5000")
        })
    } catch (error) {
         console.log(error)
    }
}



startServer()

process.on("unhandledRejection",(err)=>{
     console.log("Unhandle rejection caught ! Server Shouting down .......... Error is ", err)
     if(server){
        server.close(()=>{
            process.exit(1)
        })
     }
     process.exit(1)
})





