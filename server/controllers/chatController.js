import Chat from '../models/Chat.js';

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

    if (!chat) return res.status(404).json({ message: 'No chat found' });

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

// Controller
export const getChatThreads = async (req, res) => {
  const userId = req.user.id;

  // Find all chats where user is participant (sender or receiver in any message)
  const chats = await Chat.find({
    "messages": {
      $elemMatch: {
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    }
  });

  // For each chat, get the other user(s) who messaged this user
  // Build list of chat partners per project

  const threads = [];

  chats.forEach(chat => {
    // Get unique users in chat besides current user
    const participants = new Set();

    chat.messages.forEach(msg => {
      if (msg.senderId.toString() !== userId) participants.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== userId) participants.add(msg.receiverId.toString());
    });

    participants.forEach(participantId => {
      threads.push({
        projectId: chat.projectId,
        otherUserId: participantId,
      });
    });
  });

  res.json(threads);
};

