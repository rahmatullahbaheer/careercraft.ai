"use client";
import EditableField from "@/components/dashboard/EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  name: string;
  jobTitle: string;
  styles: any;
  conditionStyleHeader: any;
};

const Header = ({ name, jobTitle, styles, conditionStyleHeader }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <h2 className={`${styles?.full_Name_Style}`}>
        <EditableField
          value={name ? name : "FULL NAME"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== name) {
              updateSaveHook.updateAndSaveName(value);
            }
          }}
        />
      </h2>
      <h3 className={`${styles?.jobTitle}`}>
        <EditableField
          value={jobTitle ? jobTitle : "JOB TITLE"}
          onSave={(value: string) => {
            if (value !== jobTitle) {
              updateSaveHook.updateAndSaveJobTitle(value);
            }
          }}
        />
      </h3>
    </>
  );
};

export default Header;
