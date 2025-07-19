import Project from '../models/Project.js';

// Create a new project (Client only)
export const createProject = async (req, res) => {
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
    res.status(500).json({ message: 'Failed to create project', error });
  }
};

// Get all projects (Freelancers browse)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('clientId', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('clientId', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project', error });
  }
};
