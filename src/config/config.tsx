import { connect } from "mongoose";

export const connectMongoDB = async () => {
    try {
        await connect(String(process.env.MONGODB_URI));
        console.log("DB connected");
    } catch (error) {
        console.log("Error connecting to mongodb: ", error);
    }
};

export const baseURL = String(process.env.BASE_URL);