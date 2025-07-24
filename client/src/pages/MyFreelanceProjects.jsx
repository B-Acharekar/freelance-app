import { useEffect, useState } from "react";
import { fetchProjectById, completeProject } from "../services/projectService";
import { getUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";

const MyFreelanceProjects = () => {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState("active");
    const [activeProjects, setActiveProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(null);

    const fetchUserProjects = async () => {
        if (!token) return;

        try {
            console.log("Fetching user....")
            setLoading(true);
            const user = await getUserProfile(token);
            const current = user.currentProjects || [];
            const completed = user.completedProjects || [];

            const [activeDetails, completedDetails] = await Promise.all([
                Promise.all(current.map((id) => fetchProjectById(id).then((res) => res.data))),
                Promise.all(completed.map((id) => fetchProjectById(id).then((res) => res.data))),
            ]);

            setActiveProjects(activeDetails);
            setCompletedProjects(completedDetails);
        } catch (err) {
            console.error("Error loading projects:", err.message);
            alert("Failed to load your projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProjects();
    }, [token]);
    console.log("Token", token);
    
    const handleComplete = async (projectId) => {
        console.log("Running handleComplete....")
        setCompleting(projectId);
        console.log("ProjectId:", projectId);
        try {
            await completeProject(projectId, token);
            alert("Project marked as complete.");
            fetchUserProjects();
        } catch (err) {
            console.error("Completion error:", err.message);
            alert("Failed to mark project as complete.");
        } finally {
            setCompleting(null);
        }
    };

    const renderProjects = (projects, isCompletedTab = false) => (
        <div className="row mt-4">
            {projects.map((project) => (
                <div className="col-md-12 mb-4" key={project._id}>
                    <div className="card shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-start">
                            <div>
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text">{project.description}</p>
                                <p className="text-muted">
                                    Budget: <strong>${project.budget}</strong>
                                </p>
                                {isCompletedTab && (
                                    <div className="text-success d-flex align-items-center gap-2">
                                        <FaCheckCircle className="me-1" />
                                        <span>Completed</span>
                                    </div>
                                )}
                            </div>
                            {!isCompletedTab && project.status !== "completed" && (
                                <button
                                    className={`btn btn-sm ${completing === project._id ? "btn-secondary" : "btn-success"
                                        }`}
                                    onClick={() => handleComplete(project._id)}
                                    disabled={completing === project._id}
                                >
                                    {completing === project._id ? "Completing..." : "Mark as Complete"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container py-5">
            <h2 className="mb-4">My Freelance Projects</h2>

            {/* Tab Switcher */}
            <ul className="nav nav-tabs mb-3">
                {["active", "completed"].map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} Projects
                        </button>
                    </li>
                ))}
            </ul>

            {loading ? (
                <p>Loading projects...</p>
            ) : activeTab === "active" ? (
                activeProjects.length === 0 ? (
                    <p>No active projects.</p>
                ) : (
                    renderProjects(activeProjects)
                )
            ) : completedProjects.length === 0 ? (
                <p>No completed projects yet.</p>
            ) : (
                renderProjects(completedProjects, true)
            )}
        </div>
    );
};

export default MyFreelanceProjects;
