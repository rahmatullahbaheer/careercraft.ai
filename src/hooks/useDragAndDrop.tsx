"use client";
import {  setPrimarySkills, setWorkExperienceArray } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";
import { setField } from "@/store/creditLimitsSlice";
import { RootState } from "@/store/store";

const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();
  const { resume } = useSelector((state: RootState) => state);

  const handleDropExperience = (e: React.DragEvent, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume?.workExperienceArray];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    if (draggedIndex !== i) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };
  const handleDropOthers = (e: React.DragEvent, i: number,section:string) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume[section]];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    if (draggedIndex !== i) {
      dispatch(
        setField({
         name:section, value: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        [section]: updatedItems,
      });
    }
  };
 

  const handleDropAchievement = (
    i: number,
    ind: number,
    insideIndex: number
  ) => {
    let draggedIndex: number;
    let updatedItems: any = [];
    draggedIndex = insideIndex;
    updatedItems = [...resume?.workExperienceArray];
    let achievements = [...updatedItems[i].achievements];
    const temp = achievements[draggedIndex];
    achievements[draggedIndex] = achievements[ind];
    achievements[ind] = temp;
    let updatedWorkExperience = {
      ...updatedItems[i],
    };
    updatedWorkExperience.achievements = achievements;
    // Update the copy of the workExperience in the updatedItems array
    updatedItems[i] = updatedWorkExperience;
    if (draggedIndex !== ind) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };

  const handleDropOthersAchievement = (
    i: number,
    ind: number,
    insideIndex: number,
    section:string
  ) => {
    let draggedIndex: number;
    let updatedItems: any = [];
    draggedIndex = insideIndex;
    updatedItems = [...resume[section]];
    let description = [...updatedItems[i].description];
    const temp = description[draggedIndex];
    description[draggedIndex] = description[ind];
    description[ind] = temp;
    let updatedWorkExperience = {
      ...updatedItems[i],
    };
    updatedWorkExperience.description = description;
    // Update the copy of the workExperience in the updatedItems array
    updatedItems[i] = updatedWorkExperience;
    if (draggedIndex !== ind) {
      dispatch(
        setField({
         name:section, value: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        [section]: updatedItems,
      });
    }
  };
 

  const handleDropPrimary = (e: React.DragEvent, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume.primarySkills];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    dispatch(
      setPrimarySkills({
        ...resume,
        primarySkills: updatedItems,
      })
    );
    saveResumeToDB({
      ...resume,
      primarySkills: updatedItems,
    });
  };


  return {
    handleDropAchievement,
    handleDropExperience,
    handleDropPrimary,
    handleDropOthersAchievement,
    handleDropOthers
   
  };
};

export default useDragAndDrop;
