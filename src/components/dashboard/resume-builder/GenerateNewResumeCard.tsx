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
  const dispatch = useDispatch();
  const radiosResumeType: { labelText: string; value: string }[] = [
    {
      labelText: "Generate Basic Resume",
      value: "resume-basic",
    },
    {
      labelText: "Generate For Job Title",
      value: "resume-job-title",
    },
    {
      labelText: "Generate For Job Description",
      value: "resume-job-description",
    },
  ];

  const [resumeType, setResumeType] = useState<
    "resume-basic" | "resume-job-title" | "resume-job-description"
  >(jobId ? "resume-job-description" : "resume-basic");

  // Initialize resume type in Redux on component mount
  useEffect(() => {
    const initialType = jobId ? "resume-job-description" : "resume-basic";
    dispatch(setState({ resumeType: initialType }));
  }, [dispatch, jobId]);
  useEffect(() => {
    if (jobId) {
      setResumeType("resume-job-description");
      axios
        .get(`/api/deo/?findOne=${jobId}`)
        .then((resp) => {
          console.log(resp.data.data.jobDescription);
          dispatch(
            setState({
              jobDescription: htmlToPlainText(resp.data.data.jobDescription),
            })
          );
          // setSingleJob(resp.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jobId, dispatch]);

  const { data: session } = useSession();

  const state = useSelector((state: any) => state.resume.state);
  const memoizedState = useMemo(() => state, [state]);
  const { resumeElementRef } = useTourContext();

  useEffect(() => {
    if (!jobId && memoizedState?.resumeType) {
      setResumeType(memoizedState.resumeType);
    }
  }, [memoizedState?.resumeType, jobId]);

  // Debug log to check state
  console.log("Current resumeType:", resumeType);
  console.log("memoizedState:", memoizedState);
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
                        const newValue = value as
                          | "resume-basic"
                          | "resume-job-title"
                          | "resume-job-description";

                        // Always update, don't check if it's the same
                        // Clear other fields when switching types
                        if (newValue === "resume-job-description") {
                          dispatch(setState({ jobPosition: "" }));
                        } else if (newValue === "resume-job-title") {
                          dispatch(setState({ jobDescription: "" }));
                        } else if (newValue === "resume-basic") {
                          dispatch(setState({ jobPosition: "" }));
                          dispatch(setState({ jobDescription: "" }));
                        }

                        // Set new values
                        setResumeType(newValue);
                        dispatch(setState({ resumeType: newValue }));
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
                value={memoizedState?.jobPosition || ""}
                onChange={(e) =>
                  dispatch(setState({ jobPosition: e.target.value }))
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
                value={memoizedState?.jobDescription || ""}
                onChange={(e) =>
                  dispatch(setState({ jobDescription: e.target.value }))
                }
                placeholder="Enter job description"
                rows={8}
                className="w-full py-3 px-4 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch(setState({ jobDescription: "" }));
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
              (!memoizedState?.jobPosition ||
                memoizedState.jobPosition === "")) ||
            (resumeType === "resume-job-description" &&
              (!memoizedState?.jobDescription ||
                memoizedState.jobDescription === "")) ||
            memoizedState?.resumeLoading ||
            !session?.user?.email
          }
          onClick={() => handleGenerate()}
          className={`bg-purple-600 w-fit hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            (resumeType === "resume-job-title" &&
              (!memoizedState?.jobPosition ||
                memoizedState.jobPosition === "")) ||
            (resumeType === "resume-job-description" &&
              (!memoizedState?.jobDescription ||
                memoizedState.jobDescription === "")) ||
            memoizedState?.resumeLoading ||
            !session?.user?.email
              ? "opacity-50"
              : ""
          }`}
        >
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${
                memoizedState?.resumeLoading ? "animate-spin" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            Generate Resume
          </>
        </button>
      </div>
    </div>
  );
};

export default memo(GenerateResume);
