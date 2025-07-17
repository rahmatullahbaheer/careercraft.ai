"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
const ResumeTemplate18 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<string>("");
  const { saveResumeToDB } = useSaveResumeToDB();

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

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
    <div className="relative w-full text-gray-900 first-page">
      <div className="absolute top-0 flex items-center justify-start w-8/12 px-4 py-3 xs:w-8/12 md:px-8 md:w-8/12 md:py-8">
        <div className="flex flex-col px-1 py-8">
          <h2 className="font-serif text-2xl font-bold md:text-5xl hover:shadow-md hover:bg-gray-100">
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
          <h3 className="text-[16px] md:text-2xl text-[#008cff]  hover:shadow-md mt-2 w-12/12 hover:bg-gray-100">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                dispatch(setField({ name: "jobTitle", value: value }));
                saveResumeToDB({ ...resume, jobTitle: value });
              }}
            />
          </h3>
        </div>
      </div>
      <div className="flex">
        <div className="w-9/12 md:w-full flex flex-col px-4 md:px-8 pt-[8rem] md:pt-[13rem] ">
          {/* Executive Summary */}
          <span className="w-full h-0 my-3 border-stylee xs:my-3 md:my-3"></span>
          <h3 className="uppercase text-xl xs:text-lg  font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            EXECUTIVE SUMMARY
          </h3>
          <span className="w-full h-0 my-3 border-stylee"></span>

          <Toolbar regenrateSummary={getSummary}>
            <div className="text-sm text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed ">
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
          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3 className="uppercase text-lg font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            WORK EXPERIENCE
          </h3>
          <span className="w-full h-0 my-3 border-stylee"></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="my-2 border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropExperience(e, i)}
                    draggable
                  >
                    <div className="flex flex-col text-[#000]">
                      <span className="text-lg hover:shadow-md hover:cursor-text hover:bg-gray-100">
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
                      </span>
                      <span className="hover:cursor-default text-[14px] text-[#242424] font-medium">
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
                      </span>
                    </div>
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
          {resume?.education.length > 0 && (
            <div className="w-[100vw] xs:w-auto">
              <span className="w-full h-0 my-3 border-stylee"></span>
              <h3 className="uppercase text-lg flex items-center gap-2 font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
                {/* {educationIcon} */}
                Education
              </h3>
              <span className="w-full h-0 my-3 border-stylee"></span>
              <ul className="flex flex-wrap w-full pl-0 text-gray-800 xs:px-2 md:px-0">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[30%] xs:w-[50%] md:w-[30%] lg:w-[30%] md:m-2  relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li className="flex items-center font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:bg-gray-100 hover:text-black text-md">
                        <div className="flex flex-row items-center justify-between w-full">
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
                        </div>
                      </li>
                      <div
                        onClick={() => setConfirmationModal(true)}
                        className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="text-sm font-semibold text-gray-800 uppercase hover:shadow-md hover:text-black hover:tet-black hover:bg-gray-100">
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
                      <li className="text-sm text-gray-800 hover:shadow-md hover:text-black hover:bg-gray-100">
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
                        <li className="mb-4 text-xs text-gray-800">
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

                      {/* <li className="mb-4 text-xs text-gray-800 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li> */}
                    </div>
                    {confirmationModal && (
                      <DeleteConfirmationModal
                        onCancel={() => setConfirmationModal(false)}
                        message="Are you sure you want to delete ?"
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
        <div className=" w-4/12 md:w-4/12 xs:w-4/12  flex flex-col relative inset-0  px-6 xs:px-0 md:px-6  bg-[#22405c] h-[1080px] xs:h-auto">
          <span className="w-full bg-[#182d40] absolute md:-mx-6 h-4"></span>
          <div className="flex justify-center">
            <div className="border-[.5rem] xs:border-[2px] md:border-[.5rem] border-[#395168]   text-gray-800 mt-[3rem] bg-[#182d40] text-center flex justify-center items-center rounded-md">
              <div className=" w-[9rem] h-[9rem] xs:w-[5.5rem] xs:h-[5.5rem]   md:w-[9rem] lg:h-[9rem] lg:w-[9rem] text-[#F1F1F1] flex justify-center items-center bg-[#182d40]  rounded-md ">
                <span className="text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
                  <EditableField
                    value={resume?.shortName ? resume?.shortName : "CPH"}
                    style={{ width: "60px" }}
                    onSave={(value: string) => {
                      dispatch(setField({ name: "shortName", value: value }));
                      saveResumeToDB({ ...resume, shortName: value });
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* contacts */}
          <span className="w-full h-0 my-3 border-stylee"></span>

          <h3 className="uppercase text-lg xs:px-2 md:px-0  xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
            Contact
          </h3>
          <span className="w-full h-0 my-3 border-stylee"></span>
          <ul className="flex flex-col w-full gap-3 pl-0 mb-4 text-sm text-gray-300 break-all xs:px-2">
            <li className="flex flex-row items-start justify-start gap-3 text-sm hover:shadow-md hover:bg-gray-100 hover:text-black ">
              <div>{phoneIcon}</div>
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
            <li className="flex flex-row items-start justify-start gap-3 text-sm hover:shadow-md hover:text-black hover:bg-gray-100">
              <div>{emailIcon}</div>

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
            <li className="flex flex-row items-start justify-start gap-2 text-sm text-gray-300 hover:shadow-md hover:bg-gray-100 group hover:text-black hover">
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z" />
                  <path
                    d="M5.83889 13V7.54545H6.47454V13H5.83889ZM6.16204 6.60795C6.03183 6.60795 5.92056 6.56416 5.82823 6.47656C5.7359 6.3866 5.68974 6.27888 5.68974 6.15341C5.68974 6.02794 5.7359 5.9214 5.82823 5.83381C5.92056 5.74384 6.03183 5.69886 6.16204 5.69886C6.29225 5.69886 6.40352 5.74384 6.49585 5.83381C6.58817 5.9214 6.63434 6.02794 6.63434 6.15341C6.63434 6.27888 6.58817 6.3866 6.49585 6.47656C6.40352 6.56416 6.29225 6.60795 6.16204 6.60795ZM9.67834 9.59091V13H9.04624V7.54545H9.66058V8.40128H9.7174C9.84524 8.12192 10.0441 7.8982 10.314 7.73011C10.5862 7.55966 10.9224 7.47443 11.3225 7.47443C11.6895 7.47443 12.0114 7.55137 12.2884 7.70526C12.5678 7.85677 12.7844 8.08049 12.9383 8.37642C13.0945 8.67235 13.1727 9.03575 13.1727 9.46662V13H12.5406V9.50568C12.5406 9.05824 12.4151 8.70431 12.1641 8.44389C11.9156 8.18348 11.5817 8.05327 11.1627 8.05327C10.8763 8.05327 10.6218 8.11482 10.3992 8.23793C10.1767 8.36103 10.0003 8.53859 9.8701 8.7706C9.74226 9.00024 9.67834 9.27367 9.67834 9.59091Z"
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
            </li>
          </ul>
          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="w-full h-0 my-1 border-stylee"></span>
              <h3 className="uppercase text-lg xs:px-2 md:px-0  xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                Skills
              </h3>

              <span className="w-full h-0 my-3 border-stylee"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col w-full gap-1 pl-0 mb-4 text-sm text-gray-300 border-2 border-transparent hover:border-dashed hover:border-gray-500 xs:px-1 md:px-0 ">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent xs:w-full hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center  "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>
                        <div className="flex flex-row items-center justify-between w-full">
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
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate18);
