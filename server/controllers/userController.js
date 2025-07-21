import User from "../models/Users.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // use token data
    console.log("User from token:", req.user);

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await User.findById(req.params.id).select("-password");

    if (!freelancer || freelancer.role !== "freelancer") {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update freelancer profile
export const updateFreelancerProfile = async (req, res) => {
  const { id } = req.params;
  const { skills, experience, bio } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role !== "freelancer") {
      return res
        .status(403)
        .json({ error: "Only freelancers can update this section" });
    }

    if (!Array.isArray(user.skills)) {
      return res.status(400).json({ error: "Skills must be an array" });
    }

    user.skills = skills;
    user.experience = experience;
    user.bio = bio;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT: Update client profile
export const updateClientProfile = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: All freelancers
export const getFreelancers = async (req, res) => {
  try {
    const freelancers = await User.find({ role: "freelancer" }).select(
      "-password"
    );
    res.status(200).json(freelancers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
