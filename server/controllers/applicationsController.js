// server/controllers/applicationController.js
import Application from "../models/Application.js";
import Project from "../models/Project.js";
import User from "../models/Users.js";

export const createApplication = async (req, res) => {
  try {
    const { coverLetter, bidAmount, portfolioLink } = req.body;
    const projectId = req.params.projectId;
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can apply" });
    }

    const application = new Application({
      projectId,
      freelancerId: req.user.id,
      coverLetter,
      bidAmount,
      portfolioLink,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicationsByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const applications = await Application.find({
      projectId: project._id,
    }).populate("freelancerId", "name email");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "freelancer") {
      return res
        .status(403)
        .json({ message: "Only freelancers can view their applications" });
    }

    const applications = await Application.find({
      freelancerId: req.user.id,
    }).populate("projectId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
