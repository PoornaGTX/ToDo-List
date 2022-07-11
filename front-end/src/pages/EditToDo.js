import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import Alert from "../component/Alert";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/ProfilePageWrapper";

const EditToDo = () => {
  //get states from globel context
  const {
    isLoading,
    showAlert,
    displayAlert,
    toDoName,
    date,
    editToDOId,
    isComplete,
    editToDo,
    user,
    deleteToDo,
  } = useAppContext();

  //states
  const [updateToDoName, setUpdateToDoName] = useState(toDoName);
  const [updateToDoDate, setUpdateToDoDate] = useState(date);

  const navigate = useNavigate();

  //edit ToDo event handler
  const handleSubmit = (e) => {
    e.preventDefault();

    //validate the inputs
    if (!toDoName || !date) {
      displayAlert();
      return;
    }

    const todoUpdateData = {
      toDoName: updateToDoName,
      date: updateToDoDate,
    };

    editToDo(todoUpdateData);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  //complete ToDo event handler
  const completeHandle = () => {
    const isComplete = true;

    const todoUpdateData = { toDoName, date, isComplete };
    editToDo(todoUpdateData);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  //Delete ToDo event handler
  const deleteToDoHandle = () => {
    deleteToDo(editToDOId);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  //restricted from unauthorized users
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Edit ToDo</h3>
          <h4>{isComplete && "This ToDo is completed"}</h4>
          {showAlert && <Alert />}

          <div className="content">
            <div className="form-center">
              <label>ToDo Name</label>
              <label>ToDo Date</label>
              <label>ToDo Status</label>
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

              <input
                className="form-input"
                type="text"
                name="isComplete"
                readOnly
                value={isComplete ? "Completed tesk" : "incomplete task"}
              />

              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  disabled={isLoading}
                >
                  Edit ToDo
                </button>
              </div>

              <div className="btn-container">
                <button
                  type="button"
                  className="btn btn-block submit-btn"
                  disabled={isLoading}
                  onClick={deleteToDoHandle}
                >
                  Delete ToDo
                </button>
              </div>

              <div className="btn-container">
                <button
                  type="buttton"
                  className="btn btn-block submit-btn"
                  disabled={isLoading || isComplete}
                  onClick={completeHandle}
                >
                  Complete ToDo
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
