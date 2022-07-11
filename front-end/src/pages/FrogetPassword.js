import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../wrappers/RegisterPageWrapper";
import Alert from "../component/Alert";

const FrogetPassword = () => {
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    loginUserPasswordRest,
    displayAlert,
    PasswordRestStatus,
  } = useAppContext();

  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      displayAlert();
      return;
    }
    loginUserPasswordRest(email);
    console.log(email);
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
        <h3>{PasswordRestStatus ? "Rest Password" : "Froget Password"}</h3>
        {showAlert && <Alert />}
        <label>Enter Email here</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          reset
        </button>
      </form>
    </Wrapper>
  );
};

export default FrogetPassword;
