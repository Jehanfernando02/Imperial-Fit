import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to the database");

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to db");
        });

        mongoose.connection.on("error", (err) => {
            console.error(`Mongoose connection error: ${err}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected");
        });

    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
};