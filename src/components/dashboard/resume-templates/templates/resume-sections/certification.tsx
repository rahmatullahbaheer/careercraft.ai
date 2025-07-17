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
import { Certification as CertificationType } from "@/store/userDataSlice";
import React, { useState } from "react";

type Props = {
  heading: string;
  certificates: CertificationType[];
  styles: any;
  customStyle?: any;
  iconColor?: any;
};

const Certification = ({
  heading,
  certificates,
  styles,
  customStyle,
  iconColor,
}: Props) => {
  const [certificationIndex, setCertificationIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newCertification, setNewCertification] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const { updateSaveHook } = useUpdateAndSave();
  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`certifications ${styles?.certification_h3} ${
          customStyle?.centeredHeading ? "justify-center" : ""
        }
          ${customStyle?.bgColor}
          ${styles?.underline ? "underline" : null}
          ${styles?.bgColor}
        `}
      >
        {!customStyle?.hideIcons && (
          <div className={`${iconColor}`}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className=""
              fill="currentColor"
            >
              <title>certificate-ribbon-solid</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <g>
                    <circle cx="24" cy="18" r="7" />
                    <path d="M40,18A16,16,0,1,0,15,31.2V43.9a2,2,0,0,0,3.1,1.7L24,41l5.9,4.6A2,2,0,0,0,33,43.9V31.2A16,16,0,0,0,40,18ZM12,18A12,12,0,1,1,24,30,12,12,0,0,1,12,18Z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        )}

        <EditableField
          value={heading ? heading : "certifications"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                certifications: value,
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
      {certificates.map((rec: any, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setCertificationIndex(i);
              setNewBulletSection("Certifications");
            }}
            deleteExperience={() =>
              handlers.handleDeleteOthers(i, "certifications")
            }
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(
                i,
                newCertification,
                "certifications"
              );
              setNewCertification("");
            }}
          >
            <div
              key={i}
              className={styles?.certification_div}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "certifications")}
              draggable
            >
              <h2 className={styles?.certification_h1}>
                <EditableField
                  value={rec?.title}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveOthersDetail(
                      { title: value },
                      i,
                      "certifications"
                    );
                  }}
                />
              </h2>
              <h2 className={styles?.certification_h2_1}>
                {rec.date && (
                  <span className="hover:shadow-md hover:bg-gray-100">
                    <EditableField
                      value={`${formatDate(rec?.date)}`}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { date: value },
                          i,
                          "certifications"
                        );
                      }}
                    />
                  </span>
                )}
                |
                <span className={styles?.certification_date}>
                  <EditableField
                    value={rec?.issuingOrganization}
                    onSave={(value: string) => {
                      handlers.handleSaveOthersDetail(
                        { issuingOrganization: value },
                        i,
                        "certifications"
                      );
                    }}
                  />
                </span>
              </h2>
              <div className="px-4 py-1">
                {rec?.description && (
                  <ul className={styles?.certification_ul}>
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
                              "certifications"
                            );
                          }}
                          draggable
                          className={`group ${styles?.certification_li}`}
                        >
                          <div
                            className={styles?.certification_line}
                            onClick={() => {
                              handlers.handleRemoveExtraOthersSpace(
                                i,
                                ind,
                                "certifications"
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
                              "certifications"
                            );
                          }}
                          draggable
                          className={`parent ${styles?.certification_delete1}`}
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
                                "certifications"
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteOthersAchivement(
                                i,
                                ind,
                                "certifications"
                              )
                            }
                            className={`${styles?.certification_delete} child`}
                          >
                            {crossIcon1}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {certificationIndex === i &&
                newBulletSection === "Certifications" ? (
                  <>
                    <div className={styles?.certification_div_input}>
                      <input
                        className={styles?.certification_new_input} // Apply Tailwind CSS classes
                        onChange={(e) => setNewCertification(e.target.value)}
                        value={newCertification}
                        name="newCertification"
                        id="newCertification"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newCertification,
                              "certifications"
                            );
                            setNewCertification("");
                          }
                        }}
                      />
                      <div className="flex w-full gap-2 my-2">
                        <button
                          className="achievement-save-btn"
                          onClick={() => {
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newCertification,
                              "certifications"
                            );
                            setNewCertification("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewCertification("");
                            setCertificationIndex(-1);
                            setNewBulletSection(null);
                          }}
                          className="achievement-delete-btn"
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
      <AddItemToCustomSection recName="certifications" />
    </>
  );
};

export default Certification;
