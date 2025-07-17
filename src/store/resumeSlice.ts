// src/store/resumeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkExperience } from "./userDataSlice";

export interface ResumeState {
  resumeType: string;
  jobDescription: string;
  jobPosition: string;
  detailedResume: boolean;
  resumeLoading: boolean;
  componentRef: any;
}

export interface ResumeHeadings {
  education: string;
  primarySkills: string;
  workExperienceArray: string;
  summary: string;
  contact: string;
  publications: string;
  references: string;
  interests: string;
  certifications: string;
  awards: string;
  trainings: string;
  languages: string;
  projects: string;
}

export interface ResumeContact {
  email: string;
  phone: string;
  linkedIn: string;
  address: string;
}

export interface ResumeEducation {
  school: string;
  degree: string;
  year: string;
}

export interface Resume {
  state: ResumeState;
  headings: ResumeHeadings;
  dateTime: string;
  id: string;
  uploadedFileName: string;
  shortName: string;
  name: string;
  jobTitle: string;
  contact: ResumeContact;
  education: ResumeEducation[];
  summary: string;
  workExperienceArray: WorkExperience[];
  workExperience: string;
  primarySkills: any[];
  professionalSkills: any[];
  secondarySkills: any[];
  interests: any[];
  awards: any[];
  publications: any[];
  trainings: any[];
  references: any[];
  languages: any[];
  certifications: any[];
  projects: any[];
}

const initialState: Resume = {
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

    resetResume(state, action: PayloadAction<ResumeState>) {
      return {
        ...initialState,
        state: action.payload,
      };
    },
    setResume(state, action: PayloadAction<Partial<Resume>>) {
      return {
        ...state,
        ...action.payload,
      } as Resume;
    },
    setField(state, action: PayloadAction<{ name: keyof Resume; value: any }>) {
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
    setState(state, action: PayloadAction<Partial<ResumeState>>) {
      return {
        ...state,
        state: {
          ...state.state,
          ...action.payload,
        },
      };
    },

    setId(state, action: PayloadAction<string>) {
      return {
        ...state,
        id: action.payload,
      };
    },

    setUploadedFileName(state, action: PayloadAction<string>) {
      return {
        ...state,
        uploadedFileName: action.payload,
      };
    },

    setBasicInfo(state, action: PayloadAction<any>) {
      return {
        ...state,
        shortName: action.payload.shortName,
        name: action.payload.name,
        jobTitle: action.payload.jobTitle,
        contact: action.payload.contact,
        education: action.payload.education,
      };
    },
    setHeadings(state, action: PayloadAction<Partial<ResumeHeadings>>) {
      return {
        ...state,
        headings: {
          ...state.headings,
          ...action.payload,
        },
      };
    },
    setSummary(state, action: PayloadAction<string>) {
      return {
        ...state,
        summary: action.payload,
      };
    },
    setWorkExperience(state, action: PayloadAction<string>) {
      return {
        ...state,
        workExperience: action.payload,
      };
    },
    setWorkExperienceArray(
      state,
      action: PayloadAction<{ workExperienceArray: WorkExperience[] }>
    ) {
      return {
        ...state,
        workExperienceArray: action.payload.workExperienceArray,
      };
    },
    setTrainings(state, action: PayloadAction<{ trainings: any[] }>) {
      return {
        ...state,
        trainings: action.payload.trainings,
      };
    },
    setAwards(state, action: PayloadAction<{ awards: any[] }>) {
      return {
        ...state,
        awards: action.payload.awards,
      };
    },
    setPublications(state, action: PayloadAction<{ publications: any[] }>) {
      return {
        ...state,
        publications: action.payload.publications,
      };
    },
    setProjects(state, action: PayloadAction<{ projects: any[] }>) {
      return {
        ...state,
        projects: action.payload.projects,
      };
    },
    setReferences(state, action: PayloadAction<{ references: any[] }>) {
      return {
        ...state,
        references: action.payload.references,
      };
    },
    setInterests(state, action: PayloadAction<{ interests: any[] }>) {
      return {
        ...state,
        interests: action.payload.interests,
      };
    },
    setCertifications(state, action: PayloadAction<{ certifications: any[] }>) {
      return {
        ...state,
        certifications: action.payload.certifications,
      };
    },
    setLanguages(state, action: PayloadAction<{ languages: any[] }>) {
      return {
        ...state,
        languages: action.payload.languages,
      };
    },
    setPrimarySkills(state, action: PayloadAction<{ primarySkills: any[] }>) {
      return {
        ...state,
        primarySkills: action.payload.primarySkills,
      };
    },
    setSecondarySkills(
      state,
      action: PayloadAction<{ secondarySkills: any[] }>
    ) {
      return {
        ...state,
        secondarySkills: action.payload.secondarySkills,
      };
    },
    setProfessionalSkills(
      state,
      action: PayloadAction<{ professionalSkills: any[] }>
    ) {
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
