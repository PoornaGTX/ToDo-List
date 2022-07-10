import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  REGISTER_USER,
  REGISTER_COMPLETE,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_USER_COMPLETE,
  LOGIN_USER_ERROR,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  UPDATE_USER,
  UPDATE_USER_COMPLETE,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  CREATE_TODO,
  CREATE_TODO_COMPLETE,
  CREATE_TODO_ERROR,
  CLEAR_VALUES,
  GET_TODOS,
  GET_TODOS_COMPLETED,
  SET_EDIT_TODO,
  EDIT_TODO,
  EDIT_TODO_COMPLETE,
  EDIT_TODO_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  todos: [],
  editToDOId: "",
  toDoName: "",
  date: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //store user details in local storage
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  //remove user details in local storage when logout
  const removeFromTheLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //register
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER });
    try {
      const response = await axios.post("/api/v1/users/register", currentUser);
      //console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_COMPLETE,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: REGISTER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //login
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER });
    try {
      const response = await axios.post("/api/V1/users/login", currentUser);

      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_COMPLETE,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //logout
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeFromTheLocalStorage();
  };

  //update user details
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER });
    try {
      const { data } = await authFetch.patch("users/updateUser", currentUser);

      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_COMPLETE,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  //add ToDo

  const createToDo = async (toDoData) => {
    dispatch({ type: CREATE_TODO });

    try {
      await authFetch.post("/todos", toDoData);

      dispatch({ type: CREATE_TODO_COMPLETE });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_TODO_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //get all ToDos

  const getToDos = async () => {
    let url = `/todos`;
    dispatch({ type: GET_TODOS });

    try {
      const ToDos = await authFetch.get(url);
      const { toDo } = ToDos.data;

      dispatch({
        type: GET_TODOS_COMPLETED,
        payload: { toDo },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const setEditToDo = (id) => {
    dispatch({ type: SET_EDIT_TODO, payload: { id } });
  };

  const editToDo = async (todoUpdateData) => {
    dispatch({ type: EDIT_TODO });

    try {
      await authFetch.patch(`/todos/${state.editToDOId}`, todoUpdateData);
      dispatch({ type: EDIT_TODO_COMPLETE });
      //dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      //if (error.response.status === 401) return;
      dispatch({
        type: EDIT_TODO_ERROR,
        //payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        displayAlert,
        updateUser,
        createToDo,
        getToDos,
        setEditToDo,
        editToDo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
