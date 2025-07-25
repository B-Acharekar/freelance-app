import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projectRoutes.js";
import applicationRoutes from "./routes/applications.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/adminRoutes.js"
import uploadRoutes from "./routes/upload.js"
import SocketHandler from "./sockets/chatSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
];



const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  SocketHandler(socket);
});

app.set("io", io);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/uploads",uploadRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("SB Works API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
