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
        className={`${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`${styles?.education_h3} ${
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
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      <ul className={`${styles?.education_ul}`}>
        {educations.map((education: EducationType, i: number) => (
          <React.Fragment key={education?.id || i}>
            <div
              className={`${styles?.education_div} ${styles?.education_bg} group`}
              // style={{
              //   backgroundColor: customStyle?.education_bg,
              // }}
            >
              <li className={`${styles?.education_li} parent`}>
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
                className={`${styles?.education_delete}`}
              >
                {crossIcon1}
              </div>
              <li className={`${styles?.education_li_2}`}>
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
              <li className={`${styles?.education_li_italic}`}>
                <EditableField
                  value={`${education?.schoolName}`}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail({ schoolName: value }, i);
                  }}
                />
              </li>
              {(education.fromYear !== "" || education.toYear !== "") && (
                <li className={`${styles?.education_li_date}`}>
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
