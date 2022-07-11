import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/ProfilePageWrapper";
import NavBar from "../component/NavBar";

const Profile = () => {
  const { user, showAlert, updateUser, isLoading, logoutUser } =
    useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({ name, email });
  };

  const changePassword = () => {
    navigate("/login/frogetpassword");
    logoutUser();
  };

  //restricted from unauthorized users
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>profile</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />

            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
              onClick={changePassword}
            >
              {isLoading ? "Please Wait.." : "Change Password"}
            </button>

            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait.." : "Update Details"}
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Profile;
