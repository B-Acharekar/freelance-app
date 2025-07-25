import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
