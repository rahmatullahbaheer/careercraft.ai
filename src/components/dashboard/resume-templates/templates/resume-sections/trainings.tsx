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
import { Training as TrainingType } from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  trainings: TrainingType[];
  styles: any;
  customStyle?: any;
};
const Training = ({ heading, trainings, styles, customStyle }: Props) => {
  const [trainingIndex, setTrainingIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newTraining, setNewTraining] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const { updateSaveHook } = useUpdateAndSave();

  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }
         
        `}
      ></span>

      <h3
        className={`trainings ${styles?.training_h3} ${
          customStyle?.centeredHeading ? "justify-center" : ""
        }
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
              d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        <EditableField
          value={heading ? heading : "trainings"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                trainings: value,
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
      {trainings.map((rec: any, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setTrainingIndex(i);
              setNewBulletSection("Trainings");
            }}
            deleteExperience={() => handlers.handleDeleteOthers(i, "trainings")}
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newTraining, "trainings");
              setNewTraining("");
            }}
          >
            <div
              key={i}
              className={`${styles?.training_div}`}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "trainings")}
              draggable
            >
              <h2 className={`${styles?.training_h1}`}>
                <EditableField
                  value={rec?.position}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveOthersDetail(
                      { position: value },
                      i,
                      "trainings"
                    );
                  }}
                />
              </h2>
              <h2 className={`${styles?.training_h2_1}`}>
                {rec.startDate && (
                  <span className={`${styles?.training_date}`}>
                    <EditableField
                      value={`${formatDate(rec?.startDate)}`}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { startDate: value },
                          i,
                          "trainings"
                        );
                      }}
                    />
                  </span>
                )}
                -
                {rec.endDate && (
                  <span className={`${styles?.training_date}`}>
                    <EditableField
                      value={`${formatDate(rec?.endDate)}`}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { endDate: value },
                          i,
                          "trainings"
                        );
                      }}
                    />
                  </span>
                )}
                |
                <span className={`${styles?.training_date}`}>
                  <EditableField
                    value={rec?.company}
                    onSave={(value: string) => {
                      handlers.handleSaveOthersDetail(
                        { company: value },
                        i,
                        "trainings"
                      );
                    }}
                  />
                </span>
              </h2>
              <div className="px-4 py-1">
                {rec?.description && (
                  <ul className={`${styles?.training_ul}`}>
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
                              "trainings"
                            );
                          }}
                          draggable
                          className={`${styles?.training_li} group`}
                        >
                          <div
                            className={`${styles?.training_line}`}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "trainings"
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
                              "trainings"
                            );
                          }}
                          draggable
                          className={`parent ${styles?.training_delete1}`}
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
                                "trainings"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "trainings"
                              )
                            }
                            className={`${styles?.training_delete} child`}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {trainingIndex === i && newBulletSection === "Trainings" ? (
                  <>
                    <div className={`${styles?.training_div_input}`}>
                      <input
                        className={`${styles?.training_new_input}`} // Apply Tailwind CSS classes
                        onChange={(e) => setNewTraining(e.target.value)}
                        value={newTraining}
                        name="newTraining"
                        id="newTraining"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newTraining,
                              "trainings"
                            );
                            setNewTraining("");
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
                              newTraining,
                              "trainings"
                            );
                            setNewTraining("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewTraining("");
                            setTrainingIndex(-1);
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
      <AddItemToCustomSection recName="trainings" />
    </>
  );
};

export default Training;
