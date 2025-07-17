"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import { Interest as InterestType } from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  interests: InterestType[];
  styles: any;
  customStyle?: any;
  rounded_style?: any;
  isSidebar?: boolean;
};
const Interest = ({
  heading,
  interests,
  styles,
  customStyle,
  rounded_style,
  isSidebar,
}: Props) => {
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <div className={`interests ${rounded_style ? rounded_style : ""}`}>
        <h3
          className={`${styles?.interest_h3} ${
            customStyle?.centeredHeading ? "justify-center" : ""
          }
          ${customStyle?.bgColor}
          ${styles?.underline ? "underline" : null}
        `}
        >
          {!customStyle?.hideIcons && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
            </svg>
          )}

          <EditableField
            value={heading ? heading : "interests & hobbies"}
            style={{ width: "fit-content" }}
            onSave={(value: string) => {
              if (value !== heading) {
                updateSaveHook.updateAndSaveHeadings({
                  interests: value,
                });
              }
            }}
          />
        </h3>
      </div>
      <span
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      {interests.map((rec: InterestType, i: number) => {
        return (
          <Toolbar
            key={i}
            // addAchivement={() => {
            //   setNewWorkExperience(i);
            //   setNewBulletSection("Interests");
            // }}
            deleteExperience={() => handlers.handleDeleteOthers(i, "interests")}
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newAchievement, "interests");
              setNewAchievement("");
            }}
          >
            <div
              key={i}
              className={`${styles?.interest_div}`}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "interests")}
              draggable
            >
              {/* <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
            <EditableField
              value={rec?.name}
              style={{ width: "100%" }}
              onSave={(value: string) => {
                handlers.handleSaveOthersDetail(
                  { name: value },
                  i,
                  "interests"
                );
              }}
            />
          </h2> */}

              <div className="px-4 py-1">
                {rec?.description && Array.isArray(rec?.description) ? (
                  <ul className={` ${styles?.interest_ul}`}>
                    {rec?.description.map((achievement: any, ind: number) =>
                      achievement === "" ? (
                        <li
                          key={ind}
                          onDragStart={(e) => {
                            setInsideIndex(ind);
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            handleDropOthersAchievement(
                              i,
                              ind,
                              insideIndex,
                              "interests"
                            );
                          }}
                          draggable
                          className={`group ${styles?.interest_li}`}
                        >
                          <div
                            className={`${styles?.interest_line}`}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "interests"
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
                            handleDropOthersAchievement(
                              i,
                              ind,
                              insideIndex,
                              "interests"
                            );
                          }}
                          draggable
                          className={`${styles?.interest_delete1} `}
                          key={ind}
                        >
                          <EditableField
                            type="textarea"
                            value={achievement}
                            onSave={(value: string) => {
                              handlers.handleUpdateOthersAchivement(
                                i,
                                ind,
                                value,
                                "interests"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "interests"
                              )
                            }
                            className={`${styles?.interest_delete} `}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <ul className={` text-xs`}>
                    <li className={`list-disc capitalize`}>
                      <EditableField
                        type="textarea"
                        value={rec.description}
                        onSave={(value: string) => {
                          handlers.handleUpdateInterests(value, i,"interests");
                        }}
                      />
                    </li>
                  </ul>
                )}

                {newWorkExperience === i && newBulletSection === "Interests" ? (
                  <>
                    <div className={`${styles?.interest_div_input}`}>
                      <input
                        className={`${styles?.interest_new_input}`} // Apply Tailwind CSS classes
                        onChange={(e) => setNewAchievement(e.target.value)}
                        value={newAchievement}
                        name="newAchievement"
                        id="newAchievement"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newAchievement,
                              "interests"
                            );
                            setNewAchievement("");
                          }
                        }}
                      />
                      <div className="flex w-full gap-2 my-2">
                        <button
                          className="save_btn"
                          onClick={() => {
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newAchievement,
                              "interests"
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
                          className="delete_btn"
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

      <AddItemToCustomSection recName="interests" isSidebar={isSidebar} />
    </>
  );
};

export default Interest;
