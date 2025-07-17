"use client";
import Toolbar from "@/components/dashboard/Toolbar";
import React, { useState } from "react";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import EditableField from "@/components/dashboard/EditableField";
import useHandler from "@/hooks/useHandler";
import { crossIcon1, resumeSkillsIcon } from "@/helpers/iconsProvider";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import Loader from "@/components/common/Loader";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

type Props = {
  heading: string;
  skills: string[];
  styles: any;
  customStyle?: any;
  rounded_style?: any;
};
const Skill = ({
  heading,
  skills,
  styles,
  customStyle,
  rounded_style,
}: Props) => {
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const { updateSaveHook } = useUpdateAndSave();

  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const { addPrimarySkill } = useAddPrimarySkill();

  const { handleDropPrimary } = useDragAndDrop();
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  const { handlers } = useHandler();
  return (
    <>
      {skills && skills.length > 0 && (
        <>
          <span
            className={`${styles?.span1} ${
              customStyle?.borderTopBottom ? "!block" : "hidden"
            }`}
          ></span>
          <div className={` ${rounded_style ? rounded_style : ""} `}>
            <h2 className={` ${styles?.skill_heading} `}>
              {!customStyle?.hideIcons && resumeSkillsIcon}
              <EditableField
                value={heading ? heading : "Skills"}
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== heading) {
                    updateSaveHook.updateAndSaveHeadings({
                      primarySkills: value,
                    });
                  }
                }}
              />
            </h2>
          </div>

          <span
            className={`${styles?.span2} ${
              customStyle?.borderTopBottom || customStyle?.borderBottom
                ? "!block"
                : "hidden"
            }`}
          ></span>
        </>
      )}
      {skills && skills.length > 0 && !regenerating ? (
        <Toolbar addSkill={handleAddSkills} regenerateSkills={getPrimarySkills}>
          <ul className={`${styles?.skill_ul} mt-2 !list-disc`}>
            {skills.map((skill: string, i: number) => (
              <li
                className={`${styles?.skill_li} parent 
                `}
                key={i}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", i.toString())
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropPrimary(e, i)}
                draggable
              >
                <div className="flex flex-row items-center justify-between">
                  <EditableField
                    value={skill}
                    onSave={(value: string) => {
                      handlers.handleUpdateSkill(value, i);
                    }}
                  />
                  <div
                    onClick={() => handlers.handleDeleteSkill(i)}
                    className="w-4 h-4 cursor-pointer child"
                  >
                    {crossIcon1}
                  </div>
                </div>
              </li>
            ))}
            {newPrimarySkill ? (
              <>
                <div className={`${styles?.skill_New}`}>
                  <input
                    type="text"
                    value={primarySkill}
                    placeholder="Please add Skill"
                    className="skill-input-temp-2"
                    autoFocus
                    onChange={(e) => setPrimarySkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSaveSkills();
                      }
                    }}
                  />
                  <button className={`skill-Save`} onClick={handleSaveSkills}>
                    save
                  </button>
                </div>
                <button
                  onClick={() => {
                    setNewPrimarySkill(false);
                  }}
                  className="skill-cancel"
                >
                  Cancel
                </button>
              </>
            ) : (
              " "
            )}
          </ul>
        </Toolbar>
      ) : (
        <div className="text-center">
          <div role="status">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default Skill;
