import Chat from "../models/Chat.js";

const SocketHandler = (socket) => {
  // Join personal room for project + user
  socket.on("join-room", async ({ projectId, userId }) => {
    console.log("Join room params:", { projectId, userId });
    if (!projectId || !userId) {
      console.error("Missing projectId or userId in join-room");
      return;
    }
    const roomName = `${projectId}-${userId}`;
    await socket.join(roomName);
    console.log(`User ${userId} joined room: ${roomName}`);
  });

  socket.on("send-message", async ({ projectId, senderId, receiverId, message }) => {
    console.log("Send message params:", { projectId, senderId, receiverId, message });
    if (!projectId || !senderId || !receiverId || !message) {
      console.error("Invalid send-message data, missing fields");
      return;
    }

    try {
      let chat = await Chat.findOne({ projectId });

      const newMsg = { senderId, receiverId, message, sentAt: new Date() };

      if (!chat) {
        chat = new Chat({ projectId, messages: [newMsg] });
      } else {
        chat.messages.push(newMsg);
      }

      await chat.save();

      const receiverRoom = `${projectId}-${receiverId}`;
      const senderRoom = `${projectId}-${senderId}`;

      // Emit to receiver room
      socket.to(receiverRoom).emit("new-message", newMsg);
      // Emit to sender's other sockets (if any)
      socket.to(senderRoom).emit("new-message", newMsg);
      // Emit to sender's own socket
      socket.emit("new-message", newMsg);
    } catch (error) {
      console.error("Socket send error:", error);
    }
  });
};

export default SocketHandler;
