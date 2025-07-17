"use client";
import { crossIcon } from "@/helpers/iconsProvider";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CustomSection = ({ setSectionsPopup,setNewSectionEntry }) => {
  const sections = [
    "awards",
    "certifications",
    "publications",
    "trainings",
    "projects",
    "interests",
    "languages",
    "references",
  ];
  const sectionLabels = {
    "interests": "interests & hobbies",
    "awards": "awards",
    "certifications": "certifications",
    "publications": "publications",
    "trainings": "trainings",
    "projects": "projects",
    "languages": "languages",
    "references": "references",
  };
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const resume = useSelector((state: RootState) => state.resume);

  const handleCheckboxChange = (section) => {
    setSelectedSection((prev) => (prev === section ? null : section));
  };
  const handleAddSection = () => {
    if (selectedSection) {
      setNewSectionEntry((prev) => ({
        ...prev,
        [selectedSection]: true,
      }));
      setSectionsPopup(false);
    }
  };
  useEffect(()=>{
    const element = document.querySelector(".customSection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },[])

  return (
    <div className="customSection overflow-auto bg-white  w-3/4 self-center rounded-md shadow-xl">
      <div className="p-4 flex flex-col rounded-lg">
        <div className="flex items-center justify-between w-full px-4">
          <h3 className="font-semibold xs:text-lg md:text-xl">
            Select Section to Add
          </h3>
          <h1
            className="font-semibold cursor-pointer xs:text-xl md:text-2xl"
            onClick={() => setSectionsPopup(false)}
          >
            {crossIcon}
          </h1>
        </div>
        <div className="mt-4 flex flex-col px-4">
          {sections.map((section, index) => (
            <label key={index} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                value={section}
                onChange={() => handleCheckboxChange(section)}
                disabled={resume[section]?.length > 0}
                checked={
                  selectedSection === section || resume[section]?.length > 0
                }
              />
              <span className="capitalize font-semibold">
                {sectionLabels[section]} {resume[section]?.length > 0 && "(Already Added)"}{" "}
              </span>
            </label>
          ))}
        </div>
        <button
          className={`self-end mt-4 !bg-blue-500 rounded-md px-4 py-1  ${
            !selectedSection ? "text-gray-300" : "text-white hover:!bg-blue-600"
          }`}
          disabled={!selectedSection}
          onClick={handleAddSection}
        >
          {" "}
          Add Section
        </button>
      </div>
    </div>
  );
};

export default CustomSection;
