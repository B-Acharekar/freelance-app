import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomNavbar from './components/CustomNavbar';
import PostProject from './pages/PostProject';
import BrowseProjects from './pages/BrowseProjects';
import MyApplications from "./pages/MyApplications";
import ApplyForProjectWrapper from "./pages/ApplyForProjectWrapper";
import ApplicationsByProjectWrapper from "./pages/ApplicationsByProjectWrapper";
import PostedProjects from './pages/PostedProjects';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import FreelancerProfilePage from "./pages/FreelancerProfilePage";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProjectedRoute";
import ChatList from './components/ChatList';
import FloatingBackButton from "./components/FloatingBackButton";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProject from "./pages/EditProject";
import EditApplication from "./pages/EditApplication";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <FloatingBackButton />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/post"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <PostProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/browse"
            element={
              <ProtectedRoute allowedRoles={['client', 'freelancer']}>
                <BrowseProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/edit/:projectid"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/my"
            element={
              <ProtectedRoute allowedRoles={['freelancer']}>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/apply/:projectId"
            element={
              <ProtectedRoute allowedRoles={['freelancer']}>
                <ApplyForProjectWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/edit/:projectId"
            element={
              <ProtectedRoute allowedRoles={['freelancer']}>
                <EditApplication />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/project/:projectId"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ApplicationsByProjectWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-projects"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <PostedProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatroom/:receiverId/:projectId"
            element={
              <ProtectedRoute allowedRoles={["client", "freelancer"]}>
                <ChatRoom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={["client", "freelancer"]}>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute allowedRoles={["client", "freelancer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freelancer/:id"
            element={
              <ProtectedRoute allowedRoles={["client", "freelancer"]}>
                <FreelancerProfilePage />
              </ProtectedRoute>
            }
          />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
