import { React, useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/NavBar";
import FormRow from "../component/FormRow";
import Alert from "../component/Alert";
import Wrapper from "../wrappers/ProfilePageWrapper";
import Search from "../component/Search";

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
    search,
    sort,
    searchDate,
  } = useAppContext();
  const navigate = useNavigate();

  const [toDoName, setToDoName] = useState("");
  const [date, setDate] = useState("");

  //date
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var datenew = today.getDate();

  if (month >= 10) {
    var newToday = year + "-" + +month + "-" + datenew;
  } else {
    var newToday = year + "-" + "0" + month + "-" + datenew;
  }

  const handleSubmit = (e) => {
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
  }, [search, sort, searchDate]);

  return (
    <>
      <NavBar />
      <Search />
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <center>
            <h3>Add ToDo</h3>
          </center>
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
              />
              <FormRow type="text" name="date" value={date} color={color} />
              <button
                className="btn btn-block"
                type="button"
                onClick={() => editHandle(_id)}
                disabled={isComplete}
              >
                {isComplete ? "ToDo is Completed" : "Edit"}
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
