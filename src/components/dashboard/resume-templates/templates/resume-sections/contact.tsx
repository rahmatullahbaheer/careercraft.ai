"use client";
import EditableField from "@/components/dashboard/EditableField";
import {
  emailIconFilled,
  phoneIconFilled,
  linkedInIconFilled,
  homeIconFilled,
  resumeContactIcon,
} from "@/helpers/iconsProvider";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  contact: {
    phone: string;
    email: string;
    linkedIn: string;
    address: string;
  };
  styles: any;
  iconColor?: any;
};

const Contact = ({ contact, styles, iconColor }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <ul
        className={`${styles?.contact_ul}`}
        // style={{ backgroundColor: color_second }}
      >
        <li className={`${styles?.contact_li}`}>
          <div className={`bg-transparent ${iconColor ? iconColor : ""} `}>
            {phoneIconFilled}
          </div>

          <EditableField
            value={contact?.phone ? contact?.phone : "(555) 555-1234"}
            onSave={(value: string) => {
              if (value !== contact?.phone) {
                updateSaveHook.updateAndSaveBasicInfo({ phone: value });
              }
            }}
          />
        </li>
        <li className={`${styles?.contact_li} `}>
          <div className={`bg-transparent ${iconColor ? iconColor : ""} `}>
            {emailIconFilled}
          </div>

          <EditableField
            value={contact?.email ? contact?.email : "your@email.com"}
            onSave={(value: string) => {
              if (value !== contact?.email) {
                updateSaveHook.updateAndSaveBasicInfo({ email: value });
              }
            }}
          />
        </li>

        <li className={`${styles?.contact_li} `}>
          <div className={`bg-transparent ${iconColor ? iconColor : ""} `}>
            {linkedInIconFilled}
          </div>
          <EditableField
            value={
              contact?.linkedIn
                ? contact?.linkedIn
                : "https://www.linkedin.com/"
            }
            // overrideValue={name ? name : "Full Name"}
            onSave={(value: string) => {
              if (value !== contact.linkedIn) {
                updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
              }
            }}
          />
        </li>
        <li className={`${styles?.contact_li} `}>
          <div className={`bg-transparent ${iconColor ? iconColor : ""} `}>
            {homeIconFilled}
          </div>

          <EditableField
            value={contact?.address.trim() ? contact.address : "Address"}
            onSave={(value: string) => {
              if (value !== contact.address) {
                updateSaveHook.updateAndSaveBasicInfo({ address: value });
              }
            }}
          />
        </li>
      </ul>
    </>
  );
};

export default Contact;
