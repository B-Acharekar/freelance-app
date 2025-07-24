import { Container, Row, Col, Card, Badge, CloseButton } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSystemAnnouncementForUser } from "../services/userService";
import { getUserProfile } from "../services/userService";
import {
  FaPlus,
  FaSearch,
  FaFolderOpen,
  FaClipboardList,
  FaUserCircle,
  FaComments,
  FaBullhorn,
} from "react-icons/fa";
import Notifications from "../components/Notifications";
import PortfolioUploader from "../components/PortfolioUploader";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [announcement, setAnnouncement] = useState("");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await getSystemAnnouncementForUser();
        if (data?.message) {
          setAnnouncement(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch announcement", error);
      }
    };
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token); // ✅ Pass the token
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, [token]); // ✅ Optional: Add token as dependency

  return (
    <Container className="py-5">
      {/* System Announcement */}
      {announcement && showAnnouncement && (
        <Card className="mb-4 border-0 rounded-4 bg-white shadow-sm position-relative px-3 py-2">
          <Card.Body className="d-flex align-items-start justify-content-between">
            <div className="d-flex align-items-start gap-2">
              <FaBullhorn size={20} className="text-warning mt-1" />
              <div>
                <div className="fw-semibold text-dark small">System Announcement</div>
                <div className="text-muted small">{announcement}</div>
              </div>
            </div>
            <CloseButton
              variant="dark"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => setShowAnnouncement(false)}
            />
          </Card.Body>
        </Card>
      )}

      {/* Welcome Banner */}
      <Card className="mb-4 border-0 shadow-sm rounded-4 bg-gradient-lightblue">
        <Card.Body className="flex-column flex-md-row d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <h2 className="fw-bold mb-1 text-dark">
              Welcome back, <span className="text-primary">{user?.name || user?.email}</span>
            </h2>
            <Badge bg="info" className="text-uppercase">
              {user?.role}
            </Badge>
          </div>
          <div className="mt-3 mt-md-0">
            <p className="mb-0 text-muted fs-6">
              Here’s a quick overview of your activity.
            </p>
            <div className="mt-3">
              {user?.role === "freelancer" && (
                <Row className="mt-3 mx-auto g-5">
                  <Col md={3}>
                    <StatCard title="Funds" value={`₹${profile?.funds || 0}`} color="text-primary" />
                  </Col>
                  <Col md={3}>
                    <StatCard title="Current Projects" value={profile?.currentProjects?.length || 0} color="text-success" />
                  </Col>
                  <Col md={3}>
                    <StatCard title="Completed Projects" value={profile?.completedProjects?.length || 0} color="text-warning" />
                  </Col>
                  <Col md={3}>
                    <StatCard title="Applications" value={profile?.applications?.length || 0} color="text-info" />
                  </Col>
                </Row>

              )}

            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Quick Actions Section */}
      <h4 className="fw-semibold mb-4 text-uppercase text-secondary">
        Quick Actions
      </h4>
      <Row className="g-4 mb-5">
        {user?.role === "client" && (
          <>
            <ActionCard
              title="Post a Project"
              text="Hire top freelancers by posting your project."
              icon={<FaPlus className="me-3 text-primary" />}
              btnText="Post Now"
              btnVariant="primary"
              link="/projects/post"
            />
            <ActionCard
              title="Browse Projects"
              text="Explore available freelancers or project ideas."
              icon={<FaSearch className="me-3 text-success" />}
              btnText="Browse"
              btnVariant="success"
              link="/projects/browse"
            />
            <ActionCard
              title="My Projects"
              text="Manage all your posted projects."
              icon={<FaFolderOpen className="me-3 text-warning" />}
              btnText="View"
              btnVariant="warning"
              textWhite
              link="/my-projects"
            />
            <ActionCard
              title="Messages"
              text="View and manage your chats with freelancers."
              icon={<FaComments className="me-3 text-info" />}
              btnText="Go to Messages"
              btnVariant="info"
              link="/chat"
            />
          </>
        )}

        {user?.role === "freelancer" && (
          <>
            <ActionCard
              title="Browse Projects"
              text="Find freelance work that fits your skills."
              icon={<FaSearch className="me-3 text-success" />}
              btnText="Find Projects"
              btnVariant="success"
              link="/projects/browse"
            />
            <ActionCard
              title="My Applications"
              text="Track all your applied projects and status."
              icon={<FaClipboardList className="me-3 text-info" />}
              btnText="Track"
              btnVariant="info"
              textWhite
              link="/applications/my"
            />
          </>
        )}
      </Row>

      {/* Profile Section */}
      <h4 className="fw-semibold mb-4 text-uppercase text-secondary">
        My Profile
      </h4>
      <Row className="g-4">
        <ActionCard
          title="View/Edit Profile"
          text="Manage your personal details, bio, and skills."
          icon={<FaUserCircle className="me-3 text-secondary" />}
          btnText="Go to Profile"
          btnVariant="secondary"
          link={`/profile/${user._id}`}
        />
      </Row>
    </Container>
  );
};

// Reusable Components
const ActionCard = ({
  title,
  text,
  icon,
  btnText,
  btnVariant,
  link,
  textWhite,
}) => (
  <Col md={6} lg={4}>
    <Card className="h-100 border-0 shadow-sm rounded-4 bg-white position-relative transition" style={{ transition: 'transform 0.3s ease' }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="mb-3">
          <Card.Title className="d-flex align-items-center fw-semibold fs-5 mb-2 text-dark">
            {icon} <span className="ms-2">{title}</span>
          </Card.Title>
          <Card.Text className="text-muted small">{text}</Card.Text>
        </div>
        <Link
          to={link}
          className={`btn btn-${btnVariant} w-100 rounded-pill fw-semibold ${textWhite ? "text-white" : ""}`}
        >
          {btnText}
        </Link>
      </Card.Body>
    </Card>
  </Col>
);

const StatCard = ({ title, value, color }) => (
  <Card className="h-100 shadow-sm border-0 rounded-4 bg-white text-center">
    <Card.Body className="py-4">
      <div className="mb-2">
        <h6 className="text-uppercase text-muted small mb-1">{title}</h6>
        <h3 className={`fw-bold ${color}`}>{value}</h3>
      </div>
    </Card.Body>
  </Card>
);

export default Dashboard;
