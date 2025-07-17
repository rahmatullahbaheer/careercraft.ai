"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { TwitterPicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";

import useGetSummary from "@/hooks/useGetSummary";

import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import { useColorContext } from "@/context/ResumeColorContext";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import {
  conditionStyleHeader,
  customStyle_6,
  template_6_styles,
} from "@/helpers/templateStylesObj";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
import Skill from "./resume-sections/skills";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import AddSection from "../../resume-builder/AddSection";
const ResumeTemplate6 = () => {
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
    <div className="flex flex-row text-gray-900 ">
      <div className={`relative flex bg-[#e04127]  w-[5%]`}></div>

      <div className="w-full">
        <div className="flex flex-col py-8 pl-6 pr-8 w-12/12">
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            styles={template_6_styles}
            conditionStyleHeader={conditionStyleHeader}
          />
          <Contact contact={resume.contact} styles={template_6_styles} />
          {/* EXECUTIVE SUMMARY */}
          <div className="flex flex-col flex-wrap w-full ">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={template_6_styles}
              customStyle={customStyle_6}
            />

            <Skill
              heading={resume.headings.primarySkills}
              skills={resume.primarySkills}
              styles={template_6_styles}
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
              customStyle={customStyle_6}
              styles={template_6_styles}
            />

            {/* Add Custom */}
            {/* <CustomResumeSection /> */}
            {/* Publication */}
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}
            {/* Certification */}
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_6}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_6_styles}
              />
            )}

            {/* Awards */}
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}
            {/* Trainings */}
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Projects */}
            <div className="w-full">
              {((resume?.projects && resume?.projects.length > 0) ||
                newSectionEntry.projects) && (
                <Project
                  heading={resume.headings.projects}
                  projects={resume.projects}
                  styles={template_6_styles}
                  customStyle={customStyle_6}
                />
              )}
            </div>
            {/* Interests & Hobbies */}
            {((resume?.interests && resume?.interests.length > 0) ||
              newSectionEntry.interests) && (
              <Interest
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* References */}
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                heading={resume.headings.references}
                references={resume.references}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Languages */}
            {((resume?.languages && resume?.languages.length > 0) ||
              newSectionEntry.languages) && (
              <Language
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Education */}
            <div className="w-full mb-2">
              {resume?.education.length > 0 && (
                <Education
                  heading={resume.headings.education}
                  educations={resume.education}
                  styles={template_6_styles}
                  customStyle={customStyle_6}
                />
              )}
            </div>
            <AddSection setNewSectionEntry={setNewSectionEntry} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate6);
