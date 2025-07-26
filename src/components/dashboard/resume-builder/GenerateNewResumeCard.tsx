"use client";
import { memo, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "@/store/resumeSlice";
import { useTourContext } from "@/context/TourContext";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";

interface Props {
  // getConsent: () => void;
  handleGenerate: () => Promise<void>;
  jobId?: any;
}
const GenerateResume = ({ handleGenerate, jobId }: Props) => {
  const radiosResumeType: { labelText: string; value: string }[] = [
    {
      labelText: "Generate Basic Resume",
      value: "resume-basic",
    },
    {
      labelText: "Generate For Job Title",
      value: "resume-job-title",
    },
  ];

  const [resumeType, setResumeType] = useState<
    "resume-basic" | "resume-job-title" | "resume-job-description"
  >(jobId ? "resume-job-description" : "resume-job-title");
  useEffect(() => {
    if (jobId) {
      setResumeType("resume-job-description");
      axios
        .get(`/api/deo/?findOne=${jobId}`)
        .then((resp) => {
          console.log(resp.data.data.jobDescription);
          dispatch(
            setState({
              name: "jobDescription",
              value: htmlToPlainText(resp.data.data.jobDescription),
            })
          );
          // setSingleJob(resp.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jobId]);

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.resume.state);
  const memoizedState = useMemo(() => state, [state]);
  const { resumeElementRef } = useTourContext();

  useEffect(() => {
    if (!jobId) {
      setResumeType(memoizedState.resumeType);
    }
  }, [memoizedState, jobId]);
  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (resumeElementRef.current) {
          resumeElementRef.current = ref;
        }
      }}
      className="bg-white dark:bg-[#17151b] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6"
    >
      {/* header */}
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Generate New Resume
        </h3>
      </div>

      {/* form */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Resume Type
            </h4>
            <div className="flex flex-col gap-3">
              {radiosResumeType.map(
                ({
                  labelText,
                  value,
                }: {
                  labelText: string;
                  value: string;
                }) => (
                  <div className="flex items-center gap-3" key={value}>
                    <button
                      onClick={() => {
                        // Toggle functionality - if clicking the same button, unselect it
                        if (resumeType === value) {
                          // Toggle off - reset to basic resume type
                          setResumeType("resume-basic");
                          dispatch(
                            setState({
                              name: "resumeType",
                              value: "resume-basic",
                            })
                          );
                          dispatch(
                            setState({ name: "jobPosition", value: "" })
                          );
                          dispatch(
                            setState({ name: "jobDescription", value: "" })
                          );
                          return;
                        }

                        // Normal selection logic
                        const newValue = value as
                          | "resume-basic"
                          | "resume-job-title"
                          | "resume-job-description";

                        // Clear other fields when switching types
                        if (newValue === "resume-job-description") {
                          dispatch(
                            setState({ name: "jobPosition", value: "" })
                          );
                        } else if (newValue === "resume-job-title") {
                          dispatch(
                            setState({ name: "jobDescription", value: "" })
                          );
                        } else if (newValue === "resume-basic") {
                          dispatch(
                            setState({ name: "jobPosition", value: "" })
                          );
                          dispatch(
                            setState({ name: "jobDescription", value: "" })
                          );
                        }

                        // Set new values
                        setResumeType(newValue);
                        dispatch(
                          setState({ name: "resumeType", value: newValue })
                        );
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        resumeType === value
                          ? "bg-purple-600"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          resumeType === value
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {labelText}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          {resumeType === "resume-job-title" ? (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="targetedJobPosition"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter Your Targeted Job Position
              </label>
              <input
                type="text"
                name="targetedJobPosition"
                id="targetedJobPosition"
                value={memoizedState?.jobPosition}
                onChange={(e) =>
                  dispatch(
                    setState({ name: "jobPosition", value: e.target.value })
                  )
                }
                placeholder="MERN Developer"
                className="w-full py-3 px-4 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          ) : resumeType === "resume-job-description" ? (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="targetedJobPosition"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter Your Targeted Job Description
              </label>
              <textarea
                name="targetedJobPosition"
                id="targetedJobPosition"
                value={memoizedState?.jobDescription}
                onChange={(e) =>
                  dispatch(
                    setState({ name: "jobDescription", value: e.target.value })
                  )
                }
                placeholder="Enter job description"
                rows={8}
                className="w-full py-3 px-4 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch(setState({ name: "jobDescription", value: "" }));
                }}
                className="self-end bg-purple-600/10 p-1 cursor-pointer rounded text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Clear Input
              </button>
            </div>
          ) : null}{" "}
        </div>

        <button
          disabled={
            (resumeType === "resume-job-title" &&
              memoizedState.jobPosition === "") ||
            (resumeType === "resume-job-description" &&
              memoizedState.jobDescription === "") ||
            memoizedState.resumeLoading ||
            !session?.user?.email
          }
          onClick={() => handleGenerate()}
          className={` bg-purple-600 w-fit hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            (resumeType === "resume-job-title" &&
              memoizedState.jobPosition === "") ||
            (resumeType === "resume-job-description" &&
              memoizedState.jobDescription === "") ||
            memoizedState.resumeLoading ||
            !session?.user?.email
              ? "opacity-50"
              : ""
          }`}
        >
          {memoizedState.resumeLoading ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Please wait...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              Generate Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(GenerateResume);
