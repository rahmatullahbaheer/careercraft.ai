"use client";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { useSelector } from "react-redux";
import { emptyStateIcon } from "@/helpers/iconsProvider";
import { useTourContext } from "@/context/TourContext";

const RecentResumeCard = ({
  source = "",
  componentRef,
  setFinished,
  templateId,
}: {
  source?: string;
  componentRef?: any;
  setFinished?: any;
  templateId?: number;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;
  const { historyCardRef } = useTourContext();

  return (
    <>
      <div
        ref={(ref: any) => (historyCardRef.current = ref)}
        className="bg-white dark:bg-[#17151b] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <h1 className="font-semibold text-[18px] text-gray-600 dark:text-gray-300">
            Your Resumes
          </h1>
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        {/* <div className="flex flex-col flex-wrap gap-4 lg:flex-row"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.length > 0 ? (
            resumes.map((resume: any) => (
              <SingleRecentResumeCard
                key={resume.id}
                resume={resume}
                source={source}
                componentRef={componentRef}
                setFinished={setFinished}
                templateId={templateId}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center w-full p-8 mt-4 space-y-3 text-gray-400">
              {emptyStateIcon}
              <p className="text-lg font-semibold">No Resumes found</p>
              <p className="text-sm text-center">
                You do not have any resumes yet. Your generated resumes will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentResumeCard;
