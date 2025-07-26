"use client";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import React from "react";
import EditableField from "../../../EditableField";
import Toolbar from "../../../Toolbar";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import { Language as LanguageType } from "@/store/userDataSlice";

type Props = {
  heading: string;
  languages: LanguageType[];
  styles: any;
  customStyle?: any;
  rounded_style?: any;
};

const Language = ({
  heading,
  languages,
  styles,
  customStyle,
  rounded_style,
}: Props) => {
  const { handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={`w-full h-0 border-[1px] !border-gray-500 mt-3 ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <div className={`languages ${rounded_style ? rounded_style : ""}`}>
        <h3
          className={`flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500 ${
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
              fill="#000"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545 19.381 19.381 0 0 1 7 9.56a19.418 19.418 0 0 1-1.002-2.05.75.75 0 0 0-1.384.577 20.935 20.935 0 0 0 1.492 2.91 19.613 19.613 0 0 1-3.828 4.154.75.75 0 1 0 .945 1.164A21.116 21.116 0 0 0 7 12.331c.095.132.192.262.29.391a.75.75 0 0 0 1.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 0 0 2.333-5.332c.31.031.618.068.924.108a.75.75 0 0 0 .198-1.487 32.832 32.832 0 0 0-3.599-.278V2.75Z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 8a.75.75 0 0 1 .671.415l4.25 8.5a.75.75 0 1 1-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 1 1-1.342-.67l4.25-8.5A.75.75 0 0 1 13 8Zm2.037 6.5L13 10.427 10.964 14.5h4.073Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <EditableField
            value={heading ? heading : "languages"}
            style={{ width: "fit-content" }}
            onSave={(value: string) => {
              if (value !== heading) {
                updateSaveHook.updateAndSaveHeadings({
                  languages: value,
                });
              }
            }}
          />
        </h3>
      </div>
      <span
        className={`w-full h-0 border-[1px] !border-gray-500 mt-0 ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      <ul
        className={`flex flex-wrap w-full gap-3 pl-0 md:flex-row lg:flex-row `}
      >
        {languages.map((rec: LanguageType, i: number) => {
          return (
            <li
              key={i}
              className={`w-[45%] md:w-[30%] m-2 xs:m-0 relative border-transparent border-2 hover:border-dashed hover:border-gray-500`}
            >
              <Toolbar
                // addAchivement={() => setNewWorkExperience(i)}
                deleteExperience={() =>
                  handlers.handleDeleteOthers(i, "languages")
                }
                // regenrateAchivements={() => handleRegenrate(rec, i)}
                // addNewLine={() => {
                //   handlers.handleAddSpace(i, newAchievement);
                //   setNewAchievement("");
                // }}
              >
                <div
                  className={`border-2 border-transparent md:w-full flex items-center gap-2 hover:cursor-move `}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", i.toString())
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOthers(e, i, "languages")}
                  draggable
                >
                  <h2
                    className={`text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100`}
                  >
                    <EditableField
                      value={rec?.language}
                      style={{ width: "100%" }}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { language: value },
                          i,
                          "languages"
                        );
                      }}
                    />
                  </h2>
                  -
                  <h2
                    className={`flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default`}
                  >
                    {rec?.proficiency && (
                      <span className={`hover:shadow-md hover:bg-gray-100`}>
                        <EditableField
                          value={rec.proficiency}
                          onSave={(value: string) => {
                            handlers.handleSaveOthersDetail(
                              { proficiency: value },
                              i,
                              "languages"
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
      <AddItemToCustomSection recName="languages" />
    </>
  );
};

export default Language;
