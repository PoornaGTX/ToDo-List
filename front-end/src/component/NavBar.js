import React from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();

  const LogoutHandle = () => {
    dispatch(logoutUser());
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
            {/* <a className="nav-link" href="http://localhost:3000/update-profile">
              {user?.name}{" "}
            </a> */}
          </div>
        </div>
      </div>

      <form className="navbar navbar-expand-lg">
        <button
          className="nav-link btn btn-primary float-right"
          onClick={LogoutHandle}
        >
          logout
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
