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
import { Publication as PublicationType } from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  publications: PublicationType[];
  styles: any;
  customStyle?: any;
};

const Publication = ({ heading, publications, styles, customStyle }: Props) => {
  const [pulicationIndex, setPulicationIndex] = useState<number>();
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();
  const [newPublication, setNewPublication] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);

  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`publications ${styles?.publication_h3}  ${
          customStyle?.centeredHeading ? "justify-center" : ""
        }  ${styles?.bgColor} `}
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
              d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 1 2 15.25V3.5Zm3.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 3a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 5.75A.75.75 0 0 1 5.75 5h4.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 8.25v-2.5Z"
              clipRule="evenodd"
            />
            <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 1 0 2.5 0V8a1.5 1.5 0 0 0-1.5-1.5Z" />
          </svg>
        )}

        <EditableField
          value={heading ? heading : "publications"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                publications: value,
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
      {publications.map((rec: PublicationType, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setPulicationIndex(i);
              setNewBulletSection("Publications");
            }}
            deleteExperience={() =>
              handlers.handleDeleteOthers(i, "publications")
            }
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newPublication, "publications");
              setNewPublication("");
            }}
          >
            <div
              key={i}
              className={styles?.publication_div}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "publications")}
              draggable
            >
              <h2 className={styles?.publication_h2}>
                <EditableField
                  value={rec?.title}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveOthersDetail(
                      { title: value },
                      i,
                      "publications"
                    );
                  }}
                />
              </h2>
              <h2 className={styles?.publication_h2_1}>
                {rec.date && (
                  <span className={styles?.publication_date}>
                    <EditableField
                      value={`${formatDate(rec?.date)}`}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { date: value },
                          i,
                          "publications"
                        );
                      }}
                    />
                  </span>
                )}
                |
                <span className={styles?.publication_date}>
                  <EditableField
                    value={rec?.publisher}
                    onSave={(value: string) => {
                      handlers.handleSaveOthersDetail(
                        { publisher: value },
                        i,
                        "publications"
                      );
                    }}
                  />
                </span>
              </h2>
              <div className="px-4 py-1">
                {rec?.description && (
                  <ul className={styles?.publication_ul}>
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
                              "publications"
                            );
                          }}
                          draggable
                          className={`group ${styles?.publication_li}`}
                        >
                          <div
                            className={styles?.publication_line}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "publications"
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
                              "publications"
                            );
                          }}
                          draggable
                          className={`parent ${styles?.publication_delete1}`}
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
                                "publications"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "publications"
                              )
                            }
                            className={`${styles?.publication_delete} child`}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {pulicationIndex === i &&
                newBulletSection === "Publications" ? (
                  <>
                    <div className={styles?.publication_div_input}>
                      <input
                        className={styles?.publication_new_input} // Apply Tailwind CSS classes
                        onChange={(e) => setNewPublication(e.target.value)}
                        value={newPublication}
                        name="newPublication"
                        id="newPublication"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newPublication,
                              "publications"
                            );
                            setNewPublication("");
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
                              newPublication,
                              "publications"
                            );
                            setNewPublication("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewPublication("");
                            setPulicationIndex(-1);
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
      <AddItemToCustomSection recName="publications" />
    </>
  );
};

export default Publication;
