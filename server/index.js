const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/api/auth",authRoutes);

// Connect to MongoDB Atlas
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("SB Works API is running...");
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
