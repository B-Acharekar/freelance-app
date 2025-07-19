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
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProjectedRoute";
import ChatList from './components/ChatList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
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
            path="/profile/:id"
            element={
              <ProtectedRoute allowedRoles={["client", "freelancer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/chatlist" element={<ChatList />} />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
