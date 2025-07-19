import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold fs-4" to="/">SB Works</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
        <ul className="navbar-nav gap-2 align-items-center">

          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>

          {user?.role === 'client' && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects/post">Post Project</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects/browse">Browse Projects</NavLink>
              </li>
            </>
          )}

          {user?.role === 'freelancer' && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects/browse">Browse Projects</NavLink>
            </li>
          )}

          {!user ? (
            <>
              <li className="nav-item">
                <NavLink className="btn btn-outline-light btn-sm me-2" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-primary btn-sm" to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm ms-2" onClick={logout}>Logout</button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
