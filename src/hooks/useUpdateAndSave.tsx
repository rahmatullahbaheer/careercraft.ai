import {
  setBasicInfo,
  setHeadings,
  setPrimarySkills,
  setField as setResumeField,
  setSummary,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";
import {
  Education,
  setField,
  setTours,
  WorkExperience,
} from "@/store/userDataSlice";
import axios from "axios";
import { RootState } from "@/store/store";

const useUpdateAndSave = () => {
  const { resume, userData } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();

  //   update and save the Skills
  const updateAndSaveSkill = (updatedSkills: string[]) => {
    dispatch(
      setPrimarySkills({
        ...resume,
        primarySkills: updatedSkills,
      })
    );
    saveResumeToDB({
      ...resume,
      primarySkills: updatedSkills,
    });
  };

  //   update and save the Summary
  const updateAndSaveSummary = (value: string) => {
    dispatch(setSummary(value));
    saveResumeToDB({ ...resume, summary: value });
  };

  //   update and save the Save Work Experience Array
  const updateAndSaveWorkExperienceArray = (updatedExp: WorkExperience[]) => {
    dispatch(
      setWorkExperienceArray({
        workExperienceArray: updatedExp,
      })
    );
    saveResumeToDB({
      ...resume,
      workExperienceArray: updatedExp,
    });
  };

  const updateAndSaveOthers = (updatedExp, section: string) => {
    dispatch(
      setResumeField({
        name: section,
        value: updatedExp,
      })
    );
    saveResumeToDB({
      ...resume,
      [section]: updatedExp,
    });
  };

  //   update and save the Basic Info
  const updateAndSaveBasicInfo = (obj: Record<string, string>) => {
    const [[key, value]] = Object.entries(obj);

    dispatch(
      setBasicInfo({
        ...resume,
        contact: { ...resume.contact, [key]: value },
      })
    );
    saveResumeToDB({
      ...resume,
      contact: { ...resume.contact, [key]: value },
    });
  };

  //   update and save the Education
  const updateAndSaveEducation = (updatedEducations: Education[]) => {
    dispatch(
      setField({
        name: "education",
        value: updatedEducations,
      })
    );
    saveResumeToDB({
      ...resume,
      education: updatedEducations,
    });
  };

  const updateAndSaveJobTitle = (value: string) => {
    dispatch(setField({ name: "jobTitle", value: value }));
    saveResumeToDB({ ...resume, jobTitle: value });
  };
  const updateAndSaveHeadings = (obj: Record<string, string>) => {
    const [[key, value]] = Object.entries(obj);

    dispatch(
      setHeadings({
        ...resume,
        headings: { ...resume.headings, [key]: value },
      })
    );
    saveResumeToDB({
      ...resume,
      headings: { ...resume.headings, [key]: value },
    });
  };

  const updateAndSaveTourStatus = (tour: Record<string, boolean>) => {
    dispatch(setTours({ tour }));
    try {
      axios.post("/api/users/updateUserData", {
        data: {
          email: userData.email,
          tours: { ...userData.tours, ...tour },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateAndSaveProfileSummary = (summary: string) => {
    dispatch(setField({ name: "summary", value: summary }));
    try {
      axios.post("/api/users/updateUserData", {
        data: {
          email: userData.email,
          summary: summary,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateAndSaveName = (value: string) => {
    dispatch(setResumeField({ name: "name", value: value }));
    saveResumeToDB({ ...resume, name: value });
  };

  return {
    updateSaveHook: {
      updateAndSaveSkill,
      updateAndSaveJobTitle,
      updateAndSaveName,
      updateAndSaveSummary,
      updateAndSaveWorkExperienceArray,
      updateAndSaveOthers,
      updateAndSaveBasicInfo,
      updateAndSaveEducation,
      updateAndSaveHeadings,
      updateAndSaveTourStatus,
      updateAndSaveProfileSummary,
    },
  };
};

export default useUpdateAndSave;
