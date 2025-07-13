import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  jobDescriptionText: [],
  generatedOnDate: "",
  userEmail: "",
};

const linkedInJobDescriptionSlice = createSlice({
  name: "linkedInJobDescriptions",
  initialState,
  reducers: {
    resetLinkedInJobDescription() {
      return initialState;
    },
    setLinkedInJobDescription(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetLinkedInJobDescription, setLinkedInJobDescription } =
  linkedInJobDescriptionSlice.actions;

export default linkedInJobDescriptionSlice.reducer;
