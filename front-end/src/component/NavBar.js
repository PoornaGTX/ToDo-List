import { React, useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();

  const LogoutHandle = () => {
    logoutUser();
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link"
              aria-current="page"
              href="http://localhost:3000/"
            >
              Home
            </a>
            <a className="nav-link" href="http://localhost:3000/update-profile">
              Profile
            </a>
            <a className="nav-link" href="http://localhost:3000/update-profile">
              {user?.name}{" "}
            </a>

            <button
              className="nav-link btn btn-primary float-right"
              onClick={LogoutHandle}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
