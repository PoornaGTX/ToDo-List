import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  todos: [],
  editToDOId: "",
  toDoName: "",
  date: "",
  isComplete: "",
  search: "",
  sort: "latest",
  searchDate: "",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const authFetch = axios.create({
  baseURL: "https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/V1",
});

//request

authFetch.interceptors.request.use(
  //before requesting to backend add the authorization headers
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
  //trigger with range 200 response codes
  (response) => {
    return response;
  },
  (error) => {
    //trigger with range out of 200 response codes
    console.log(error.response);
    if (error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export const createToDo = createAsyncThunk(
  "todo/create",
  async (toDoData, thunkAPI) => {
    try {
      return await authFetch.post("/todos", toDoData);
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getToDos = createAsyncThunk(
  "todo/gettodo",
  async (toDoData, thunkAPI) => {
    const { search, sort, searchDate } = thunkAPI.getState().todo;

    let url = `/todos?sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    if (searchDate) {
      url = url + `&searchDate=${searchDate}`;
    }
    try {
      const ToDos = await authFetch.get(url);
      const { toDo } = ToDos.data;
      return toDo;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const editToDo = createAsyncThunk(
  "todo/edittodo",
  async (todoUpdateData, thunkAPI) => {
    try {
      await authFetch.patch(`/todos/${state.editToDOId}`, todoUpdateData);
    } catch (error) {
      if (error.response.status === 401) return;
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "todo/deletetodo",
  async (todoUpdateData, thunkAPI) => {
    try {
      const dataresponse = await authFetch.delete(`/todos/${id}`);
      thunkAPI.dispatch(getToDos());
      return dataresponse;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    displayAlert: (state) => {
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "Please provide all values";
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertType = "";
      state.alertText = "";
    },

    handleChange: (state, action) => {
      return { ...state, [action.payload.name]: action.payload.value };
    },

    setEditToDo: (state, action) => {
      const todo = state.todos.find(
        (singletodo) => singletodo._id === action.payload.id
      );

      const { _id, toDoName, date, isComplete } = todo;
      state.editToDOId = _id;
      state.toDoName = toDoName;
      state.date = date;
      state.isComplete = isComplete;
    },
  },
  extraReducers: {
    [createToDo.pending]: (state) => {
      state.isLoading = true;
    },
    [createToDo.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "New ToDo Created";
    },
    [createToDo.rejected]: (state) => {
      state.isLoading = false;
    },

    [getToDos.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
    },
    [getToDos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [getToDos.rejected]: (state) => {
      state.isLoading = false;
    },

    [editToDo.pending]: (state) => {
      state.isLoading = true;
    },
    [editToDo.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "ToDo Updated";
    },
    [editToDo.rejected]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "something went wrong";
    },

    [deleteToDo.pending]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "something went wrong";
    },
    [deleteToDo.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "ToDo deleted";
    },
    [deleteToDo.rejected]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "something went wrong";
    },
  },
});

export const { setEditToDo, handleChange, clearAlert, displayAlert } =
  toDoSlice.actions;

export default toDoSlice.reducer;
