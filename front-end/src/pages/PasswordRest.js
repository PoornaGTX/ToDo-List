import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../wrappers/RegisterPageWrapper";
import Alert from "../component/Alert";

const PasswordRest = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const { user, isLoading, showAlert, displayAlert, loginUserNewPassword } =
    useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      displayAlert();
      return;
    }

    loginUserNewPassword(password, id, token);

    setTimeout(() => {
      navigate("/register");
    }, 4000);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>Reset Password</h3>

        {showAlert && <Alert />}
        <label>Enter New Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default PasswordRest;
