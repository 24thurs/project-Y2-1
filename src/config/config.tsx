import { connect as connectMongoDB } from "mongoose";
import { createConnection } from "mysql2/promise";

export const connectDatabases = async () => {
    try {
        // Connect to MongoDB
        await connectMongoDB(String(process.env.MONGODB_URI));
        console.log("MongoDB connected");

        // Connect to MySQL
        const mysqlConnection = await createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        console.log("MySQL connected");

        return { mysqlConnection };
    } catch (error) {
        console.log("Error connecting to databases: ", error);
    }
};

export const baseURL = String(process.env.BASE_URL);