"use client";
import { setPrimarySkills } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";
import { RootState } from "@/store/store";

const useAddPrimarySkill = () => {
  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();
  const { resume } = useSelector((state: RootState) => state);

  const addPrimarySkill = (primarySkill: string) => {
    const primarySkills = resume?.primarySkills;
    let updatedSkills: string[] = [...primarySkills];
    updatedSkills.push(primarySkill);
    dispatch(setPrimarySkills({ primarySkills: updatedSkills }));
    saveResumeToDB({
      ...resume,
      primarySkills: updatedSkills,
    });
  };

  return {
    addPrimarySkill,
  };
};

export default useAddPrimarySkill;
