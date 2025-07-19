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
    }).populate("projectId", "title description");

    // Format response with status and essential details
    const formatted = applications.map((app) => ({
      _id: app._id,
      projectTitle: app.projectId?.title,
      projectDescription: app.projectId?.description,
      bidAmount: app.bidAmount,
      coverLetter: app.coverLetter,
      portfolioLink: app.portfolioLink,
      status: app.status, // 👈 Include status
      createdAt: app.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(id).populate("projectId");
    if (!application) return res.status(404).json({ message: "Not found" });

    // Only client who owns the project can update status
    if (application.projectId.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.status = status;
    await application.save();

    res.json({ message: `Application ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};