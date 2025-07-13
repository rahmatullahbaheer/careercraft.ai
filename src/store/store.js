import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice";
import registerSlice from "./registerSlice";
import userDataSlice from "./userDataSlice";
import coverLetterSlice from "./coverLetterSlice";
import emailSlice from "./emailSlice";
import consultingBidSlice from "./consultingBidSlice";
import linkedInHeadLineSlice from "./linkedInHeadLineSlice";
import linkedInJobDescriptionSlice from "./linkedInJobDescriptionSlice";
import linkedInKeywordsSlice from "./linkedInKeywordsSlice";
import linkedInAboutSlice from "./linkedInAboutSlice";
import creditLimitsSlice from "./creditLimitsSlice";

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    register: registerSlice,
    userData: userDataSlice,
    coverLetter: coverLetterSlice,
    email: emailSlice,
    consultingBid: consultingBidSlice,
    linkedinHeadline: linkedInHeadLineSlice,
    linkedinAbout: linkedInAboutSlice,
    linkedinJobDesc: linkedInJobDescriptionSlice,
    linkedinKeywords: linkedInKeywordsSlice,
    creditLimits: creditLimitsSlice,
  },
});

export default store;
