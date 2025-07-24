// server/controllers/applicationController.js
import Application from "../models/Application.js";
import Project from "../models/Project.js";
import User from "../models/Users.js";

export const createApplication = async (req, res) => {
  try {
    const {
      coverLetter,
      bidAmount,
      portfolioLink,
      portfolioFile,
      estimatedTime,
    } = req.body;
    const projectId = req.params.projectId;

    const freelancer = await User.findById(req.user.id);
    const project = await Project.findById(projectId);

    if (!freelancer || freelancer.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can apply" });
    }

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!portfolioFile) {
      return res.status(400).json({ message: "Portfolio file is required." });
    }

    const client = await User.findById(project.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const application = new Application({
      projectId,
      clientId: client._id,
      clientName: client.name,
      clientEmail: client.email,
      freelancerId: freelancer._id,
      freelancerName: freelancer.name,
      freelancerEmail: freelancer.email,
      freelancerSkills: freelancer.skills || [],
      title: project.title,
      description: project.description,
      budget: project.budget,
      requiredSkills: project.skillsRequired || [],
      coverLetter,
      bidAmount,
      estimatedTime,
      portfolioLink,
      portfolioFile,
    });
    await application.save();

    // Update project with bid data
    project.bids = project.bids || [];
    project.bidAmounts = project.bidAmounts || [];
    project.bids.push(freelancer._id);
    project.bidAmounts.push(parseInt(bidAmount));
    await project.save();

    // Update freelancer's application list
    freelancer.applications = freelancer.applications || [];
    if (!freelancer.applications.includes(application._id)) {
      freelancer.applications.push(application._id);
      await freelancer.save(); // Save updated freelancer document
    }
    
    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error("Application creation error:", err);
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
      portfolioFile: app.portfolioFile,
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

    if (
      !application.projectId ||
      !application.projectId.clientId ||
      application.projectId.clientId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.status = status;
    await application.save();

    if (status === "accepted") {
      const freelancer = await User.findById(application.freelancerId);
      if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
      }
      const projectId = application.projectId._id;
      const project = await Project.findById(projectId);
      if (project.budget !== application.bidAmount) {
        project.budget = application.bidAmount;
        await project.save();
      }

      if (!project.assignedFreelancerId) {
        project.assignedFreelancerId = application.freelancerId;
        await project.save();
      }

      // Only add if not already added
      if (!freelancer.currentProjects.includes(projectId)) {
        freelancer.currentProjects.push(projectId);
        await freelancer.save();
      }
    }

    res.json({ message: `Application ${status}` });
  } catch (err) {
    console.error("Update application status error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter, bidAmount, portfolioLink, portfolioFile } = req.body;

    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.freelancerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.coverLetter = coverLetter || application.coverLetter;
    application.bidAmount = bidAmount || application.bidAmount;
    application.portfolioLink = portfolioLink || application.portfolioLink;
    application.portfolioFile = portfolioFile || application.portfolioFile;

    await application.save();
    res.json({ message: "Application updated successfully", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.freelancerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await application.deleteOne();
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id).populate(
      "projectId",
      "title description"
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    // Check if current user is the freelancer who created it
    if (application.freelancerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
