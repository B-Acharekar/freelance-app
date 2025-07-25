import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected successfully.")
    } catch (err) {
        console.error("Failed to connect MongoDB:",err.message);
        process.exit(1);
    }
};

export default connectDB;

