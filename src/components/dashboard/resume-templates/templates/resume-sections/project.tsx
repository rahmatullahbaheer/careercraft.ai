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
import { Project as ProjectType} from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  projects: ProjectType[];
  customStyle?: any;
  styles?: any;
};

const Project = ({ heading, projects, styles, customStyle }: Props) => {
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
        className={`projects ${styles?.project_h3}  ${
          customStyle?.centeredHeading ? "justify-center" : ""
        } ${styles.bgColor} `}
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
              d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        <EditableField
          value={heading ? heading : "projects"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                projects: value,
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
      {projects.map((rec: ProjectType, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setRewardIndex(i);
              setNewBulletSection("Projects");
            }}
            deleteExperience={() => handlers.handleDeleteOthers(i, "projects")}
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newReward, "projects");
              setNewReward("");
            }}
          >
            <div
              key={i}
              className={`${styles?.project_div}`}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "projects")}
              draggable
            >
              <h2 className={`${styles?.project_h2}`}>
                <EditableField
                  value={rec?.title}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveOthersDetail(
                      { title: value },
                      i,
                      "projects"
                    );
                  }}
                />
              </h2>

              <div className="px-4 py-1">
                {rec?.description && (
                  <ul className={styles?.project_ul}>
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
                              "projects"
                            );
                          }}
                          draggable
                          className={`group ${styles?.project_li}`}
                        >
                          <div
                            className={styles?.project_line}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "projects"
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
                              "projects"
                            );
                          }}
                          draggable
                          className={`parent ${styles?.project_delete1}`}
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
                                "projects"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "projects"
                              )
                            }
                            className={`${styles?.project_delete} child`}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {rewardIndex === i && newBulletSection === "Projects" ? (
                  <>
                    <div className={styles?.project_div_input}>
                      <input
                        className={styles?.project_new_input} // Apply Tailwind CSS classes
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
                              "projects"
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
                              "projects"
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
      <AddItemToCustomSection recName="projects" />
    </>
  );
};

export default Project;
