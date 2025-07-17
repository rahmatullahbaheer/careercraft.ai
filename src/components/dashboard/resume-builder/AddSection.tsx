"use client";

import { useState } from "react";
import CustomSection from "./CustomSection";

const AddSection = ({setNewSectionEntry}) => {
  const [sectionsPopup, setSectionsPopup] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full">
        <span className=" h-[1px] !block bg-gray-300 flex-1"></span>
        <button
          title="Add Section"
          type="button"
          className="p-1 m-2 text-gray-500 border-[1.2px] rounded-sm border-gray-300 hover:bg-gray-100"
          onClick={() => setSectionsPopup(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
        <span className=" h-[1px] !block bg-gray-300 flex-1"></span>
      </div>
      {sectionsPopup && <CustomSection setSectionsPopup={setSectionsPopup} setNewSectionEntry={setNewSectionEntry}/> }
    </>
  );
};

export default AddSection;
