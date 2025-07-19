import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();


const app = express();
// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/api/auth",authRoutes);
app.use('/api/projects', projectRoutes);


// Connect to MongoDB Atlas
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("SB Works API is running...");
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
