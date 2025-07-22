import Project from "../models/Project.js";

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
      return res.status(404).json({ message: 'Project not found' });
    }

    // Optional: check ownership
    if (project.clientId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this project' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};