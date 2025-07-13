// src/store/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetched: false,
  resume_summary_generation: 0,
  resume_basicInfo: 0,
  resume_skills: 0,
  resume_individualWorkExperience: 0,
  linkedin_keywords_generation: 0,
  linkedin_headline_generation: 0,
  linkedin_about_generation: 0,
  linkedin_individualWorkExperience: 0,
  cover_letter_generation: 0,
  email_generation: 0,
  pdf_files_upload: 0,
  review_resume: 0,
  consulting_bids_generation: 0,
  save_resume: 0,
  download_resume: 0,
};

const creditLimitsSlice = createSlice({
  name: "creditLimit",
  initialState,
  reducers: {
    resetCredits(state, action) {
      return {
        ...initialState,
        state: action.payload,
      };
    },
    setCredits(state, action) {
      return {
        ...action.payload,
      };
    },
    setField(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const {
  resetCredits,
  setCredits,
  setField,
  // setLoadingState,
} = creditLimitsSlice.actions;

export default creditLimitsSlice.reducer;
