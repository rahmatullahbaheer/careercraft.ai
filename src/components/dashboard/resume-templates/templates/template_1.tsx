"use client";
import { memo, use, useEffect, useState } from "react";
import React from "react";
import { TwitterPicker, ColorResult } from "react-color";
import { useSelector } from "react-redux";
import {
  crossIcon1,
  emailIcon,
  emailIconFilled,
  homeIconFilled,
  linkedInIconFilled,
  phoneIcon,
  phoneIconFilled,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "../../EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { formatDate } from "@/helpers/getFormattedDateTime";
import Project from "./resume-sections/project";
import { customStyle_6, template_6_styles } from "@/helpers/templateStylesObj";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Education from "./resume-sections/education";
import AddSection from "../../resume-builder/AddSection";
import { RootState } from "@/store/store";

const ResumeTemplate1 = ({
  streamedSummaryData,
  setStreamedSummaryData,
  streamedJDData,
  setStreamedJDData,
}: {
  streamedSummaryData: string;
  streamedJDData: string;
  setStreamedJDData: any;
  setStreamedSummaryData: any;
}) => {
  const resume = useSelector((state: any) => state.resume);
  console.log("RRRRR", resume);

  const userData = useSelector((state: RootState) => state.userData);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);

  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);

  const {
    handleDropPrimary,
    handleDropAchievement,
    handleDropExperience,
    handleDropOthersAchievement,
    handleDropOthers,
  } = useDragAndDrop();

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

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
    if (streamedJDData === "") {
      setStreamedJDData(null);
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

  // const saveColor = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);
  // You can do whatever you need with the selected color here
  // };

  return (
    <div className="flex flex-row text-gray-900 ">
      <div
        className={`relative flex bg-[#b324d7] print:bg-[#b324d7] w-[5%]`}
        style={{
          backgroundColor: "#b324d7",
          WebkitPrintColorAdjust: "exact",
          colorAdjust: "exact",
        }}
      >
        {/* <ColorPicker
          defaultColor="#e04127"
          resetColor="#e04127"
          setColor={setColor}
          styles_pin="absolute text-white top-0 right-0 "
          styles_div="absolute top-3 -left-1"
          saveColor={saveColor}
        /> */}
      </div>

      <div className="w-full">
        <div className="flex flex-col xs:py-3 md:py-8 xs:pl-2 md:pl-6 xs:pr-3 md:pr-8 w-12/12">
          <h2 className="font-bold border-2 border-transparent xs:text-xl md:text-4xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.name) {
                  updateSaveHook.updateAndSaveName(value);
                }
              }}
            />
          </h2>
          <h3 className="w-full text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl xs:leading-none hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
          <ul className="flex flex-row justify-between pl-0 my-2 text-xs break-all xs:flex-wrap md:flex-nowrap md:gap-3 md:flex-row">
            <li className="xs:w-full md:w-[25%] hover:shadow-md hover:bg-gray-100 xs:text-[8px] md:text-xs flex flex-row gap-1  items-center justify-start ">
              <div className="p-1">
                {phoneIconFilled}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="xs:w-2 md:w-4 xs:h-2 md:h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg> */}
              </div>
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateSaveHook.updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>
            <li className="xs:w-full md:w-[25%] hover:shadow-md hover:bg-gray-100 flex flex-row gap-1 items-center justify-start md:text-xs xs:text-[8px]">
              <div className="p-1">
                {emailIconFilled}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="xs:w-2 xs:h-2 md:w-4 md:h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg> */}
              </div>
              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateSaveHook.updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>
            <li className="xs:-full md:w-[25%] flex flex-row items-center justify-start gap-1 xs:text-[8px] md:text-xs hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                {/* <svg
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="xs:w-2 md:w-4 xs:h-2 md:h-4"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="black"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
                    fill="black"
                  />
                </svg> */}
                {linkedInIconFilled}
              </div>

              <EditableField
                value={
                  resume?.contact?.linkedIn !== ""
                    ? resume.contact.linkedIn
                    : userData?.linkedin
                    ? userData?.linkedin
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
            <li className="xs:w-full md:w-[25%] flex flex-row items-center justify-start gap-1 xs:text-[8px] md:text-xs text-gray-950 hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="xs:h-2 xs:w-2 md:w-4 md:h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg> */}
                {homeIconFilled}
              </div>
              <EditableField
                value={resume?.contact?.address ? resume.contact.address : ""}
                onSave={(value: string) => {
                  if (value !== resume.contact.address) {
                    updateSaveHook.updateAndSaveBasicInfo({ address: value });
                  }
                }}
              />
            </li>
          </ul>

          <div className="flex flex-col flex-wrap w-full">
            {/* EXECUTIVE SUMMARY */}
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 md:mt-3"></span>
            <h3 className="flex items-center gap-2 font-semibold uppercase border-2 border-transparent md:my-1 xs:text-xs md:text-base hover:border-dashed hover:border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <EditableField
                value={
                  resume?.headings?.summary
                    ? resume.headings.summary
                    : " executive summary"
                }
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== resume?.headings.summary) {
                    updateSaveHook.updateAndSaveHeadings({ summary: value });
                  }
                }}
              />
            </h3>
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            <Toolbar regenrateSummary={getSummary}>
              <div className="my-2 text-xs text-justify border-2 border-transparent h-fit hover:shadow-md hover:border-gray-500 hover:border-dashed ">
                <EditableField
                  type="textarea"
                  value={
                    resume?.summary !== "" ? (
                      resume?.summary
                    ) : streamedSummaryData ? (
                      streamedSummaryData
                    ) : (
                      <div className="text-center">
                        <div role="status">
                          <Loader />
                        </div>
                      </div>
                    )
                  }
                  onSave={(value: string) => {
                    updateSaveHook.updateAndSaveSummary(value);
                  }}
                />
              </div>
            </Toolbar>

            {/* Skills */}

            {resume?.primarySkills && resume?.primarySkills.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 md:mt-3"></span>
                <h3 className="flex flex-row items-center gap-2 font-semibold uppercase border-2 border-transparent md:my-1 xs:text-xs md:text-base hover:border-dashed hover:border-gray-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                      clipRule="evenodd"
                    />
                    <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                    <path
                      fillRule="evenodd"
                      d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.primarySkills
                        ? resume.headings.primarySkills
                        : " skills"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.primarySkills) {
                        updateSaveHook.updateAndSaveHeadings({
                          primarySkills: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mb-2"></span>
                {resume?.primarySkills &&
                resume?.primarySkills.length > 0 &&
                !regenerating ? (
                  <Toolbar
                    addSkill={handleAddSkills}
                    regenerateSkills={getPrimarySkills}
                  >
                    <ul className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%] text-xs ">
                      {" "}
                      {/* <li className="font-semibold uppercase">primary</li> */}
                      {resume?.primarySkills.map((skill: string, i: number) => (
                        <li
                          className="hover:shadow-md  w-[32%]  xs:w-[45%] md:w-[32%]  hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
                          key={i}
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropPrimary(e, i)}
                          draggable
                        >
                          <span className="!block  !w-1 !h-1 mr-3 !bg-black !rounded-full"></span>
                          <div className="flex items-center justify-between w-full">
                            <EditableField
                              value={skill}
                              onSave={(value: string) => {
                                handlers.handleUpdateSkill(value, i);
                              }}
                            />
                            <div
                              onClick={() => handlers.handleDeleteSkill(i)}
                              className="w-4 h-4 cursor-pointer child"
                            >
                              {crossIcon1}
                            </div>
                          </div>
                        </li>
                      ))}
                      {newPrimarySkill ? (
                        <>
                          <div className="w-full rounded-2xl border-[1px] border-black flex h-9.5">
                            <input
                              type="text"
                              value={primarySkill}
                              placeholder="Please add Skill"
                              className="w-full px-2 bg-white outline-none rounded-2xl"
                              autoFocus
                              onChange={(e) => setPrimarySkill(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveSkills();
                                }
                              }}
                            />
                            <button
                              className="px-2 text-white uppercase bg-green-500 h-9 rounded-r-2xl"
                              onClick={handleSaveSkills}
                            >
                              save
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setNewPrimarySkill(false);
                            }}
                            className="px-2 py-1 text-white bg-red-500 rounded-full"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        " "
                      )}
                    </ul>
                  </Toolbar>
                ) : (
                  <div className="text-center">
                    <div role="status">
                      <Loader />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Work Experience */}
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
                <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
              </svg>

              <EditableField
                value={
                  resume?.headings?.workExperienceArray
                    ? resume.headings.workExperienceArray
                    : "work experience"
                }
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== resume?.headings?.workExperienceArray) {
                    updateSaveHook.updateAndSaveHeadings({
                      workExperienceArray: value,
                    });
                  }
                }}
              />
            </h3>
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            {resume?.workExperienceArray &&
            resume?.workExperienceArray.length > 0 ? (
              <>
                {resume?.workExperienceArray.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("WorkExperience");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteExperience(i)
                      }
                      regenrateAchivements={() => handleRegenrate(rec, i)}
                      // addNewLine={() => {
                      //   handlers.handleAddSpace(i, newAchievement);
                      //   setNewAchievement("");
                      // }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.title}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveExperienceDetail(
                                { title: value },
                                i
                              );
                            }}
                          />
                        </h2>
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                          {rec?.isContinue
                            ? "Present"
                            : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                          |{" "} */}
                          {rec.fromMonth && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.fromMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromMonth: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.fromYear && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.fromYear}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromYear: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.fromYear && <span>-</span>}
                          {rec.toMonth && !rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.toMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toMonth: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.toYear && !rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.toYear}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toYear: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.isContinue && "Present"}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toMonth: value },
                                    i
                                  );
                                  handlers.handleSaveExperienceDetail(
                                    { isContinue: false },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          |{" "}
                          <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
                            <EditableField
                              value={rec?.company}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { company: value },
                                  i
                                );
                              }}
                            />
                          </span>{" "}
                          |{" "}
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.cityState}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { cityState: value },
                                  i
                                );
                              }}
                            />
                          </span>{" "}
                          {rec?.cityState?.length > 0 && ","}
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.country}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { country: value },
                                  i
                                );
                              }}
                            />
                          </span>
                        </h2>
                        <div className="px-4 py-1">
                          {rec?.achievements && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.achievements.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropAchievement(
                                          i,
                                          ind,
                                          insideIndex
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraSpace(
                                            i,
                                            ind
                                          );
                                        }}
                                      >
                                        Remove This Extra Space
                                      </div>
                                    </li>
                                  ) : (
                                    <li
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropAchievement(
                                          i,
                                          ind,
                                          insideIndex
                                        );
                                      }}
                                      draggable
                                      className="list-disc hover:border-dashed hover:cursor-move hover:border-gray-500 border-[1px] hover:border-[1px] border-transparent hover:shadow-md relative parent hover:bg-gray-100"
                                      key={ind}
                                    >
                                      <EditableField
                                        type="textarea"
                                        value={achievement}
                                        onSave={(value: string) => {
                                          handlers.handleUpdateAchivement(
                                            i,
                                            ind,
                                            value
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteAchivement(
                                            i,
                                            ind
                                          )
                                        }
                                        className="w-4 h-4 absolute right-0.5 top-0.5 text-red-500 cursor-pointer child"
                                      >
                                        {crossIcon1}
                                      </div>
                                    </li>
                                  )
                              )}
                            </ul>
                          ) : streamedJDData ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: streamedJDData,
                              }}
                            ></div>
                          ) : (
                            <div className="text-center">
                              <div role="status">
                                <Loader />
                              </div>
                            </div>
                          )}

                          {newWorkExperience === i &&
                          newBulletSection === "WorkExperience" ? (
                            <>
                              <div className="flex flex-wrap w-full gap-1 mt-4">
                                <input
                                  className="w-full py-[4px] border-2 rounded-md  text bg-transparent " // Apply Tailwind CSS classes
                                  onChange={(e) =>
                                    setNewAchievement(e.target.value)
                                  }
                                  value={newAchievement}
                                  name="newAchievement"
                                  id="newAchievement"
                                  autoComplete="off"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddAchivement(
                                        i,
                                        newAchievement
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddAchivement(
                                        i,
                                        newAchievement
                                      );
                                      setNewAchievement("");
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => {
                                      setNewAchievement("");
                                      setNewWorkExperience(-1);
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            ) : (
              <div
                className="list-disc "
                dangerouslySetInnerHTML={{
                  __html:
                    resume?.workExperience !== ""
                      ? resume?.workExperience
                      : streamedJDData,
                }}
              ></div>
            )}

            {/* Publications */}
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
            {/* <AddSection setNewSectionEntry={setNewSectionEntry} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate1);
