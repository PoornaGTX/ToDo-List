import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isComplete: "",
  PasswordRestStatus: false,
};

const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

//remove user details in local storage when logout

const removeFromTheLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk(
  "user/create",
  async (currentUser, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/register",
        currentUser
      );
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      thunkAPI.dispatch(setUser(user));
      thunkAPI.dispatch(clearAlert());
      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginuser",
  async (currentUser, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/V1/users/login",
        currentUser
      );
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      thunkAPI.dispatch(setUser(user));
      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
    thunkAPI.dispatch(clearAlert());
  }
);

export const loginUserPasswordRest = createAsyncThunk(
  "user/loginuserpasswordrest",
  async (email, thunkAPI) => {
    try {
      return await axios.post(
        "https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/V1/users/login/frogetpassword",
        { email }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
    thunkAPI.dispatch(clearAlert());
  }
);

export const loginUserNewPassword = createAsyncThunk(
  "user/loginusernewpassword",
  async ({ password, id, token }, thunkAPI) => {
    const newPassword = password;
    try {
      const response = await axios.post(
        `https://sbwcnnxsyc.execute-api.us-east-1.amazonaws.com/dev/api/V1/users/login/newpassword/${id}/${token}`,
        { newPassword }
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
    thunkAPI.dispatch(clearAlert());
  }
);

export const updateUser = createAsyncThunk(
  "user/updateuser",
  async (currentUser, thunkAPI) => {
    try {
      const { data } = await authFetch.patch("users/updateUser", currentUser);
      const { user, token } = data;
      return user, token;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
    thunkAPI.dispatch(clearAlert());
  }
);

const userSlice = createSlice({
  name: "user",
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
    logoutUser: (state) => {
      state.PasswordRestStatus = true;
      state.user = null;
      state.token = null;
      removeFromTheLocalStorage();
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "User Created! Redirecting";
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.msg;
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Login Successful! Redirecting";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.msg;
    },

    [loginUserPasswordRest.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUserPasswordRest.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = "Link";
    },
    [loginUserPasswordRest.rejected]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "Error";
    },

    [loginUserNewPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUserNewPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = action.payload.msg;
    },
    [loginUserNewPassword.rejected]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = "Error";
    },

    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.alertType = "success";
      state.alertText = "User Profile Updated";
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = action.payload.msg;
    },
  },
});

export const { logoutUser, clearAlert, displayAlert, setUser } =
  userSlice.actions;

export default userSlice.reducer;
