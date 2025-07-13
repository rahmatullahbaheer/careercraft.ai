// src/store/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  jobDescription: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  date: "",
  coverLetterText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
};

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    resetCoverLetter() {
      return initialState;
    },
    setCoverLetter(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetCoverLetter, setCoverLetter } = coverLetterSlice.actions;

export default coverLetterSlice.reducer;
