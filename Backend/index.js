import { app,server } from "./app.js";
import { connectDB } from "./data/data.js";
import dotenv from "dotenv"
dotenv.config();


connectDB()
.then(()=>{
    server.on("Error",(err)=>{
        console.log("Error", err);
        throw err;
    })
    server.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port:${process.env.PORT}!!`);
    })
})
.catch((err)=>{
    console.log(`MongoDB not connected, error is: ${err}`);
})