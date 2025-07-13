// src/store/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  jobDescription: "",
  emailText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
  emailFirstFollowUpText: "",
  emailSecondFollowUpText: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetEmail() {
      return initialState;
    },
    setEmail(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetEmail, setEmail } = emailSlice.actions;

export default emailSlice.reducer;
