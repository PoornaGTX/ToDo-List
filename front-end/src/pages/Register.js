import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../wrappers/RegisterPageWrapper";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import { displayAlert } from "../features/toDo/toDoSlice";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

//initial states
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //states
  const [values, setValues] = useState(initialState);

  //get states from globel context
  const { user, isLoading, showAlert } = useSelector((store) => store.user);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    //dynamic object properties
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //event handler for login/register
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    //validate the values
    if (!email || !password || (!isMember && !name)) {
      dispatch(displayAlert());

      return;
    }

    const currentUser = { name, email, password };

    //already registered user
    if (isMember) {
      dispatch(loginUser(currentUser));
    } else {
      //unregisterd user
      dispatch(registerUser(currentUser));
    }
  };

  //event handler for password reset
  const passwordRest = () => {
    navigate("/login/frogetpassword");
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    console.log(user);
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Loging" : "Register"}</h3>

        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
          <button type="button" className="member-btn" onClick={passwordRest}>
            Froget password
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
