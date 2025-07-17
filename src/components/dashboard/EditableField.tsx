"use client";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const normalizeValue = (value: string = " ") => {
  if (typeof value === "string") {
    // Remove line breaks and multiple whitespaces
    return value.replace(/\n/g, " ").replace(/\s\s+/g, " ").trim();
  } else {
    return "";
  }
};
const EditableField = ({
  value,
  type,
  className,
  onSave,
  style,
  text,
  profile=false,
}: {
  value: string | undefined;
  type?: string;
  style?: any;
  className?: any;
  onSave: (value: string) => void;
  text?: any;
  profile?: boolean; // indicates whether the field is for profile details
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let new_value: string | undefined = normalizeValue(value);
  const [editedValue, setEditedValue] = useState<string>(new_value);
  const [inputWidth, setInputWidth] = useState<number|null>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<number|null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLInputElement>(null);
  const userData = useSelector((state: RootState) => state.userData);
  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedValue);
  };

  useEffect(() => {
    if (value !== editedValue) {
      setEditedValue(normalizeValue(value));
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textAreaHeight}px`;
    }
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth}px`; // Set width to scrollWidth
    }
  }, [value, isEditing]);
  useEffect(() => {
    if (spanRef.current?.scrollWidth) {
      setInputWidth(spanRef.current?.scrollWidth + 10);
      setTextAreaHeight(spanRef.current?.scrollHeight + 1);
    }
  }, [spanRef.current?.scrollWidth]);
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const len = editedValue.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);
  return (
    <>
      <span
        onClick={() => {
          setIsEditing(true);
        }}
      >
        {isEditing ? (
          <>
            {type === "textarea" ? (
              <textarea
                ref={textareaRef}
                value={editedValue}
                className={`bg-transparent w-full hover:cursor-text ${profile?"p-2":""} ${className} resize-none overflow-y-hidden`}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setEditedValue(e.target.value)
                }
                autoFocus
                onBlur={handleBlur}
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={editedValue}
                className={`bg-transparent pr-2 hover:cursor-text ${className}`}
                style={style ? style : {}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedValue(e.target.value)}
                autoFocus
                onBlur={handleBlur}
              />
            )}
          </>
        ) : (
          <>
            {/* <a
              href={value}
              className=" xs:hidden md:hidden hover:cursor-text text-justify"
              title="Click to Edit"
            >
              {value}
            </a> */}
            <span
              ref={spanRef}
              className={`w-fit xs:block md:block hover:cursor-text hover:shadow-md ${profile? "p-2 hover:bg-transparent dark:border-[#2e2f45] rounded-lg hover:border-dashed border-2 hover:border-2":"hover:bg-gray-100"}`}
              title="Click to Edit"
              style={{ textAlign: text }}
            >
              {value}
            </span>
          </>
        )}
      </span>
    </>
  );
};

export default EditableField;
