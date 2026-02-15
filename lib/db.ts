import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = db.connection.readyState === 1
        console.log("✅ MongoDB connected");
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB error:", error.message);
        } else {
            console.error("❌ MongoDB error:", error);
        }
        process.exit(1);
    }
};