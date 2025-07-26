"use client";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import EditableField from "@/components/dashboard/EditableField";
import { crossIcon1, resumeEductionIcon } from "@/helpers/iconsProvider";
import useHandler from "@/hooks/useHandler";

import React, { useState } from "react";
import { Education as EducationType } from "@/store/userDataSlice";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

type Props = {
  heading: string;
  educations: EducationType[];
  styles: any;
  customStyle: any;
};
const Education = ({ heading, educations, styles, customStyle }: Props) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={`w-full h-0 border-[1px] !border-gray-500 mt-3 ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`flex flex-row my-1 items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ${
          customStyle?.centeredHeading ? "justify-center" : ""
        } ${styles?.bgColor}`}
      >
        {!customStyle?.hideIcons && resumeEductionIcon}

        <EditableField
          value={heading ? heading : "education"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                education: value,
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
        className={`grid grid-cols-3 gap-2 xs:grid-cols-2 md:grid-cols-3 !mt-4`}
      >
        {educations.map((education: EducationType, i: number) => (
          <React.Fragment key={education?.id || i}>
            <div
              className={`relative px-4 py-2  border-2 border-transparent rounded-md  hover:border-dashed hover:border-gray-500 bg-gray-300 group`}
              // style={{
              //   backgroundColor: customStyle?.education_bg,
              // }}
            >
              <li
                className={`flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move  hover:border-2 hover:bg-gray-100 parent`}
              >
                <EditableField
                  value={education?.educationLevel}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail(
                      { educationLevel: value },
                      i
                    );
                  }}
                />
              </li>
              <div
                onClick={() => {
                  setConfirmationModal(true);
                  setDeleteIndex(i);
                }}
                className={`absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2`}
              >
                {crossIcon1}
              </div>
              <li
                className={`text-xs font-semibold hover:shadow-md hover:bg-gray-100`}
              >
                <EditableField
                  value={`${education?.fieldOfStudy}`}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail(
                      { fieldOfStudy: value },
                      i
                    );
                  }}
                />{" "}
              </li>
              <li
                className={`text-xs italic text-gray-800 hover:shadow-md hover:bg-gray-100`}
              >
                <EditableField
                  value={`${education?.schoolName}`}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail({ schoolName: value }, i);
                  }}
                />
              </li>
              {(education.fromYear !== "" || education.toYear !== "") && (
                <li className={`flex mb-4 text-xs italic text-gray-700`}>
                  {education.fromMonth && (
                    <EditableField
                      value={`${education?.fromMonth}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail(
                          { fromMonth: value },
                          i
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
                          i
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
                          i
                        );
                      }}
                    />
                  )}
                  {education.toMonth && <span>&nbsp;</span>}
                  {education.toYear && !education.isContinue && (
                    <EditableField
                      value={`${education?.toYear}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail({ toYear: value }, i);
                      }}
                    />
                  )}
                  {education.isContinue && (
                    <EditableField
                      value={`${education?.isContinue && "Present"}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail({ toYear: value }, i);
                        handlers.handleSaveEductionDetail(
                          { isContinue: false },
                          i
                        );
                      }}
                    />
                  )}
                </li>
              )}
            </div>
            {confirmationModal && (
              <DeleteConfirmationModal
                message="Are you sure you want to delete ?"
                onConfirm={() => {
                  setConfirmationModal(false);
                  handlers.handleDeleteEductionDetail(deleteIndex);
                }}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Education;
