import AddNewEducationCard from "./AddNewEducationCard";
import EducationCard from "./EducationCard";
import { useDispatch, useSelector } from "react-redux";
import { setScrapped, setStepFour } from "@/store/registerSlice";
import { Education, setField } from "@/store/userDataSlice";
import EditEducationCard from "./EditEducationCard";
import { plusSimpleIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import { RootState } from "@/store/store";
import EditableField from "../EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import axios from "axios";
import { useState } from "react";

// import { useEffect } from "react";

const StepFour = () => {
  // Redux
  const dispatch = useDispatch();
  const stepFour = useSelector((state: RootState) => state.register.stepFour);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.userData);
  const { updateSaveHook } = useUpdateAndSave();
  const { list, state } = stepFour;
  const generateSummaryForProfile = () => {
    setLoading(true);
    const formData = {
      content: userData.uploadedResume.fileContent,
      trainBotData: {
        userEmail: userData.email,
        fileAddress: userData.defaultResumeFile,
      },
    };

    fetch("/api/homepage/writeSummary", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (resp) => {
        const res = await resp.json();
        if (res.success) {
          if (res.result) {
            dispatch(setField({ name: "summary", value: res.result }));

            await axios.post("/api/users/updateUserData", {
              data: {
                ...userData,
                summary: res.result,
              },
            });
          }
        }
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };
  return (
    <>
      {state === "add" && <AddNewEducationCard />}

      {state === "edit" && <EditEducationCard />}

      {state === "show" && (
        <>
          <h1 className="text-lg xs:my-5 justify-between items-center flex md:mt-2 font-bold w-full leading-tight tracking-tight dark:text-gray-100 text-gray-950  md:text-2xl ">
            Profile Summary
          </h1>
          {userData.summary !== "" ? (
            <EditableField
              type="textarea"
              profile={true}
              text="justify"
              value={userData?.summary}
              onSave={(value: string) => {
                updateSaveHook.updateAndSaveProfileSummary(value);
              }}
            />
          ) : (
            <button
              className="py-3 md:mb-3 px-6 font-medium xs:scale-75 md:scale-100 text-base rounded-lg  text-gray-900 !bg-[#e6f85e] float-right"
              onClick={() => generateSummaryForProfile()}
            >
              {loading ? refreshIconRotating : "Generate Profile Summary"}
            </button>
          )}

          <h1 className="text-lg xs:my-5 justify-between items-center flex md:mt-2 font-bold w-full leading-tight tracking-tight dark:text-gray-100 text-gray-950  md:text-2xl ">
            Your Education
          </h1>
          {list.length === 0 && <p>No Education Found</p>}
          <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3  mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
            {list.map((rec: Education) => (
              <div key={rec.id}>
                <EducationCard rec={rec} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => dispatch(setStepFour({ state: "add" }))}
            className="xs:w-full md:w-3/12  flex mt-4 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {plusSimpleIcon}
            Add Education
          </button>
        </>
      )}
    </>
  );
};
export default StepFour;
