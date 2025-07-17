"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useSelector } from "react-redux";

import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import { ColorResult } from "react-color";
import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
const ResumeTemplate5 = () => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<string>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

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
  const [confirmationModal, setConfirmationModal] = useState(false);
  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  const [color, setColor] = useState("#e04127");
  const saveColor = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor(color.hex);

    // You can do whatever you need with the selected color here
  };
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  return (
    <div className="w-full text-gray-900 first-page">
      <div className="flex ">
        <div className="flex flex-col w-full p-8 text-center">
          <h2 className="text-2xl font-bold xs:text-xl md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
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
          <h3 className="text-xl xs:text-[14px] md:text-xl hover:shadow-md hover:bg-gray-100 ">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
        </div>
      </div>
      <div className="flex p-5 border-t-2 border-b-2 border-gray-500 xs:p-1 md:p-5">
        <div className="w-[75%] xs:w-full md:w-[75%] flex flex-col px-4 md:px-8">
          {/* Executive Summary */}

          <h3 className="text-lg font-semibold uppercase">EXECUTIVE SUMMARY</h3>
          <Toolbar regenrateSummary={getSummary}>
            <div className="mt-4 text-sm text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed ">
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
          <span className="border-dashed border-[1px] border-gray-500 my-6"></span>
          {/* Work Experience */}

          <h3 className="mb-4 text-lg font-semibold uppercase">
            WORK EXPERIENCE
          </h3>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <Toolbar
                    key={i}
                    addAchivement={() => setNewWorkExperience(i)}
                    deleteExperience={() => handlers.handleDeleteExperience(i)}
                    regenrateAchivements={() => handleRegenrate(rec, i)}
                    addNewLine={() => {
                      handlers.handleAddSpace(i, newAchievement);
                      setNewAchievement("");
                    }}
                  >
                    <div
                      key={i}
                      className={`flex justify-start items-start
                  `}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <h2 className="hover:shadow-md hover:cursor-text text-[1rem] font-bold leading-8 hover:bg-gray-100">
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
                        <h2 className="hover:cursor-default text-[15px] leading-relaxed  ">
                          {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                          {rec?.isContinue
                            ? "Present"
                            : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                          |{" "} */}
                          {rec.fromMonth && (
                            <EditableField
                              value={`${rec?.fromMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { fromMonth: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.fromYear && (
                            <EditableField
                              value={`${rec?.fromYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { fromYear: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.fromYear && <span>-</span>}
                          {rec.toMonth && !rec.isContinue && (
                            <EditableField
                              value={`${rec?.toMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toMonth: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.toMonth && <span>&nbsp;</span>}
                          {rec.toYear && !rec.isContinue && (
                            <EditableField
                              value={`${rec?.toYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toYear: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.isContinue && (
                            <EditableField
                              value={`${rec?.isContinue && "Present"}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toYear: value },
                                  i
                                );
                                handlers.handleSaveExperienceDetail(
                                  { isContinue: false },
                                  i
                                );
                              }}
                            />
                          )}
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
                        <div className="p-4">
                          {rec?.achievements && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-sm">
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
                          {newWorkExperience === i ? (
                            <>
                              <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
                                <textarea
                                  className="w-9/12 p-2 bg-transparent border-2 xs:w-full md:w-9/12 lg:w-9/12 rounded-l-md text" // Apply Tailwind CSS classes
                                  onChange={(e) =>
                                    setNewAchievement(e.target.value)
                                  }
                                  value={newAchievement}
                                  rows={1}
                                  cols={1}
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
                                <button
                                  className="w-2/12 px-2 text-white uppercase bg-green-500 xs:w-full md:w-2/12 lg:w-2/12 h-9 rounded-r-md"
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
                              </div>
                              <button
                                onClick={() => {
                                  setNewAchievement("");
                                  setNewWorkExperience(-1);
                                }}
                                className="w-2/12 px-2 py-1 mt-2 text-white bg-red-500 rounded-full xs:w-full md:w-2/12 lg:w-2/12"
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </div>
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
          {/* Education */}
          {resume?.education.length > 0 && (
            <div className="">
              <h3 className="flex flex-row items-center gap-2 my-3 mt-5 text-lg font-semibold uppercase border-b-2 border-gray-500">
                Education
              </h3>

              <ul className="flex flex-wrap w-full pl-0 xs:gap-2 md:flex-row lg:flex-row">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[30%]  md:w-[30%] xs:w-[48%] md:m-2 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li className="flex items-center justify-between font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:bg-gray-100 text-md">
                        <EditableField
                          type="textarea"
                          value={education?.educationLevel}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { educationLevel: value },
                              ind
                            );
                          }}
                        />
                      </li>
                      <div
                        onClick={() => setConfirmationModal(true)}
                        className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="text-base font-medium hover:shadow-md hover:bg-gray-100">
                        <EditableField
                          value={`${education?.fieldOfStudy}`}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { fieldOfStudy: value },
                              ind
                            );
                          }}
                        />{" "}
                      </li>
                      <li className="text-sm italic hover:shadow-md hover:bg-gray-100 text-gray-950">
                        <EditableField
                          type="textarea"
                          value={`${education?.schoolName}`}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { schoolName: value },
                              ind
                            );
                          }}
                        />
                      </li>
                      {(education.fromYear !== "" ||
                        education.toYear !== "") && (
                        <li className="mb-4 text-xs italic text-gray-950 ">
                          {education.fromMonth && (
                            <EditableField
                              value={`${education?.fromMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.fromMonth && <span>&nbsp;</span>}
                          {education.fromYear && (
                            <EditableField
                              value={`${education?.fromYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromYear: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.fromYear && <span>&nbsp; - &nbsp;</span>}
                          {education.toMonth && !education.isContinue && (
                            <EditableField
                              value={`${education?.toMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.toMonth && <span>&nbsp;</span>}
                          {education.toYear && !education.isContinue && (
                            <EditableField
                              value={`${education?.toYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toYear: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.isContinue && (
                            <EditableField
                              value={`${education?.isContinue && "Present"}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toYear: value },
                                  ind
                                );
                                handlers.handleSaveEductionDetail(
                                  { isContinue: false },
                                  ind
                                );
                              }}
                            />
                          )}
                        </li>
                      )}
                      {/* <li className="mb-4 text-xs italic text-gray-950 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li> */}
                    </div>
                    {confirmationModal && (
                      <DeleteConfirmationModal
                        message="Are you sure you want to delete ?"
                        onCancel={() => setConfirmationModal(false)}
                        onConfirm={() => {
                          setConfirmationModal(false);
                          handlers.handleDeleteEductionDetail(ind);
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-[25%] xs:w-1/3 md:w-[25%] flex flex-col pl-3 md:pl-4 pr-3 gap-4  border-l-2 border-gray-500 h-auto">
          {/* contacts */}

          <h3 className="flex flex-row items-center gap-2 mb-2 text-lg font-semibold uppercase">
            Contact
          </h3>

          <ul className="flex flex-col gap-4 pl-0 mb-4 text-sm break-all ">
            <li className="flex flex-row items-start justify-start gap-1 hover:shadow-md hover:bg-gray-100">
              <div className="p-1">{phoneIcon}</div>
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
            <li className="flex flex-row items-start justify-start gap-1 hover:shadow-md hover:bg-gray-100 ">
              <div className="p-1">{emailIcon}</div>
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
            <li className="flex flex-row items-start justify-start gap-1 hover:shadow-md hover:bg-gray-100 ">
              <div className="p-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                </svg>
              </div>
              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
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
          </ul>
          <span className="border border-gray-500 border-dashed"></span>

          {/* Skills */}

          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              {resume?.primarySkills && resume?.primarySkills.length > 0 && (
                <>
                  <h3 className="flex flex-row items-center gap-2 mt-4 text-lg font-semibold uppercase">
                    Skills
                  </h3>
                  {resume?.primarySkills &&
                  resume?.primarySkills.length > 0 &&
                  !regenerating ? (
                    <Toolbar
                      addSkill={handleAddSkills}
                      regenerateSkills={getPrimarySkills}
                    >
                      <ul className="flex flex-col gap-1 pl-0 mb-4 text-sm border-2 border-transparent hover:border-dashed hover:border-gray-500">
                        {resume?.primarySkills.map(
                          (skill: string, i: number) => (
                            <li
                              className="hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex justify-between "
                              key={i}
                              onDragStart={(e) =>
                                e.dataTransfer.setData(
                                  "text/plain",
                                  i.toString()
                                )
                              }
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => handleDropPrimary(e, i)}
                              draggable
                            >
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
                            </li>
                          )
                        )}
                        {newPrimarySkill ? (
                          <>
                            <div className="w-full rounded-2xl border-[1px] border-black flex h-9.5">
                              <input
                                type="text"
                                value={primarySkill}
                                placeholder="Please add Skill"
                                className="w-full px-2 bg-white outline-none rounded-2xl"
                                autoFocus
                                onChange={(e) =>
                                  setPrimarySkill(e.target.value)
                                }
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate5);
