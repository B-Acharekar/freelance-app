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
        <Card className="mb-5 shadow-sm border-0 rounded-4 bg-light position-relative">
          <Card.Body className="d-flex align-items-start gap-3">
            <FaBullhorn size={24} className="text-warning mt-1" />
            <div>
              <h5 className="text-dark fw-bold mb-1">System Announcement</h5>
              <p className="mb-0 text-muted">{announcement}</p>
            </div>
            <CloseButton
              onClick={() => setShowAnnouncement(false)}
              className="position-absolute top-0 end-0 m-3"
            />
          </Card.Body>
        </Card>
      )}
      {/* Welcome Banner */}
      <Card className="mb-4 border-0 shadow-sm rounded-4 bg-gradient-lightblue">
        <Card.Body className="flex-column flex-md-row d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <h2 className="fw-bold mb-1 text-primary">
              Welcome back, {user?.name || user?.email}
            </h2>
            <Badge bg="dark" className="text-uppercase">
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
                    <StatCard title="Funds" value={`$${profile?.funds || 0}`} color="text-primary" />
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

const ActionCard = ({
  title,
  text,
  icon,
  btnText,
  btnVariant,
  link,
  textWhite,
}) => (
  <Col md={4}>
    <Card className="h-100 shadow-sm border-0 rounded-4 card-hover bg-white">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-semibold d-flex align-items-center text-uppercase fs-5 mb-3">
          {icon} {title}
        </Card.Title>
        <Card.Text className="text-muted flex-grow-1">{text}</Card.Text>
        <Link
          to={link}
          className={`btn btn-${btnVariant} w-100 mt-4 rounded-pill fw-semibold ${textWhite ? "text-white" : ""}`}
          style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.1)" }}
        >
          {btnText}
        </Link>
      </Card.Body>
    </Card>
  </Col>
);

const StatCard = ({ title, value, color }) => (
  <Card className="h-100 shadow-sm border-0 rounded-4 text-center bg-white">
    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
      <h6 className="text-muted text-uppercase mb-2">{title}</h6>
      <h4 className={`fw-bold ${color}`}>{value}</h4>
    </Card.Body>
  </Card>
);

export default Dashboard;
