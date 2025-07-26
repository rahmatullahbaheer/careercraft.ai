// src/store/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    resumeType: "resume-basic",
    jobDescription: "",
    jobPosition: "",
    detailedResume: false,
    resumeLoading: false,
    componentRef: null,
  },
  headings: {
    education: "education",
    primarySkills: "skills",
    workExperienceArray: "work experience",
    summary: "executive summary",
    contact: "contact",
    publications: "publications",
    references: "references",
    interests: "interests & hobbies",
    certifications: "certifications",
    awards: "awards",
    trainings: "trainings",
    languages: "languages",
    projects: "projects",
  },

  dateTime: "",
  id: "",
  uploadedFileName: "",
  shortName: "",
  name: "",
  jobTitle: "",
  contact: {
    email: "",
    phone: "",
    linkedIn: "",
    address: "",
  },
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
  summary: "",
  workExperienceArray: [],
  // quantifyingExperience: true,
  workExperience: "",
  primarySkills: [],
  professionalSkills: [],
  secondarySkills: [],
  interests: [],
  awards: [],
  publications: [],
  trainings: [],
  references: [],
  languages: [],
  certifications: [],
  projects: [],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    emptyResume() {
      return {
        ...initialState,
      };
    },

    resetResume(state, action) {
      return {
        ...initialState,
        state: action.payload,
      };
    },
    setResume(state, action) {
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
    // setQuantifyingExperience(state, action) {
    //   return {
    //     ...state,
    //     quantifyingExperience: action.payload,
    //   };
    // },
    setState(state, action) {
      return {
        ...state,
        state: {
          ...state.state,
          [action.payload.name]: action.payload.value,
        },
      };
    },

    setId(state, action) {
      return {
        ...state,
        id: action.payload,
      };
    },

    setUploadedFileName(state, action) {
      return {
        ...state,
        uploadedFileName: action.payload,
      };
    },

    setBasicInfo(state, action) {
      return {
        ...state,
        shortName: action.payload.shortName,
        name: action.payload.name,
        jobTitle: action.payload.jobTitle,
        contact: action.payload.contact,
        education: action.payload.education,
      };
    },
    setHeadings(state, action) {
      return {
        ...state,
        headings: {
          ...state.headings,
          ...action.payload,
        },
      };
    },
    setSummary(state, action) {
      return {
        ...state,
        summary: action.payload,
      };
    },
    setWorkExperience(state, action) {
      return {
        ...state,
        workExperience: action.payload,
      };
    },
    setWorkExperienceArray(state, action) {
      return {
        ...state,
        workExperienceArray: action.payload.workExperienceArray,
      };
    },
    setTrainings(state, action) {
      return {
        ...state,
        trainings: action.payload.trainings,
      };
    },
    setAwards(state, action) {
      return {
        ...state,
        awards: action.payload.awards,
      };
    },
    setPublications(state, action) {
      return {
        ...state,
        publications: action.payload.publications,
      };
    },
    setProjects(state, action) {
      return {
        ...state,
        projects: action.payload.projects,
      };
    },
    setReferences(state, action) {
      return {
        ...state,
        references: action.payload.references,
      };
    },
    setInterests(state, action) {
      return {
        ...state,
        interests: action.payload.interests,
      };
    },
    setCertifications(state, action) {
      return {
        ...state,
        certifications: action.payload.certifications,
      };
    },
    setLanguages(state, action) {
      return {
        ...state,
        languages: action.payload.languages,
      };
    },

    setCustomExperienceArray(state, action) {
      return {
        ...state,
        customExperienceArray: action.payload,
      };
    },
    setPrimarySkills(state, action) {
      return {
        ...state,
        primarySkills: action.payload.primarySkills,
      };
    },
    setSecondarySkills(state, action) {
      return {
        ...state,
        secondarySkills: action.payload.secondarySkills,
      };
    },
    setProfessionalSkills(state, action) {
      return {
        ...state,
        professionalSkills: action.payload.professionalSkills,
      };
    },
  },
});

export const {
  setUploadedFileName,
  setBasicInfo,
  setSummary,
  setWorkExperience,
  setPrimarySkills,
  setSecondarySkills,
  setProfessionalSkills,
  setId,
  setState,
  setResume,
  setField,
  setHeadings,
  setWorkExperienceArray,
  resetResume,
  emptyResume,
  // setQuantifyingExperience,
  setTrainings,
  setAwards,
  setPublications,
  setReferences,
  setInterests,
  setCertifications,
  setLanguages,
  setProjects,
  // setLoadingState,
} = resumeSlice.actions;

export default resumeSlice.reducer;
