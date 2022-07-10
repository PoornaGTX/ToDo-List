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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

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

  //logout user

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
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

  if (action.type === SET_EDIT_TODO) {
    const todo = state.todos.find(
      (singletodo) => singletodo._id === action.payload.id
    );
    const { _id, toDoName, date } = todo;
    return {
      ...state,
      isEditing: true,
      editToDOId: _id,
      toDoName,
      date,
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
};

export default reducer;
