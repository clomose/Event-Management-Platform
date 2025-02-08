import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const dbConnect = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected successfully to host: ${connectionInstance.connection.host} \n`);
    }catch(error){
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}

export default dbConnect;
