import Project from "../models/Project.js";
import User from "../models/Users.js";

// Create a new project (Client only)
export const createProject = async (req, res) => {
  if (req.user.role !== "client") {
    return res
      .status(403)
      .json({ message: "Only clients can create projects" });
  }

  try {
    const { title, description, budget, skillsRequired } = req.body;
    const clientId = req.user.id;

    const newProject = new Project({
      title,
      description,
      budget,
      skillsRequired,
      clientId,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error });
  }
};

// Get all projects (Freelancers browse)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("clientId", "name email");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "clientId",
      "name email"
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error });
  }
};

export const getMyPostedProjects = async (req, res) => {
  try {
    const clientId = req.user.id;

    const projects = await Project.find({ clientId }); // assuming clientId field exists
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching posted projects:", error);
    res.status(500).json({ message: "Failed to fetch your posted projects" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.clientId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optional: check ownership
    if (project.clientId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this project" });
    }

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyActiveProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({
      freelancerId: userId,
      status: "accepted",
    }).populate("projectId");

    const projects = applications.map((app) => ({
      _id: app.projectId._id,
      title: app.projectId.title,
      description: app.projectId.description,
      budget: app.bidAmount, // custom: use bid amount
    }));

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to load freelancer projects" });
  }
};

export const completeProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status === "completed") {
      return res.status(400).json({ message: "Project is already completed" });
    }

    // Mark as completed
    project.status = "completed";
    await project.save();

    const freelancer = await User.findById(project.assignedFreelancer);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    // Pay the freelancer (add funds)
    freelancer.funds = (freelancer.funds || 0) + (project.budget || 0);

    // Move from currentProjects → completedProjects
    freelancer.currentProjects = freelancer.currentProjects.filter(
      (id) => id.toString() !== project._id.toString()
    );
    freelancer.completedProjects.push(project._id);

    await freelancer.save();

    res
      .status(200)
      .json({ message: "Project marked completed and freelancer paid." });
  } catch (err) {
    console.error("Error completing project:", err);
    res.status(500).json({ error: err.message });
  }
};
