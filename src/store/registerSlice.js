import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrappedContent: "",
  activeStep: 0,
  isSubmitting: false,
  terms: false,
  error: "",
  scrapped: {
    basic: false,
    education: false,
    workExperience: false,
    certifications: false,
    awards: false,
    interests: false,
    languages: false,
    publications: false,
    skills: false,
    references: false,
    trainings: false,
    projects: false,
  },
  scrapping: {
    basic: false,
    education: false,
    workExperience: false,
    certifications: false,
    awards: false,
    interests: false,
    languages: false,
    skills: false,
    publications: false,
    references: false,
    trainings: false,
    projects: false,
  },
  stepOne: {
    firstName: "",
    lastName: "",
    isValid: false,
  },
  stepTwo: {
    phoneNumber: "",
    Email: "",
    isValid: false,
    emailInvalid: false,
  },
  stepThree: {
    country: "",
    street: "",
    cityState: "",
    postalCode: "",
    isValid: true,
  },
  stepFour: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepFive: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepSix: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepSeven: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepEight: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepNine: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepTen: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepEleven: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepTwelve: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },

  stepThirteen: {
    list: [],
    isValid: true,
  },
  stepFourteen: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  // stepEight: {
  //   password: "",
  //   cPassword: "",
  //   isValid: false,
  // },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setActiveStep(state, action) {
      return {
        ...state,
        activeStep: action.payload,
      };
    },
    setScrapped(state, action) {
      return {
        ...state,
        scrapped: {
          ...state.scrapped,
          ...action.payload,
        },
      };
    },
    setScrapping(state, action) {
      return {
        ...state,
        scrapping: {
          ...state.scrapping,
          ...action.payload,
        },
      };
    },
    setIsSubmitting(state, action) {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setTerms(state, action) {
      return {
        ...state,
        terms: action.payload,
      };
    },
    setStepOne(state, action) {
      return {
        ...state,
        stepOne: {
          ...state.stepOne,
          ...action.payload,
        },
      };
    },
    setStepTwo(state, action) {
      return {
        ...state,
        stepTwo: {
          ...state.stepTwo,
          ...action.payload,
        },
      };
    },
    setStepThree(state, action) {
      return {
        ...state,
        stepThree: {
          ...state.stepThree,
          ...action.payload,
        },
      };
    },
    setStepFour(state, action) {
      return {
        ...state,
        stepFour: {
          ...state.stepFour,
          ...action.payload,
        },
      };
    },
    setStepFive(state, action) {
      return {
        ...state,
        stepFive: {
          ...state.stepFive,
          ...action.payload,
        },
      };
    },
    setStepSix(state, action) {
      return {
        ...state,
        stepSix: {
          ...state.stepSix,
          ...action.payload,
        },
      };
    },
    setStepSeven(state, action) {
      return {
        ...state,
        stepSeven: {
          ...state.stepSeven,
          ...action.payload,
        },
      };
    },
    setStepEight(state, action) {
      return {
        ...state,
        stepEight: {
          ...state.stepEight,
          ...action.payload,
        },
      };
    },
    setStepNine(state, action) {
      return {
        ...state,
        stepNine: {
          ...state.stepNine,
          ...action.payload,
        },
      };
    },
    setStepTen(state, action) {
      return {
        ...state,
        stepTen: {
          ...state.stepTen,
          ...action.payload,
        },
      };
    },
    setStepEleven(state, action) {
      return {
        ...state,
        stepEleven: {
          ...state.stepEleven,
          ...action.payload,
        },
      };
    },
    setStepTwelve(state, action) {
      return {
        ...state,
        stepTwelve: {
          ...state.stepTwelve,
          ...action.payload,
        },
      };
    },
    setStepThirteen(state, action) {
      return {
        ...state,
        stepThirteen: {
          ...state.stepThirteen,
          ...action.payload,
        },
      };
    },
    setStepFourteen(state, action) {
      return {
        ...state,
        stepFourteen: {
          ...state.stepFourteen,
          ...action.payload,
        },
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
  setActiveStep,
  setIsSubmitting,
  setError,
  setTerms,
  setScrapped,
  setScrapping,
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
  setStepFive,
  setStepSix,
  setStepSeven,
  setStepEight,
  setStepNine,
  setStepTen,
  setStepEleven,
  setStepTwelve,
  setStepThirteen,
  setStepFourteen,
  setField,
} = registerSlice.actions;

export default registerSlice.reducer;
