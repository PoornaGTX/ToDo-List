import { React, useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/NavBar";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import Wrapper from "../wrappers/ProfilePageWrapper";

const Home = () => {
  const {
    user,
    showAlert,
    isLoading,
    createToDo,
    getToDos,
    todos,
    setEditToDo,
    displayAlert,
  } = useAppContext();
  const navigate = useNavigate();

  const [toDoName, setToDoName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toDoName || !date) {
      displayAlert();
      return;
    }
    const toDodata = { toDoName, date };
    createToDo(toDodata);
  };

  const editHandle = (_id) => {
    setEditToDo(_id);
    navigate("/edit-todo");
  };

  //restricted from unauthorized users
  useEffect(() => {
    getToDos();
    if (!user) {
      navigate("/register");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Add ToDo</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            <input
              className="form-input"
              type="text"
              name="toDoName"
              value={toDoName}
              onChange={(e) => setToDoName(e.target.value)}
            />

            <input
              className="form-input"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait.." : "Save and Changes"}
            </button>
          </div>
        </form>
        <br />
        <br />
        <br />
        {todos.map((todo) => {
          const { _id, toDoName, date } = todo;
          return (
            <div className="form-center" key={_id}>
              <FormRow type="text" name="toDoName" value={toDoName} />
              <FormRow type="text" name="date" value={date} />
              <button
                className="btn btn-block"
                type="button"
                onClick={() => editHandle(_id)}
              >
                Edit
              </button>
              <br />
            </div>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Home;
