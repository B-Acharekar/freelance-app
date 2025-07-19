import mongoose from 'mongoose';

const freelancerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  skills: [String],
  experience: String,
  bio: String,
  rating: {
    type: Number,
    default: 0,
  },
  currentProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  completedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  funds: {
    type: Number,
    default: 0,
  },
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);
export default Freelancer;
