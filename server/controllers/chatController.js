import Chat from "../models/Chat.js";
import User from "../models/Users.js";
export const sendMessage = async (req, res) => {
  try {
    const { projectId, receiverId, message } = req.body;
    const senderId = req.user.id;

    let chat = await Chat.findOne({ projectId });

    const newMessage = {
      senderId,
      receiverId,
      message,
    };

    if (!chat) {
      chat = new Chat({ projectId, messages: [newMessage] });
    } else {
      chat.messages.push(newMessage);
    }

    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const chat = await Chat.findOne({ projectId });

    if (!chat) return res.status(404).json({ message: "No chat found" });

    const filtered = chat.messages.filter(
      (msg) =>
        (msg.senderId.equals(req.user.id) && msg.receiverId.equals(userId)) ||
        (msg.senderId.equals(userId) && msg.receiverId.equals(req.user.id))
    );

    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChatThreads = async (req, res) => {
  const userId = req.user.id;

  const chats = await Chat.find({
    messages: {
      $elemMatch: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
  });

  const threads = [];

  for (const chat of chats) {
    const participants = new Set();

    for (const msg of chat.messages) {
      if (msg.senderId.toString() !== userId)
        participants.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== userId)
        participants.add(msg.receiverId.toString());
    }

    for (const participantId of participants) {
      const user = await User.findById(participantId).select("name email");

      const unreadCount = chat.messages.filter(
        (msg) =>
          msg.senderId.toString() === participantId &&
          msg.receiverId.toString() === userId &&
          !msg.read
      ).length;
      
      threads.push({
        projectId: chat.projectId,
        otherUserId: participantId,
        otherUser: user,
        unreadCount,
      });
    }
  }

  return res.json(threads);
};

export const markMessagesAsRead = async (req, res) => {
  const userId = req.user.id;
  const { projectId, senderId } = req.body;

  try {
    const chat = await Chat.findOne({ projectId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    for (let msg of chat.messages) {
      if (
        msg.senderId.toString() === senderId &&
        msg.receiverId.toString() === userId &&
        !msg.read
      ) {
        msg.read = true;
      }
    }

    await chat.save();
    res.status(200).json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
