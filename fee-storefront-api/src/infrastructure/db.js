import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // MongoDB connection string
        const connectionString =
            "mongodb+srv://ImperialFit:Yx4W6H2zccOKj2z7@cluster0.ngu3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        
        // Connect to MongoDB
        await mongoose.connect(connectionString);

        console.log("Connected to the database");

        // Optional: Add event listeners for connection events
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
        // Optionally handle or rethrow the error if necessary
        process.exit(1); // Exit the process with failure code
    }
};
