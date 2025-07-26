"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { resumeContactIcon } from "@/helpers/iconsProvider";
import EditableField from "@/components/dashboard/EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

import {
  conditionStyleHeader,
  customStyle_10,
  template_10_styles,
} from "@/helpers/templateStylesObj";

import Publication from "./resume-sections/publication";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";
import { useAppContext } from "@/context/AppContext";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import Interest from "./resume-sections/interest";
import Language from "./resume-sections/language";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Project from "./resume-sections/project";
import Reference from "./resume-sections/reference";
import Education from "./resume-sections/education";
import AddSection from "../../resume-builder/AddSection";

const ResumeTemplate10 = () => {
  const { updateSaveHook } = useUpdateAndSave();
  const { setIsSidebar } = useAppContext();
  const resume = useSelector((state: any) => state.resume);
  //New code end
  useEffect(() => {
    setIsSidebar(true);
    return () => setIsSidebar(false);
  }, []);
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

  return (
    <div className="relative first-page">
      <div className="flex  flex-row absolute top-[30px] bg-[#043382] h-28 z-10 items-center justify-center w-full ">
        <div className="flex flex-col ">
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            styles={template_10_styles}
            conditionStyleHeader={conditionStyleHeader}
          />
        </div>
      </div>
      <div className="flex ">
        {/* sidebar */}
        <div className="z-5 xs:w-4/12 w-3.5/12 bg-[#030712] flex flex-col pl-3 xs:pl-0 sm:pl-0 md:pl-0 lg:pl-3 xs:pr-4 sm:pr-4 md:pr-4 lg:pr-6  text-gray-100  pr-6  pb-8  pt-[160px] h-auto">
          {/* contacts */}
          <div className="rounded-3xl border-2  border-[#043382] xs:py-2 py-[6px] flex justify-center ">
            <h3 className="flex flex-row items-center gap-2 mb-0 text-base font-semibold text-center uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
              {resumeContactIcon}
              <EditableField
                value={
                  resume?.headings?.contact
                    ? resume.headings.contact
                    : "Contact"
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
          </div>
          <Contact contact={resume.contact} styles={template_10_styles} />
          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_10_styles}
            customStyle={{
              customStyle_10,
            }}
            rounded_style="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
          />
          {/* Interests & Hobbies */}
          {((resume?.interests && resume?.interests.length > 0) ||
            newSectionEntry.interests) && (
            <Interest
              heading={resume.headings.interests}
              interests={resume.interests}
              styles={template_10_styles}
              rounded_style="rounded-full border-2 border-[#043382] xs:py-1  my-3  flex justify-center"
            />
          )}
          {/* Languages */}
          {((resume?.languages && resume?.languages.length > 0) ||
            newSectionEntry.languages) && (
            <Language
              heading={resume.headings.languages}
              languages={resume.languages}
              styles={template_10_styles}
              rounded_style="rounded-full border-2 border-[#043382] xs:py-1 my-3  flex justify-center"
            />
          )}
        </div>
        <div className="w-full flex flex-wrap flex-col px-4 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[160px] ">
          {/* Executive Summary */}
          <div className="">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={template_10_styles}
              customStyle={customStyle_10}
            />
          </div>
          {/* Work Experience */}
          <div className="my-4">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_10}
              styles={template_10_styles}
            />
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {((resume?.publications && resume?.publications.length > 0) ||
              newSectionEntry.publications) && (
              <Publication
                customStyle={customStyle_10}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_10_styles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {((resume?.certifications && resume?.certifications.length > 0) ||
              newSectionEntry.certifications) && (
              <Certification
                customStyle={customStyle_10}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_10_styles}
                iconColor={"text-white"}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {((resume?.awards && resume?.awards.length > 0) ||
              newSectionEntry.awards) && (
              <Award
                customStyle={customStyle_10}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_10_styles}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {((resume?.trainings && resume?.trainings.length > 0) ||
              newSectionEntry.trainings) && (
              <Training
                customStyle={customStyle_10}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_10_styles}
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
                styles={template_10_styles}
                customStyle={customStyle_10}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {((resume?.references && resume?.references.length > 0) ||
              newSectionEntry.references) && (
              <Reference
                customStyle={customStyle_10}
                heading={resume.headings.references}
                references={resume.references}
                styles={template_10_styles}
              />
            )}
          </div>

          {/* Education */}
          <div className="w-full my-4">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_10_styles}
                customStyle={customStyle_10}
              />
            )}
          </div>
          <AddSection setNewSectionEntry={setNewSectionEntry} />
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate10);
