import mongoose from 'mongoose'
import dotenv from 'dotenv';


dotenv.config();

export const initDB = () => {
    if(mongoose.connect(process.env.MONGODB_URL)){
        console.log("Connected to db");
    }
    else{
        console.log("Error connecting to db");
    }
}