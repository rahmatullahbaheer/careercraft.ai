"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeContactIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import Toolbar from "@/components/dashboard/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import { ColorResult } from "react-color";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Publication from "./resume-sections/publication";
import {
  conditionStyleHeader,
  customStyle_15,
  template_15_styles,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Award from "./resume-sections/award";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";
import AddSection from "../../resume-builder/AddSection";
import { useAppContext } from "@/context/AppContext";

const ResumeTemplate15 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newSectionEntry, setNewSectionEntry] = useState({
    awards: false,
    certifications: false,
    trainings: false,
    interests: false,
    publications: false,
    languages: false,
    projects: false,
    references: false,
  });
  useEffect(() => {
    const keys = Object.keys(newSectionEntry);
    const trueKey = keys.find((key) => newSectionEntry[key]);

    if (trueKey) {
      const element = document.querySelector(`.${trueKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [newSectionEntry]);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState<string>("");
  const { saveResumeToDB } = useSaveResumeToDB();
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  //add new code

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  //New code end

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#F4F4F4");
  // const [color_second, setColor_second] = useState("#444440");
  useEffect(() => {
    if (streamedJDData === "") {
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  // handle regenrate
  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };

  //add Skills
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  // const saveColor = (color: ColorResult) => {
  //   setColor(color.hex);

  // };
  // const saveColor_second = (color: ColorResult) => {
  //   setColor_second(color.hex);

  // };
  const { setIsSidebar } = useAppContext();
  const { setTemplate15 } = useAppContext();

  useEffect(() => {
    setIsSidebar(true);
    return () => setIsSidebar(false);
  }, []);
  useEffect(() => {
    setTemplate15(true);
    return () => setTemplate15(false);
  }, []);

  return (
    <div className="relative w-full text-gray-900 first-page">
      <div className="flex">
        <div
          className=" w-5/12 xs:w-5/12  flex flex-col  bg-[#e2e2e2]    px-4  md:px-9    pt-[2rem]  "
          // style={{ backgroundColor: color }}
        >
          {/* <div className="absolute top-0 left-0 xs:w-4/12">
            <div className="flex justify-end">
              <ColorPicker
                defaultColor="#F4F4F4"
                resetColor="#F4F4F4"
                setColor={setColor}
                styles_pin="relative top-[6px]  -left-9"
                styles_div="absolute top-3 left-0"
                secondDefaultColor="#444440"
                setColor_second={setColor_second}
                saveColor={saveColor}
              />
            </div>
          </div> */}
          <div className="flex justify-center">
            <div
              className=" w-36 h-36 md:w-36 md:h-36 relative lg:h-36 lg:w-36 border-[.5rem]  md:border-[.5rem] border-[#ffff]   text-white bg-[#444440]  text-center flex justify-center items-center  rounded-full "
              // style={{ backgroundColor: color_second }}
            >
              <span className="text-4xl font-semibold hover:shadow-md hover:bg-gray-400">
                <EditableField
                  value={resume?.shortName ? resume?.shortName : "CPH"}
                  style={{ width: "60px" }}
                  onSave={(value: string) => {
                    dispatch(setField({ name: "shortName", value: value }));
                    saveResumeToDB({ ...resume, shortName: value });
                  }}
                />
                {/* <ColorPicker
                  defaultColor="#F4F4F4"
                  resetColor="#444440"
                  styles_pin="absolute  top-4 right-7"
                  styles_div="absolute top-3 -left-1"
                  setColor={setColor}
                  secondDefaultColor="#444440"
                  setColor_second={setColor_second}
                  saveColor={saveColor_second}
                /> */}
              </span>
            </div>
          </div>
          {/* contacts */}

          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3
            className="mt-4 uppercase text-base  xs:px-2 font-semibold bg-[#444440] text-white w-full xs:w-full md:w-full lg:w-full py-1 rounded-sm flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center border-2 border-transparent hover:border-dashed hover:border-gray-500 "
            // style={{ backgroundColor: color_second }}
          >
            {resumeContactIcon}
            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "Contact"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.contact) {
                  updateSaveHook.updateAndSaveHeadings({
                    contact: value,
                  });
                }
              }}
            />
          </h3>
          <span className="w-full h-0 my-3 border-stylee"></span>
          <Contact
            contact={resume.contact}
            styles={template_15_styles}
            iconColor="text-[#444440]"
          />

          {/* Skills */}

          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_15_styles}
            rounded_style="bg-[#444440] w-full xs:w-full md:w-full lg:w-full flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center"
          />

          {/* Languages */}
          {((resume?.languages && resume?.languages.length > 0) ||
            newSectionEntry.languages) && (
            <Language
              // customStyle={customStyle_4}
              heading={resume.headings.languages}
              languages={resume.languages}
              styles={template_15_styles}
              rounded_style="bg-[#444440] w-full xs:w-full md:w-full lg:w-full flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center"
            />
          )}
          {/* Interests & Hobbies */}
          {((resume?.interests && resume?.interests.length > 0) ||
            newSectionEntry.interests) && (
            <Interest
              // customStyle={customStyle_4}
              heading={resume.headings.interests}
              interests={resume.interests}
              styles={template_15_styles}
              rounded_style="bg-[#444440] w-full xs:w-full md:w-full lg:w-full flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center"
            />
          )}
        </div>
        <div className="w-full flex flex-col  px-8 xs:mt-[25px]  xs:px-8 lg:px-8 pt-[1rem] xs:pt-[1rem] ">
          <div className="flex flex-col items-center justify-center py-4 xs:px-0">
            <Header
              name={resume.name}
              jobTitle={resume.jobTitle}
              styles={template_15_styles}
              conditionStyleHeader={conditionStyleHeader}
            />
          </div>

          {/* Executive Summary */}
          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={template_15_styles}
            customStyle={customStyle_15}
          />
          {/* Work Experience */}
          <div className="space-y-4">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_15}
              styles={template_15_styles}
            />
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                customStyle={customStyle_15}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_15_styles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_15}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_15_styles}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                customStyle={customStyle_15}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_15_styles}
              />
            )}
          </div>
          {/* Project */}
          <div className="w-full">
            {((resume?.projects && resume?.projects.length > 0) ||
              newSectionEntry.projects) && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
                styles={template_15_styles}
                customStyle={customStyle_15}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                customStyle={customStyle_15}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_15_styles}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                customStyle={customStyle_15}
                heading={resume.headings.references}
                references={resume.references}
                styles={template_15_styles}
              />
            )}
          </div>

          {/* education */}
          <div className="w-full mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_15_styles}
                customStyle={customStyle_15}
              />
            )}
          </div>
          <AddSection setNewSectionEntry={setNewSectionEntry} />
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate15);
