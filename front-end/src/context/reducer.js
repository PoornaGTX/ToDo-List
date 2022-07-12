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
  GET_TODOS,
  GET_TODOS_COMPLETED,
  SET_EDIT_TODO,
  EDIT_TODO,
  EDIT_TODO_COMPLETE,
  EDIT_TODO_ERROR,
  HANDLE_CHANGE,
  DELETE_TODO,
  LOGIN_PASSWORDREST,
  LOGIN_PASSWORDREST_COMPLETE,
  LOGIN_PASSWORDREST_ERROR,
  LOGIN_NEWPASSWORD,
  LOGIN_NEWPASSWORD_COMPLETE,
  LOGIN_NEWPASSWORD_ERROR,
} from "./actions";

import { initialState } from "./appContext";

// display alert
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

  //clear alert
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  //user register

  if (action.type === REGISTER_USER) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting",
    };
  }

  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //user login

  if (action.type === LOGIN_USER) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      PasswordRestStatus: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //password reset
  if (action.type === LOGIN_PASSWORDREST) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_PASSWORDREST_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Link",
    };
  }

  if (action.type === LOGIN_PASSWORDREST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Error",
    };
  }

  //new password after reset

  if (action.type === LOGIN_NEWPASSWORD) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_NEWPASSWORD_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_NEWPASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Error",
    };
  }

  //logout user

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      PasswordRestStatus: true,
      user: null,
      token: null,
    };
  }

  //update user details

  if (action.type === UPDATE_USER) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // create todo

  if (action.type === CREATE_TODO) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_TODO_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New ToDo Created",
    };
  }

  //get todos

  if (action.type === GET_TODOS) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_TODOS_COMPLETED) {
    return {
      ...state,
      isLoading: false,
      todos: action.payload.toDo,
    };
  }

  //edit todo

  if (action.type === SET_EDIT_TODO) {
    const todo = state.todos.find(
      (singletodo) => singletodo._id === action.payload.id
    );
    const { _id, toDoName, date, isComplete } = todo;
    return {
      ...state,
      isEditing: true,
      editToDOId: _id,
      toDoName,
      date,
      isComplete,
    };
  }

  if (action.type === EDIT_TODO) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_TODO_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "ToDo Updated",
    };
  }

  if (action.type === EDIT_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "something went wrong",
    };
  }

  //delete todo

  if (action.type === DELETE_TODO) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertType: "success",
      alertText: "ToDo deleted",
    };
  }

  //handle change

  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
};

export default reducer;
