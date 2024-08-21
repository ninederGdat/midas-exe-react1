import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

export const emtyUserState: userModel = {
  fullname: "",
  role: "",
  accountId: 0,
  location: "",
  phoneNumber: "",
  status: "",
  email: "",
};

export const userAuthSlice = createSlice({
  name: "MenuItem",
  initialState: emtyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullname = action.payload.fullname;
      state.accountId = action.payload.accountId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.location = action.payload.location;
      state.phoneNumber = action.payload.phoneNumber;
      state.status = action.payload.status;
    },
    updateUserStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setLoggedInUser, updateUserStatus } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
