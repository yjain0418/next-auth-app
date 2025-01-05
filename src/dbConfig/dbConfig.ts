import mongoose, { mongo } from "mongoose";

export async function connect() {
    try {
        // mongoose.connect(process.env.MONGO_URI!)
        mongoose.connect(process.env.MONGO_URI as string);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDB");
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error: " + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error);
    }
}