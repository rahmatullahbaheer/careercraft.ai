import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  headlineText: "",
  generatedOnDate: "",
  userEmail: "",
};

const linkedInHeadlineSlice = createSlice({
  name: "linkedInHeadlines",
  initialState,
  reducers: {
    resetLinkedInHeadline() {
      return initialState;
    },
    setLinkedInHeadline(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetLinkedInHeadline, setLinkedInHeadline } =
  linkedInHeadlineSlice.actions;

export default linkedInHeadlineSlice.reducer;
