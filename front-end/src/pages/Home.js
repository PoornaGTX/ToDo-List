import { React, useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/NavBar";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import Wrapper from "../wrappers/ProfilePageWrapper";
import Search from "../component/Search";

const Home = () => {
  //get states from globel context
  const {
    user,
    showAlert,
    isLoading,
    createToDo,
    getToDos,
    todos,
    setEditToDo,
    displayAlert,
    search,
    sort,
    searchDate,
  } = useAppContext();

  const navigate = useNavigate();

  //states
  const [toDoName, setToDoName] = useState("");
  const [date, setDate] = useState("");

  //incomplete tasks
  const inCompleteToDos = todos.filter(
    (singletodo) => singletodo.isComplete === false
  );

  console.log(inCompleteToDos.length);

  //date
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var datenew = today.getDate();

  console.log(today.getMonth(), month);

  if (month >= 10) {
    var newToday = year + "-" + +month + "-" + datenew;
  } else {
    var newToday = year + "-" + "0" + month + "-" + datenew;
  }

  //event handler for add todo
  const handleSubmit = (e) => {
    if (!toDoName || !date) {
      displayAlert();
      return;
    }
    const toDodata = { toDoName, date };
    createToDo(toDodata);
  };

  //get the todo id for edit
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
  }, [search, sort, searchDate]);

  return (
    <>
      <NavBar />
      <Search />
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <center>
            <h2>Add ToDo</h2>
            <h5>
              You have {todos.length} TODO{todos.length > 1 && "'s"}
              {inCompleteToDos.length >= 1 && " and"} {inCompleteToDos.length}{" "}
              To Complete
            </h5>
          </center>
          {showAlert && <Alert />}
          <div className="form-center">
            <label>
              Enter ToDo Name Here
              <input
                className="form-input"
                type="text"
                name="toDoName"
                value={toDoName}
                onChange={(e) => setToDoName(e.target.value)}
              />
            </label>
            <label>
              Enter ToDo Name Here
              <input
                className="form-input"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait.." : "Add ToDo"}
            </button>
          </div>
        </form>
        <br />
        <br />
        <br />
        {todos.map((todo) => {
          const { _id, toDoName, date, isComplete } = todo;
          if (date === newToday) {
            var color = "red";
          }

          return (
            <div className="form-center" key={_id}>
              <FormRow
                type="text"
                name="toDoName"
                value={toDoName}
                color={color}
                readOnly={true}
              />

              <FormRow
                type="text"
                name="date"
                value={date}
                color={color}
                readOnly={true}
              />

              <button
                className={color ? "btn btn-block btn-danger" : "btn btn-block"}
                type="button"
                onClick={() => editHandle(_id)}
              >
                {(isComplete && "ToDo is Completed") ||
                  (color === "red" && "ToDo is overdue and Incomplete") ||
                  "Edit ToDo"}
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
