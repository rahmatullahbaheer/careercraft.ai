"use client";
import React, { useEffect, useState, Suspense } from "react";
import PromptBox from "../components/utils/PromptBox";
import { API_ENDPOINT } from "../../../services/api-endpoints";
import { getAPI, postAPI } from "../../../services/index";

const ResumePromptContent = () => {
  const [promptsLoading, setPromptsLoading] = useState(true);
  const [prompts, setPrompts] = useState([]);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setPromptsLoading(true);
        const res = await getAPI("/prompts?type=resume");

        if (res?.status === 200) {
          setPromptsLoading(false);
          setPrompts(res?.data?.result);
        }
      } catch (error) {
        console.error("Failed to fetch resume prompts", error);
      } finally {
        setPromptsLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const handleSave = async (name, val, id) => {
    if (name) {
      try {
        setUpdating(name);
        await postAPI("/prompts", {
          type: "resume",
          name,
          value: val,
          active: true,
          id,
        });
      } catch (error) {
        console.error("Error saving prompt:", error);
      } finally {
        setUpdating("");
      }
    }
  };

  return (
    <div>
      <div className="w-96 h-8 mb-6">
        <div className="justify-start text-zinc-700/90 text-2xl font-medium font-['Inter'] capitalize leading-loose">
          Resume Prompts Configuration
        </div>
      </div>

      {promptsLoading ? (
        <p>Loading prompts...</p>
      ) : (
        <div className="flex gap-5 flex-wrap">
          <PromptBox
            name={prompts[3].name}
            title="Summary"
            id={prompts[3]?._id}
            description={prompts[3].value}
            onSave={handleSave}
            updating={updating === prompts[3].name}
          />
          <PromptBox
            name={prompts[8].name}
            title="Summary (Job Description)"
            id={prompts[8]?._id}
            description={prompts[8].value}
            onSave={handleSave}
            updating={updating === prompts[8].name}
          />
          <PromptBox
            name={prompts[1].name}
            title="One Line Slogan"
            id={prompts[1]?._id}
            description={prompts[1].value}
            onSave={handleSave}
            updating={updating === prompts[1].name}
          />
          <PromptBox
            name={prompts[4].name}
            title="Job Description Generator (for rewriting work experience)"
            id={prompts[4]?._id}
            description={prompts[4].value}
            onSave={handleSave}
            updating={updating === prompts[4].name}
          />
          <PromptBox
            name={prompts[7].name}
            title="Job Description Generator (for quantifying work experience)"
            id={prompts[7]?._id}
            description={prompts[7].value}
            onSave={handleSave}
            updating={updating === prompts[7].name}
          />
          <PromptBox
            name={prompts[0].name}
            title="Primary skills"
            id={prompts[0]?._id}
            description={prompts[0].value}
            onSave={handleSave}
            updating={updating === prompts[0].name}
          />
          <PromptBox
            name={prompts[9].name}
            title="Primary skills for job description"
            id={prompts[9]?._id}
            description={prompts[9].value}
            onSave={handleSave}
            updating={updating === prompts[9].name}
          />
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumePromptContent />
    </Suspense>
  );
};

export default Page;
