"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import Publication from "./resume-sections/publication";
import {
  template_8_styles,
  conditionStyleHeader,
  customStyle_8,
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
import Contact from "./resume-sections/contact";
import Header from "./resume-sections/header";
import Skill from "./resume-sections/skills";
import AddSection from "../../resume-builder/AddSection";
// import CustomResumeSection from "../../resume-builder/CustomResumeSection";
const ResumeTemplate8 = () => {
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
  const resume = useSelector((state: any) => state.resume);
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
  return (
    <div className="w-full text-gray-900 first-page">
      <div className="flex">
        <div className="flex flex-col items-center w-full px-8 pt-4">
          <div className="flex w-[100%] justify-between items-center">
            <div className="flex flex-col md:w-[55%] xs:w-auto ">
              <Header
                name={resume.name}
                jobTitle={resume.jobTitle}
                styles={template_8_styles}
                conditionStyleHeader={conditionStyleHeader}
              />
            </div>
            <div className="flex flex-col w-[35%]">
              <Contact contact={resume.contact} styles={template_8_styles} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}
          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={template_8_styles}
            customStyle={customStyle_8}
          />
          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_8_styles}
            customStyle={{
              borderTopBottom: true,
              borderBottom: true,
              centeredHeading: false,
            }}
          />
          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            customStyle={customStyle_8}
            styles={template_8_styles}
          />

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                customStyle={customStyle_8}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_8_styles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_8}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_8_styles}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                customStyle={customStyle_8}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_8_styles}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                customStyle={customStyle_8}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_8_styles}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {((resume?.languages && resume?.languages.length > 0) ||
              newSectionEntry.languages) && (
              <Language
                customStyle={customStyle_8}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={template_8_styles}
              />
            )}
          </div>
          {/* Interests & Hobbies */}
          <div className="w-full">
            {((resume?.interests && resume?.interests.length > 0) ||
              newSectionEntry.interests) && (
              <Interest
                customStyle={customStyle_8}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_8_styles}
              />
            )}
          </div>
          {/* References */}
          <div className="w-full">
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                customStyle={customStyle_8}
                heading={resume.headings.references}
                references={resume.references}
                styles={template_8_styles}
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
                styles={template_8_styles}
                customStyle={customStyle_8}
              />
            )}
          </div>

          {/* Education */}
          <div className="w-full mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_8_styles}
                customStyle={customStyle_8}
              />
            )}
          </div>
          <AddSection setNewSectionEntry={setNewSectionEntry} />
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate8);
