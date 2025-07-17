"use client";
import React, { useEffect, useRef, useState } from "react";

import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import TemplateSlider from "./templateSlider";
export type Template = {
  id: number;
  title: string;
  tags: string[];
  template: (props: any) => React.ReactNode;
  category: "premium" | "freemium";
  preview: string;
  active: boolean;
};

type Tabs = {
  tab: string;
  title: string;
};

const tabs: Tabs[] = [
  {
    tab: "all-templates",

    title: "All",
  },
  {
    tab: "classic-executive",

    title: "Classic Executive",
  },
  {
    tab: "creative-colorful",

    title: "Creative/Colorful",
  },
];

const Templates = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);
  const [templates, setTemplates] = useState<Template[]>([]);

  const filterTemplates = () => {
    if (activeTab.tab === "all-templates") {
      const activeTemplate = ALL_TEMPLATES.filter(
        (template) => template.active === true
      );

      setTemplates(activeTemplate);
    } else {
      let _templates: Template[] = ALL_TEMPLATES.filter((template) => {
        if (template.tags.includes(activeTab.tab) && template.active) {
          return template;
        }
      });
      setTemplates(_templates);
    }
  };
  useEffect(() => {
    console.log("templates");
  }, [templates]);
  useEffect(() => {
    filterTemplates();
  }, []);
  useEffect(() => {
    filterTemplates();
  }, [activeTab]);

  return (
    <div className="ml-0 lg:ml-[234px]  ">
      <div className="flex flex-row items-center justify-center gap-2 p-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-2 md:px-4 py-2  text-xs md:text-sm rounded-full border-[2px] border-gray-600 ${
              activeTab.tab === tab.tab ? "bg-black text-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {templates && <TemplateSlider templates={templates} />}
    </div>
  );
};

export default Templates;
