"use client";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import { Reference as ReferenceType } from "@/store/userDataSlice";
import React from "react";

type Props = {
  heading: string;
  references: ReferenceType[];
  styles: any;
  customStyle?: any;
};

const Reference = ({ heading, references, styles, customStyle }: Props) => {
  const { handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={`  w-full h-0 border-[1px] !border-gray-500 mt-3 ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`references flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500 ${
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
          value={heading ? heading : "references"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                references: value,
              });
            }
          }}
        />
      </h3>
      <span
        className={`w-full h-0 border-[1px] !border-gray-500 mt-0 ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      <ul
        className={`flex flex-wrap w-full gap-3 pl-0 md:flex-row lg:flex-row`}
      >
        {references.map((rec: ReferenceType, i: number) => {
          return (
            <li
              key={i}
              className={`w-[45%] md:w-[30%] m-2 xs:m-0 relative border-transparent border-2 hover:border-dashed hover:border-gray-500 group`}
            >
              <Toolbar
                // addAchivement={() => {
                //   setNewWorkExperience(i)
                //   setNewBulletSection("References")
                // }}
                deleteExperience={() =>
                  handlers.handleDeleteOthers(i, "references")
                }
                // regenrateAchivements={() => handleRegenrate(rec, i)}
                // addNewLine={() => {
                //   handlers.handleAddOthersSpace(i, newAchievement, "references");
                //   setNewAchievement("");
                // }}
              >
                <div
                  className={styles?.reference_div}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", i.toString())
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOthers(e, i, "references")}
                  draggable
                >
                  <h2
                    className={`text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100`}
                  >
                    <EditableField
                      value={rec?.name}
                      style={{ width: "100%" }}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { name: value },
                          i,
                          "references"
                        );
                      }}
                    />
                  </h2>
                  <h2
                    className={`flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default`}
                  >
                    {rec?.position && (
                      <span className={`hover:shadow-md hover:bg-gray-100`}>
                        <EditableField
                          value={rec?.position}
                          onSave={(value: string) => {
                            handlers.handleSaveOthersDetail(
                              { position: value },
                              i,
                              "references"
                            );
                          }}
                        />
                      </span>
                    )}
                    |
                    <span className={`hover:shadow-md hover:bg-gray-100`}>
                      <EditableField
                        value={rec?.company}
                        onSave={(value: string) => {
                          handlers.handleSaveOthersDetail(
                            { company: value },
                            i,
                            "references"
                          );
                        }}
                      />
                    </span>
                  </h2>
                  <h2
                    className={`flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default`}
                  >
                    Contact Info:
                    {rec?.contactInformation && (
                      <span className={`hover:shadow-md hover:bg-gray-100`}>
                        <EditableField
                          value={rec.contactInformation}
                          onSave={(value: string) => {
                            handlers.handleSaveOthersDetail(
                              { contactInformation: value },
                              i,
                              "references"
                            );
                          }}
                        />
                      </span>
                    )}
                  </h2>
                </div>
              </Toolbar>
            </li>
          );
        })}
      </ul>
      <AddItemToCustomSection recName="references" />
    </>
  );
};

export default Reference;
