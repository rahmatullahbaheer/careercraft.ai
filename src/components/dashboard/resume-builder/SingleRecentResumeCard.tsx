import { trashIcon } from "@/helpers/iconsProvider";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { Resume, emptyResume, setResume } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { showSuccessToast } from "@/helpers/toast";
const SingleRecentResumeCard = ({
  resume,
  source,
  setFinished,
}: {
  resume: Resume;
  source?: string;
  componentRef?: any;
  setFinished?: any;

  templateId?: number;
}) => {
  const userData = useSelector((state: any) => state.userData);
  const { email, resumes } = userData;
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleOnView = async () => {
    if (source != "") {
      router.replace("/resume-builder");
    }
    if (setFinished) {
      setFinished(true);
    }
    return dispatch(setResume(resume));
  };

  const handleOnDelete = async () => {
    setDeleting(true);
    setConfirmationModal(false);
    const updatedResumes = resumes.filter((r: Resume) => r.id !== resume.id);
    if (updatedResumes.length === 0) {
      setFinished(false);
    }
    updateUser(updatedResumes);
    dispatch(emptyResume());
  };
  const updateUser = (updatedResumes: any) => {
    if (email) {
      return axios
        .post("/api/users/updateUserResumes", {
          email,
          resumes: updatedResumes,
        })
        .then(async (res: any) => {
          if (res.data.success) {
            showSuccessToast("Resume deleted successfully");
            setDeleting(false);
            const res = await fetch(`/api/users/getOneByEmail?email=${email}`);
            const response = await res.json();
            dispatch(setUserData(response.result));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };

  return (
    <>
      {/* <ConfirmationModal
        id={"deletion-confirmation-modal-user-coupons"}
        title={"Deletion Modal"}
        message={"Are you sure you want to delete this record"}
        ref={confirmationModalRef}
        api="/api/coupons"
        refresh={() => {}}
      /> */}
      <div className="bg-white dark:bg-[#222027] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
            {resume?.state?.resumeType === "resume-basic"
              ? resume?.name
              : resume?.state?.resumeType === "resume-job-title"
                ? resume?.state?.jobPosition
                : resume?.state?.jobDescription}
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm1 5.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Job Title</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
              <path
                fillRule="evenodd"
                d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{getFormattedDate(resume?.dateTime)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleOnView}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View
          </button>

          <button
            disabled={deleting}
            type="button"
            onClick={handleOpenConfirmationModal}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {trashIcon}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={handleOnDelete}
          onCancel={() => setConfirmationModal(false)}
        />
      )}
    </>
  );
};
export default SingleRecentResumeCard;
