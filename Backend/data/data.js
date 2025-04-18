import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
        const connectionAt = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected!! DB is hosted at: ${connectionAt.connection.host}`);
    }
    catch(error)
    {
        console.log(`MongoDB connection error`, error);

    }
}

export {connectDB}