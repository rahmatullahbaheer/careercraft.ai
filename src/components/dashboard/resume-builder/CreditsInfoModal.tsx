/* eslint-disable react/display-name */
"use client";
import { infoSmallIcon } from "@/helpers/iconsProvider";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";

type ModalProps = {
  handleGenerate: (quantifyingExperience: boolean) => void;
};

const CreditInfoModal = forwardRef(
  ({ handleGenerate }: ModalProps, ref: any) => {
    const [openCreditInfoModal, setOpenCreditInfoModal] =
      useState<boolean>(false);
    const [quantifyingExperience, setQuantifyingExperience] =
      useState<boolean>(false);

    const openModal = (open: boolean) => {
      setOpenCreditInfoModal(open);
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    const quantifyExperience = () => {
      handleGenerate(true);
      setOpenCreditInfoModal(false);
    };

    const dontQuanitfyExperence = () => {
      handleGenerate(false);
      setOpenCreditInfoModal(false);
    };

    const creditLimits = useSelector((state: any) => state.creditLimits);

    return (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          openCreditInfoModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-xl max-h-full p-8 bg-gray-300 rounded shadow-md dark:bg-gray-800">
          {/* <div className="relative p-4 text-center rounded-lg shadow sm:p-5"> */}
          <h1 className="text-lg font-bold text-center dark:text-white text-gray-950">
            {/* Credits Usage Info */}
            Select Your Work Experience Preference:
          </h1>
          <p className="my-4 text-sm">
            If you wish to quantify your achievements by assigning numbers or
            percentages, please select the {`"`}Quantify Experiences{`"`} option below.
            This is considered a best practice for presenting tangible results
            in your resume. However, if you do not have specific metrics to
            include, select {`"`}Don{"'"}t Quantify Experiences{`"`}.
          </p>

          <button
            onClick={() => setOpenCreditInfoModal(false)}
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {/* </div> */}

          {/* <ul className="px-4 py-6 list-decimal ">
            <li className="px-3 py-1 text-sm ">
              You will be cost <strong>{creditLimits.resume_basicInfo}</strong>{" "}
              credits for Basic Info and Job Title Generation.
            </li>
            <li className="px-3 py-1 text-sm ">
              You will be cost <strong>{creditLimits.resume_skills}</strong>{" "}
              credits for Skills Generation.
            </li>
            <li className="px-3 py-1 text-sm ">
              You will be cost{" "}
              <strong>{creditLimits.resume_summary_generation}</strong> credits
              for Summary Generation.
            </li>
            <li className="px-3 py-1 text-sm">
              You will be cost{" "}
              <strong>{creditLimits.resume_individualWorkExperience}</strong>{" "}
              credits for Individual Work Experience.
            </li>
          </ul> */}

          {/* <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={quantifyingExperience}
              onChange={(e) => setQuantifyingExperience(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-none peer-checked:bg-blue-600"></div>
            <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
              Quantifying Experiences
            </span> */}
          {/* <span className="relative ml-2 text-gray-600 cursor-pointer group">
              {infoSmallIcon}
              <div
                role="tooltip"
                className="absolute hidden w-48 p-2 text-xs text-gray-100 transform -translate-x-1/2 bg-gray-600 rounded-md md:-top-6 xs:top-0 xs:left-0 md:left-28 group-hover:block"
              >
                Quantifying experiences refers to assigning numerical or
                measurable values to experiences or achievements to make them
                more tangible or comparable.
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </span> */}
          {/* </label> */}

          <div className="flex flex-col items-center justify-center space-y-2 ">
            {/* <div className="w-full text-center">
              <strong>Are you sure you want to continue?</strong>
            </div> */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={dontQuanitfyExperence}
                className="p-2 text-sm text-white bg-green-600 rounded"
              >
                Don{"'"}t Quantify Experiences
              </button>
              <button
                onClick={quantifyExperience}
                className="p-2 text-sm text-white bg-blue-600 rounded"
              >
                Quantify Experiences
              </button>

              {/* <button
                className="p-2 text-sm text-white bg-red-600 rounded"
                onClick={() => {
                  setOpenCreditInfoModal(false);
                }}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CreditInfoModal;
