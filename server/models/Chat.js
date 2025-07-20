import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const ChatSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  messages: [MessageSchema],
});

export default mongoose.model("Chat", ChatSchema);
