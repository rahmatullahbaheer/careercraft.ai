"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import { resumeContactIcon } from "@/helpers/iconsProvider";

import EditableField from "@/components/dashboard/EditableField";

import useSaveResumeToDB from "@/hooks/useSaveToDB";

import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import Publication from "./resume-sections/publication";
import {
  conditionStyleHeader,
  customStyle_16,
  template_16_styles,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Education from "./resume-sections/education";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Project from "./resume-sections/project";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";
import { useAppContext } from "@/context/AppContext";
import AddSection from "../../resume-builder/AddSection";

const ResumeTemplate16 = () => {
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
  const { setIsSidebar } = useAppContext();
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const { saveResumeToDB } = useSaveResumeToDB();
  //New code end
  useEffect(() => {
    setIsSidebar(true);
    return () => setIsSidebar(false);
  }, []);

  const { updateSaveHook } = useUpdateAndSave();

  return (
    <div className="relative w-full text-gray-900 first-page">
      <div className="flex">
        <div
          className=" w-3/12 xs:w-4/12 md:w-4/12 flex flex-col  bg-[#1F1E1E]  px-4  xs:px-1 md:px-9 pt-[2rem] "
          // style={{ backgroundColor: color }}
        >
          <div className="flex justify-center xs:mb-6">
            <div className=" w-32 h-32 xs:w-24 xs:h-24 md:w-32 md:h-32 border-[2px] xs:border-[2px] md:border-[.5rem] border-[##F1F1F1]   text-gray-800 bg-[#FFFFFF]  text-center flex justify-center items-center  rounded-full ">
              <div
                className=" w-28 relative h-28 xs:h-[88px] xs:w-[] bg-[#383636] md:w-28 md:h-28 text-[#F1F1F1] flex justify-center items-center    rounded-full "
                // style={{ backgroundColor: color_second }}
              >
                <span className="text-4xl font-semibold xs:text-lg md:text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
                  <EditableField
                    value={resume?.shortName ? resume?.shortName : "CPH"}
                    style={{ width: "60px" }}
                    onSave={(value: string) => {
                      dispatch(setField({ name: "shortName", value: value }));
                      saveResumeToDB({ ...resume, shortName: value });
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* contacts */}
          <h3 className="flex items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase border-2 border-transparent rounded-sm flex-rosw hover:border-dashed hover:border-gray-500">
            {resumeContactIcon}
            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "contact"
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
          <span className="w-full mb-4 border border-gray-500 !block"></span>
          <Contact contact={resume.contact} styles={template_16_styles} />

          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_16_styles}
            customStyle={{
              borderTopBottom: false,
              borderBottom: true,
              centeredHeading: false,
            }}
          />

          {/* Languages */}
          <div className="w-full">
            {((resume?.languages && resume?.languages.length > 0) ||
              newSectionEntry.languages) && (
              <Language
                customStyle={customStyle_16}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={template_16_styles}
              />
            )}
          </div>
          {/* Interests & Hobbies */}
          <div className="w-full">
            {((resume?.interests && resume?.interests.length > 0) ||
              newSectionEntry.interests) && (
              <Interest
                customStyle={customStyle_16}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_16_styles}
              />
            )}
          </div>
        </div>
        <div className="xs:w-full w-9/12 flex flex-col xs:bg-[#fff] md:bg-[#fff] px-4 md:px-8 pt-[1rem] md:pt-[1rem]">
          <div className="flex flex-col justify-start pb-6 ">
            <Header
              name={resume.name}
              jobTitle={resume.jobTitle}
              styles={template_16_styles}
              conditionStyleHeader={conditionStyleHeader}
            />
          </div>

          {/* Executive Summary */}

          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={template_16_styles}
            customStyle={customStyle_16}
          />

          {/* Work Experience */}
          <div className="space-y-1">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_16}
              styles={template_16_styles}
            />
          </div>
          {/* Custom section */}
          {/* Publications */}
          <div className="w-full">
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                customStyle={customStyle_16}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_16_styles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_16}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_16_styles}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                customStyle={customStyle_16}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_16_styles}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                customStyle={customStyle_16}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_16_styles}
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
                styles={template_16_styles}
                customStyle={customStyle_16}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                customStyle={customStyle_16}
                heading={resume.headings.references}
                references={resume.references}
                styles={template_16_styles}
              />
            )}
          </div>

          {/* education */}
          <div className="w-full mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_16_styles}
                customStyle={customStyle_16}
              />
            )}
          </div>
          <AddSection setNewSectionEntry={setNewSectionEntry} />
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate16);
