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
import freelancerRoutes from "./routes/freelancer.js";
import SocketHandler from "./sockets/chatSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  SocketHandler(socket);
});

app.set("io", io);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/freelancer", freelancerRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("SB Works API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
