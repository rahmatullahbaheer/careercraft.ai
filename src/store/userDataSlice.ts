import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type definitions for user data
export interface Education {
  id?: string;
  school?: string;
  schoolName?: string;
  schoolLocation?: string;
  degree?: string;
  year?: string;
  educationLevel?: string;
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  isContinue?: boolean;
  fieldOfStudy?: string;
  grade?: string;
  activities?: string;
  description?: string;
}

export interface WorkExperience {
  id?: string;
  title?: string;
  jobTitle?: string;
  company?: string;
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  isContinue?: boolean;
  description?: string;
  cityState?: string;
  country?: string;
  achievements?: string[];
}

export interface Reference {
  id?: string;
  name: string;
  designation: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  contactInformation: string;
}

export interface Training {
  id?: string;
  name: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Language {
  id?: string;
  name: string;
  proficiency: string;
}

export interface Interest {
  id?: string;
  name: string;
  description?: string;
}

export interface Certification {
  id?: string;
  name: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Award {
  id?: string;
  name: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Publication {
  id?: string;
  title: string;
  publisher: string;
  year: string;
  date: string;
  description?: string[];
  url?: string;
}

export interface Project {
  id?: string;
  title: string;
  name?: string;
  description: string[];
  technologies?: string;
  url?: string;
  year?: string;
}

export interface Contact {
  country: string;
  street: string;
  cityState: string;
  postalCode: string;
}

export interface Tours {
  dashboard: boolean;
  resumeBuilder: boolean;
  coverLetter: boolean;
  emailAssistant: boolean;
  linkedinOptimizer: boolean;
}

export interface UserDataState {
  _id: string;
  isFetched: boolean;
  isLoading: boolean;
  error: string;
  firstName: string;
  lastName: string;
  expectedSalary: string;
  desiredJobTitle: string;
  jobTitle?: string;
  locationPreference: string;
  industry: string;
  company: string;
  phone: string;
  email: string;
  linkedin: string;
  role: string;
  summary: string;
  contact: Contact;
  status: boolean;
  OpenAiTokensUsed: number;
  totalCredits: number;
  resumes: any[];
  consultingBids: any[];
  emails: any[];
  coverLetters: any[];
  linkedInAbouts: any[];
  linkedInHeadlines: any[];
  linkedInJobDescriptions: any[];
  linkedInKeywords: any[];
  education: Education[];
  experience: WorkExperience[];
  references: Reference[];
  trainings: Training[];
  languages: Language[];
  interests: Interest[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  projects: Project[];
  files: any[];
  uploadedResume: { fileName: string; fileContent: string };
  chatThreads: Record<string, any>;
  userCredits: number;
  skills: any[];
  defaultResumeFile: string;
  wizardCompleted: boolean;
  wizardReviewed: boolean;
  creditPackage: string;
  trialResume: boolean;
  profileImage: string;
  redeemedCoupons: any[];
  tours: Tours;
  userPackageData?: any;
}

const initialState: UserDataState = {
  _id: "",
  isFetched: false,
  isLoading: false,
  error: "",
  firstName: "",
  lastName: "",
  expectedSalary: "",
  desiredJobTitle: "",
  jobTitle: "",
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
  userPackageData: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setError(state, action: PayloadAction<string>) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setField(
      state,
      action: PayloadAction<{ name: keyof UserDataState; value: any }>
    ) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },

    setTours(state, action: PayloadAction<{ tour: Partial<Tours> }>) {
      return {
        ...state,
        tours: {
          ...state.tours,
          ...action.payload.tour,
        },
      };
    },

    setUserData(state, action: PayloadAction<Partial<UserDataState>>) {
      return {
        // isLoading: state.isLoading,
        // error: state.error,
        ...state,
        ...action.payload,
      };
    },

    setUserProfileImage(state, action: PayloadAction<string>) {
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
