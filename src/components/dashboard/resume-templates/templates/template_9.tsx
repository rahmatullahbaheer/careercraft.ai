"use client";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";

import EditableField from "@/components/dashboard/EditableField";
import Publication from "./resume-sections/publication";
import {
  template_9_styles,
  conditionStyleHeader,
  customStyle_9,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import AddSection from "../../resume-builder/AddSection";
// import CustomResumeSection from "../../resume-builder/CustomResumeSection";
const ResumeTemplate9 = () => {
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
  const { saveResumeToDB } = useSaveResumeToDB();

  return (
    <div className="w-full text-gray-900 first-page">
      <div className="flex flex-row items-center justify-between px-8 pt-2 xs:pt-4">
        <div className="flex flex-col py-2">
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            styles={template_9_styles}
            conditionStyleHeader={conditionStyleHeader}
          />
        </div>
        <div
          className="relative flex items-center bg-[#1a202c] hover:text-black justify-center mx-4 my-2 text-center text-white rounded-full w-28 h-28 xs:w-32 xs:h-32 md:w-32 md:h-32 md:my-0"
          // style={{ backgroundColor: color }}
        >
          <span className="text-4xl font-semibold text-gray-100 hover:shadow-md hover:text-black hover:bg-gray-100">
            <EditableField
              value={resume?.shortName ? resume?.shortName : "CPH"}
              style={{ width: "60px" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "shortName", value: value }));
                saveResumeToDB({ ...resume, shortName: value });
              }}
            />
          </span>
          {/* <ColorPicker
            defaultColor="#1a202c"
            resetColor="#1a202c"
            styles_pin="absolute   top-4 right-5"
            styles_div="absolute top-3 -left-1"
            setColor={setColor}
            saveColor={saveColor}
          /> */}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 md:pl-8 xs:mt-4">
          {/* contacts */}

          <Contact contact={resume.contact} styles={template_9_styles} />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}
          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={template_9_styles}
            customStyle={customStyle_9}
          />
          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_9_styles}
            customStyle={{
              borderTopBottom: true,
              borderBottom: false,
              centeredHeading: false,
            }}
          />
          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            customStyle={customStyle_9}
            styles={template_9_styles}
          />

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                customStyle={customStyle_9}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_9_styles}
              />
            )}
          </div>
          {/* Certificates */}
          <div className="w-full">
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_9}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_9_styles}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                customStyle={customStyle_9}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_9_styles}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                customStyle={customStyle_9}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_9_styles}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {((resume?.languages && resume?.languages.length > 0) ||
              newSectionEntry.languages) && (
              <Language
                customStyle={customStyle_9}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={template_9_styles}
              />
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="w-full">
            {((resume?.interests && resume?.interests.length > 0) ||
              newSectionEntry.interests) && (
              <Interest
                customStyle={customStyle_9}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_9_styles}
              />
            )}
          </div>
          {/* Projects */}
          <div className="w-full">
            {((resume?.projects && resume?.projects.length > 0) ||
              newSectionEntry.projects) && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
                styles={template_9_styles}
                customStyle={customStyle_9}
              />
            )}
          </div>
          {/* References */}
          <div className="w-full">
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                customStyle={customStyle_9}
                heading={resume.headings.references}
                references={resume.references}
                styles={template_9_styles}
              />
            )}
          </div>

          {/* Education */}

          <div className="w-full mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_9_styles}
                customStyle={customStyle_9}
              />
            )}
          </div>
          <AddSection setNewSectionEntry={setNewSectionEntry} />
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate9);
