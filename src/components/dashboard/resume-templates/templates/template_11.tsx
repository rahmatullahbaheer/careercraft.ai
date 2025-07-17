"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useSelector } from "react-redux";

import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

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
const ResumeTemplate11 = () => {
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<string>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

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

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };

  return (
    <div className="relative first-page">
      <div className="flex flex-row absolute top-[30px] xs:top-[30px] sm:top-[50px] md:top-[50px] lg:top-[50px]  h-[168px] xs:h-[114px] sm:h-[114px] md:h-[168px] lg:h-[168px]  bg-[#F4D644] justify-center   w-[100%] items-center">
        <div className="flex flex-col justify-center ml-[170px] md:ml-[130px] ">
          <h2 className="pb-2 text-2xl font-bold xs:text-xl md:text-2xl lg:text-2xl hover:shadow-md text-gray-950 hover:bg-gray-100">
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
          <h3 className="text-xl xs:text-[14px] md:text-xl font-medium  hover:shadow-md hover:bg-gray-100 text-gray-950">
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
      <div className="flex ">
        {/* sidebar */}

        <div className="  w-3/12 xs:w-3/12 md:w-3/12 flex flex-col pl-3 md:pl-8 bg-[#2A2E36] text-gray-100  pr-6  pb-8 h-[1120px] xs:h-auto  pt-[220px] xs:pt-[180px] md:pt-[250px]">
          {/* contacts */}

          <h3 className="flex flex-row items-center gap-2 text-lg font-bold uppercase">
            Contact
          </h3>
          <span className="border border-[#F4D644] w-[110%] mt-2"></span>

          <ul className="flex flex-col gap-2 pl-0 mt-6 mb-4 text-sm break-all ">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex flex-row gap-1  items-start justify-start">
              <div className="bg-[#F4D644]  p-2 mr-3 text-gray-950">
                {phoneIcon}
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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-1  text-xs items-start justify-start">
              <div className="bg-[#F4D644] text-gray-950  p-2 mr-3">
                {" "}
                {emailIcon}
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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500  flex flex-row gap-1 items-start justify-start text-xs">
              <div className="bg-[#F4D644]   mr-3  text-white">
                {/* {linkedInIcon} */}
                <span className="grid w-8 h-8 text-sm text-gray-950 place-content-center">
                  in
                </span>
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
            </li>
          </ul>

          {/* Skills */}

          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <div className="flex flex-col mt-4 mb-4">
                <h3 className="flex flex-row items-center gap-2 text-lg font-bold uppercase">
                  Skills
                </h3>
                <span className="border border-[#F4D644] w-[110%] mt-2"></span>
              </div>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col gap-4 pl-0 mb-4 text-sm border-2 border-transparent hover:border-dashed hover:border-gray-500">
                    {" "}
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md   hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex  items-center   "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
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
        </div>
        <div className="w-9/12 flex  flex-col px-8 xs:px-2 sm:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[230px] xs:pt-[180px]  md:pt-[220px] lg:pt-[250px]  ">
          {/* Executive Summary */}
          <div className="flex flex-col w-full mb-6 ">
            <h3 className="uppercase text-lg xs:text-[14px] sm:text[14px] md:text-lg lg:text-lg font-bold">
              EXECUTIVE SUMMARY
            </h3>
            <span className="border border-[#F4D644]  mt-2"></span>
          </div>

          <Toolbar regenrateSummary={getSummary}>
            <div className="text-sm text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed">
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

          {/* Work Experience */}
          <div className="flex flex-col w-full my-6">
            <h3 className="uppercase text-lg xs:text-[14px] sm:text[14px] md:text-lg lg:text-lg font-bold text-gray-950">
              WORK EXPERIENCE
            </h3>
            <span className="border border-[#F4D644]  mt-2"></span>
          </div>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={`flex justify-start items-start ${
                      i > 0
                        ? "w-[100vw] ml-[-200px] xs:ml-0 xs:w-full "
                        : "xs:min-h-fit min-h-[350px]"
                    }`}
                  >
                    <div className="w-[5%] mt-1 pr-5  md:pr-5 lg:pr-5   pt-2   h-full flex flex-col items-center  gap-1">
                      <div className="p-1 bg-gray-100 border-2 border-gray-500 rounded-full "></div>
                      {resume?.workExperienceArray.length - 1 !== i && (
                        <div className="h-full w-[2px] bg-gray-500"></div>
                      )}
                    </div>
                    <Toolbar
                      key={i}
                      addAchivement={() => setNewWorkExperience(i)}
                      deleteExperience={() =>
                        handlers.handleDeleteExperience(i)
                      }
                      regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddSpace(i, newAchievement);
                        setNewAchievement("");
                      }}
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
                    </Toolbar>
                  </div>
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
            <div className="ml-[-200px] xs:ml-0">
              <div className="flex flex-col my-6">
                <h3 className="flex flex-row items-center gap-2 text-lg font-semibold uppercase text-gray-950 ">
                  Education
                </h3>
                <span className="border border-[#F4D644] mt-2"></span>
              </div>

              <ul className="flex flex-wrap w-full pl-0 md:flex-row lg:flex-row xs:gap-2 ">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[28%]   xs:w-[45%] m-2 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li
                        className=" hover:shadow-md hover:cursor-move  
                  parent  
                   hover:bg-gray-100 font-bold flex uppercase text-[15px]  justify-between items-center "
                      >
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
                      <li className="hover:shadow-md  hover:bg-gray-100 text-[15px] font-medium">
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
                      <li className="text-sm italic text-gray-800 hover:shadow-md hover:bg-gray-100">
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
                        <li className="mb-4 text-xs italic text-gray-700">
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
                      {/* <li className="mb-4 text-xs italic text-gray-700 ">
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
      </div>
    </div>
  );
};
export default memo(ResumeTemplate11);
