import { createSlice } from "@reduxjs/toolkit";
import { loginModel, userModel } from "../../Interfaces";

export const emtyUserState: userModel = {
  unique_name: "",
  role: "",
  // username: "",
  UserID: 0,
  location: "",
  // dateOfBirth: "",
  // gender: "",
  phoneNumber: "",
  // status: "",
  email: "",
};

export const userAuthSlice = createSlice({
  name: "MenuItem",
  initialState: emtyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.unique_name = action.payload.unique_name;
      state.UserID = action.payload.UserID;
      state.email = action.payload.email;
      state.role = action.payload.role;
      // state.username = action.payload.username;

      state.location = action.payload.location;
      // state.dateOfBirth = action.payload.dateOfBirth;
      // state.gender = action.payload.gender;
      state.phoneNumber = action.payload.phoneNumber;
      // state.status = action.payload.status;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
