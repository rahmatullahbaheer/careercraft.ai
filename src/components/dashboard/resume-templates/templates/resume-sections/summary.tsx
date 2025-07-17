"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React, { useState } from "react";
import useGetSummary from "@/hooks/useGetSummary";
import { resumeSummaryIcon } from "@/helpers/iconsProvider";

type Props = {
  heading: string;
  summary: any;
  customStyle?: any;
  styles: any;
};

const Summary = ({ summary, heading, customStyle, styles }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  return (
    <>
      <span
        className={`${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h2
        className={`${styles?.publication_h3} ${customStyle?.bgColor} ${
          customStyle?.centeredHeading ? "!justify-center" : ""
        } ${styles?.bgColor}`}
      >
        {!customStyle?.hideIcons && resumeSummaryIcon}
        <EditableField
          value={heading ? heading : "Execuitve summary"}
          style={{ width: "fit-content " }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                summary: value,
              });
            }
          }}
        />
      </h2>
      <span
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }  mb-2`}
      ></span>
      <Toolbar regenrateSummary={getSummary}>
        <div className={`${styles?.summary_text}`}>
          <EditableField
            type="textarea"
            text="justify"
            value={
              summary !== "" ? (
                summary
              ) : streamedSummaryData ? (
                streamedSummaryData
              ) : (
                <div className="text-center ">
                  <div role="status">
                    <Loader />
                  </div>
                </div>
              )
            }
            onSave={(value: string) => {
              updateSaveHook.updateAndSaveSummary(value);
            }}
          />
        </div>
      </Toolbar>
    </>
  );
};

export default Summary;
