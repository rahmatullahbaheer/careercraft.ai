import React from "react";
import useUpdateAndSave from "./useUpdateAndSave";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useHandler = () => {
  const resume = useSelector((state: any) => state.resume);

  const { updateSaveHook } = useUpdateAndSave();

  // add the space
  const handleAddSpace = (i: number, newAchievement: string) => {
    let updatedExp = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[i].achievements];
    updatedAchievements.push(newAchievement);
    updatedExp[i] = {
      ...updatedExp[i],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };

  const handleAddOthersSpace = (i: number, newAchievement: string,section:string) => {
    let updatedExp = [...resume[section]];
    let updatedAchievements = [...updatedExp[i].description];
    updatedAchievements.push(newAchievement);
    updatedExp[i] = {
      ...updatedExp[i],
      description: updatedAchievements,
    };
    updateSaveHook.updateAndSaveOthers(updatedExp,section);
  };

  


  // handle Add achivements
  const handleAddAchivement = (i: number, newAchievement: string) => {
    if (newAchievement !== "") {
      let updatedExp = [...resume.workExperienceArray];
      let updatedAchievements = [...updatedExp[i].achievements];
      updatedAchievements.push(newAchievement);
      updatedExp[i] = {
        ...updatedExp[i],
        achievements: updatedAchievements,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };
  const handleAddOthersAchivement = (i: number, newAchievement: string, section:string)=> {
    if (newAchievement !== "") {
      let updatedExp = [...resume[section]];
      let updatedAchievements = [...updatedExp[i].description];
      updatedAchievements.push(newAchievement);
      updatedExp[i] = {
        ...updatedExp[i],
        description: updatedAchievements,
      };
      updateSaveHook.updateAndSaveOthers(updatedExp,section);
    }
  };
 

  const handleDeleteAchivement = (expInd: number, achiveInd: number) => {
    let updatedExp = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[expInd].achievements];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleDeleteOthersAchivement = (expInd: number, achiveInd: number,section:string) => {
    let updatedExp = [...resume[section]];
    let updatedAchievements = [...updatedExp[expInd].description];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      description: updatedAchievements,
    };
    updateSaveHook.updateAndSaveOthers(updatedExp,section);
  };


  const handleDeleteExperience = (expInd: number) => {
    let updatedExp = [...resume.workExperienceArray];
    updatedExp.splice(expInd, 1);
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleDeleteOthers = (expInd: number,section:string) => {
    let updatedExp = [...resume[section]];
    updatedExp.splice(expInd, 1);
    updateSaveHook.updateAndSaveOthers(updatedExp,section);
  };



  const handleUpdateAchivement = (
    expInd: number,
    achiveInd: number,
    value: string
  ) => {
    if (
      value !== resume?.workExperienceArray[expInd]?.achievements[achiveInd]
    ) {
      let updatedExp = [...resume.workExperienceArray];
      let updatedAchievements = [...updatedExp[expInd].achievements];
      updatedAchievements.splice(achiveInd, 1, value);
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        achievements: updatedAchievements,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };
  const handleUpdateOthersAchivement = (
    expInd: number,
    achiveInd: number,
    value: string,
    section:string
  ) => {
    let sectionName = resume[section]
    if (
      value !== sectionName[expInd]?.description[achiveInd]
    ) {
      let updatedExp = [...resume[section]];
      let updatedAchievements = [...updatedExp[expInd].description];
      updatedAchievements.splice(achiveInd, 1, value);
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        description: updatedAchievements,
      };
      updateSaveHook.updateAndSaveOthers(updatedExp,section);
    }
  };


  const handleRemoveExtraSpace = (expInd: number, achiveInd: number) => {
    let updatedExp = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[expInd].achievements];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleRemoveExtraOthersSpace = (expInd: number, achiveInd: number,section:string) => {
    let updatedExp = [...resume[section]];
    let updatedAchievements = [...updatedExp[expInd].description];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      description: updatedAchievements,
    };
    updateSaveHook.updateAndSaveOthers(updatedExp, section);
  };


  const handleSaveExperienceDetail = (obj: {}, expInd: number) => {
    const [[key, value]] = Object.entries(obj);
    if (value !== resume?.workExperienceArray[expInd][key]) {
      let updatedExp = [...resume.workExperienceArray];
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        [key]: value,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };
  const handleSaveOthersDetail = (obj: {}, expInd: number, section:string) => {
    const [[key, value]] = Object.entries(obj);
    let sectionName = resume[section]
    if (value !== sectionName[expInd][key]) {
      let updatedExp = [...resume[section]];
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        [key]: value,
      };
      updateSaveHook.updateAndSaveOthers(updatedExp,section);
    }
  };

   const handleSaveEductionDetail = (obj: {}, ind: number) => {
    const [[key, value]] = Object.entries(obj);
    if (value !== resume?.education[ind][key]) {
      let updatedEducations = [...resume.education];
      updatedEducations[ind] = {
        ...updatedEducations[ind],
        [key]: value,
      };
      updateSaveHook.updateAndSaveEducation(updatedEducations);
    }
  };

  const handleDeleteEductionDetail = (ind: number) => {
    let updatedEducations = [...resume?.education];
    updatedEducations.splice(ind, 1);
    updateSaveHook.updateAndSaveEducation(updatedEducations);
  };

  const handleDeleteSkill = (i: number) => {
    const removeSkill = [...resume.primarySkills];
    removeSkill.splice(i, 1);
    updateSaveHook.updateAndSaveSkill(removeSkill);
  };

  const handleUpdateSkill = (value: string, i: number) => {
    if (value !== resume?.primarySkills[i]) {
      let updatedSkills = [...resume.primarySkills];
      updatedSkills.splice(i, 1, value);
      updateSaveHook.updateAndSaveSkill(updatedSkills);
    }
  };

  const handleAddNewDetails =(recName:string, obj:{})=>{
    let updatedSection = [...resume[recName], obj];
    updateSaveHook.updateAndSaveOthers(updatedSection,recName);
  }

  const handleUpdateInterests = (value:string, i: number,recName: string) => {
    let updatedSection = [...resume[recName]];
    updatedSection[i] = {...updatedSection[i], description: value };
    updateSaveHook.updateAndSaveOthers(updatedSection,recName);
  }

  return {
    handlers: {
      handleDeleteSkill,
      handleUpdateSkill,
      handleAddAchivement,
      handleAddSpace,
      handleRemoveExtraSpace,
      handleUpdateAchivement,
      handleDeleteAchivement,
      handleSaveExperienceDetail,
      handleSaveOthersDetail,
      handleSaveEductionDetail,
      handleDeleteEductionDetail,
      handleDeleteExperience,
      handleDeleteOthers,
      handleAddOthersSpace,
      handleRemoveExtraOthersSpace,
      handleAddOthersAchivement,
      handleUpdateOthersAchivement,
      handleDeleteOthersAchivement,
      handleAddNewDetails,
      handleUpdateInterests
    },
  };
};

export default useHandler;
