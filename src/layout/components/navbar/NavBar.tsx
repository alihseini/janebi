import React from "react";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/auth/login">Login</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
