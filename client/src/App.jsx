import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PostProject from './pages/PostProject';
import BrowseProjects from './pages/BrowseProjects';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/post" element={<PostProject />} />
          <Route path="/projects/browse" element={<BrowseProjects />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
