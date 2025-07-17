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
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <div className={`languages ${rounded_style ? rounded_style : ""}`}>
        <h3
          className={`${styles?.language_h3} ${
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
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      <ul className={`${styles?.language_ul} `}>
        {languages.map((rec: LanguageType, i: number) => {
          return (
            <li key={i} className={`${styles?.language_li}`}>
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
                  className={`${styles?.language_div} border`}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", i.toString())
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOthers(e, i, "languages")}
                  draggable
                >
                  <h2 className={`${styles?.language_h1}`}>
                    <EditableField
                      value={rec?.name}
                      style={{ width: "100%" }}
                      onSave={(value: string) => {
                        handlers.handleSaveOthersDetail(
                          { name: value },
                          i,
                          "languages"
                        );
                      }}
                    />
                  </h2>
                  -
                  <h2 className={`${styles?.language_h2_1}`}>
                    {rec?.proficiency && (
                      <span className={`${styles?.language_date}`}>
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
