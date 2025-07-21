import User from '../models/Users.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js';
import Announcement from '../models/Announcement.js';

export const setAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;
    let announcement = await Announcement.findOne();

    if (announcement) {
      announcement.message = message;
      announcement.updatedAt = Date.now();
      await announcement.save();
    } else {
      announcement = await Announcement.create({ message });
    }

    res.status(200).json({ message: announcement.message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set announcement' });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne();
    res.status(200).json(announcement || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to get announcement' });
  }
};

export const clearAnnouncement = async (req, res) => {
  try {
    await Announcement.deleteMany();
    res.status(200).json({ message: 'Announcement cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear announcement' });
  }
};

// GET all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Block/unblock user
export const blockOrUnblockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.` });
};

// GET all projects
export const getAllProjects = async (req, res) => {
  const projects = await Project.find().populate('clientId', 'name email');
  res.json(projects);
};

// GET all applications
export const getAllApplications = async (req, res) => {
  const applications = await Application.find()
    .populate('projectId')
    .populate('freelancerId', 'name email');
  res.json(applications);
};
