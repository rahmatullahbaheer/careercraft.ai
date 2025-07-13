import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  isFetched: false,
  isLoading: false,
  error: "",
  firstName: "",
  lastName: "",
  expectedSalary: "",
  desiredJobTitle: "",
  locationPreference: "",
  industry: "",
  company: "",
  phone: "",
  email: "",
  linkedin: "",
  role: "",
  summary: "",
  contact: {
    country: "",
    street: "",
    cityState: "",
    postalCode: "",
  },
  status: false,
  OpenAiTokensUsed: 0,
  totalCredits: 0,
  resumes: [],
  consultingBids: [],
  emails: [],
  coverLetters: [],
  linkedInAbouts: [],
  linkedInHeadlines: [],
  linkedInJobDescriptions: [],
  linkedInKeywords: [],
  education: [],
  experience: [],
  references: [],
  trainings: [],
  languages: [],
  interests: [],
  certifications: [],
  awards: [],
  publications: [],
  projects: [],
  files: [],
  uploadedResume: { fileName: "", fileContent: "" },
  chatThreads: {},
  userCredits: 0,
  skills: [],
  defaultResumeFile: "",
  wizardCompleted: false,
  wizardReviewed: false,
  creditPackage: "",
  trialResume: false,
  profileImage: "",
  redeemedCoupons: [],
  tours: {
    dashboard: false,
    resumeBuilder: false,
    coverLetter: false,
    emailAssistant: false,
    linkedinOptimizer: false,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setField(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },

    setTours(state, action) {
      return {
        ...state,
        tours: {
          ...state.tours,
          ...action.payload.tour,
        },
      };
    },

    setUserData(state, action) {
      return {
        // isLoading: state.isLoading,
        // error: state.error,
        ...state,
        ...action.payload,
      };
    },

    setUserProfileImage(state, action) {
      return {
        ...state,
        profileImage: action.payload,
      };
    },
  },
});

export const {
  setIsLoading,
  setError,
  setField,
  setUserData,
  setUserProfileImage,
  setTours,
} = userDataSlice.actions;

export default userDataSlice.reducer;
