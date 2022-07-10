import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/ProfilePageWrapper";

const EditToDo = () => {
  const { isLoading, showAlert, displayAlert, toDoName, date, editToDo, user } =
    useAppContext();

  const [updateToDoName, setUpdateToDoName] = useState(toDoName);
  const [updateToDoDate, setUpdateToDoDate] = useState(date);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!toDoName || !date) {
      displayAlert();
      return;
    }

    const todoUpdateData = {
      toDoName: updateToDoName,
      date: updateToDoDate,
    };

    console.log(todoUpdateData);

    editToDo(todoUpdateData);
  };

  //restricted from unauthorized users
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return (
    <>
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Edit ToDo</h3>
          {showAlert && alert("todo udpate ok")}

          <div className="content">
            <div className="form-center">
              <input
                className="form-input"
                type="text"
                name="toDoName"
                value={updateToDoName}
                onChange={(e) => setUpdateToDoName(e.target.value)}
              />

              <input
                className="form-input"
                type="date"
                name="date"
                value={updateToDoDate}
                onChange={(e) => setUpdateToDoDate(e.target.value)}
              />
              <br />

              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  disabled={isLoading}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default EditToDo;
