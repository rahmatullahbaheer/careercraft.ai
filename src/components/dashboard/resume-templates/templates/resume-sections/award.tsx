"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import { formatDate } from "@/helpers/getFormattedDateTime";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import { Award as AwardType } from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  awards: AwardType[];
  styles: any;
  customStyle?: any;
};

const Award = ({ heading, awards, styles, customStyle }: Props) => {
  const [rewardIndex, setRewardIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newReward, setNewReward] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);

  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`awards ${styles?.award_h3} ${
          customStyle?.centeredHeading ? "justify-center" : ""
        }
          ${customStyle?.bgColor}
          ${styles?.underline ? "underline" : null}
          ${styles?.bgColor}
        `}
      >
        {!customStyle?.hideIcons && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        <EditableField
          value={heading ? heading : "awards"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                awards: value,
              });
            }
          }}
        />
      </h3>
      <span
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      {awards.map((rec: any, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setRewardIndex(i);
              setNewBulletSection("Awards");
            }}
            deleteExperience={() => handlers.handleDeleteOthers(i, "awards")}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newReward, "awards");
              setNewReward("");
            }}
          >
            <div
              key={i}
              className={`${styles?.award_div}`}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "awards")}
              draggable
            >
              <h2 className={`${styles?.award_h2}`}>
                <EditableField
                  value={rec?.title}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveOthersDetail(
                      { title: value },
                      i,
                      "awards"
                    );
                  }}
                />
              </h2>
              <h2 className={`${styles?.award_h2_1}`}>
                {rec.date && (
                  <span className={`${styles?.award_date}`}>
                    <EditableField
                      value={`${formatDate(rec?.date)}`}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { date: value },
                          i,
                          "awards"
                        );
                      }}
                    />
                  </span>
                )}
                |
                <span className={`${styles?.award_date}`}>
                  <EditableField
                    value={rec?.awardingOrganization}
                    onSave={(value: string) => {
                      handlers.handleSaveOthersDetail(
                        { awardingOrganization: value },
                        i,
                        "awards"
                      );
                    }}
                  />
                </span>
              </h2>
              <div className="px-4 py-1">
                {rec?.description && (
                  <ul className={`${styles?.award_ul}`}>
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
                              "awards"
                            );
                          }}
                          draggable
                          className={`${styles?.award_li}`}
                        >
                          <div
                            className={`${styles?.award_line}`}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "awards"
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
                              "awards"
                            );
                          }}
                          draggable
                          className={`${styles?.award_delete1} parent`}
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
                                "awards"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "awards"
                              )
                            }
                            className={`${styles?.award_delete} child`}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {rewardIndex === i && newBulletSection === "Awards" ? (
                  <>
                    <div className={`${styles?.award_div_input}`}>
                      <input
                        className={`${styles?.award_new_input}`} // Apply Tailwind CSS classes
                        onChange={(e) => setNewReward(e.target.value)}
                        value={newReward}
                        name="newReward"
                        id="newReward"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newReward,
                              "awards"
                            );
                            setNewReward("");
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
                              newReward,
                              "awards"
                            );
                            setNewReward("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewReward("");
                            setRewardIndex(-1);
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
      <AddItemToCustomSection recName="awards" />
    </>
  );
};

export default Award;
