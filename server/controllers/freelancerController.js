import Freelancer from '../models/FreelancerProfile.js';

export const getFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ userId: req.params.userId });
    res.status(200).json(freelancer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFreelancer = async (req, res) => {
  try {
    const { skills, experience, bio } = req.body;
    const freelancer = await Freelancer.findOne({ userId: req.user.id });

    if (!freelancer) return res.status(404).json({ message: 'Not found' });

    if (skills) freelancer.skills = skills;
    if (experience) freelancer.experience = experience;
    if (bio) freelancer.bio = bio;

    await freelancer.save();
    res.status(200).json(freelancer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
