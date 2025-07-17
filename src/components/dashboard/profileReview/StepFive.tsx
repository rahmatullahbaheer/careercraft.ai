import AddNewExperienceCard from "./AddNewExperienceCard";
import ExperienceCard from "./ExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveStep,
  setField,
  setScrapped,
  setScrapping,
  setStepFive,
} from "@/store/registerSlice";
import { WorkExperience } from "@/store/userDataSlice";
import EditExperienceCard from "./EditExperienceCard";
import { plusSimpleIcon } from "@/helpers/iconsProvider";
import { useEffect } from "react";
import { makeid } from "@/helpers/makeid";
import axios from "axios";

// import { useEffect } from "react";

const StepFive = () => {
  // Redux
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const register = useSelector((state: any) => state.register);
  const { list, state } = stepFive;


  if (register.scrapping.workExperience) {
    return (
      <div className="pl-12">
        <h3>Please wait</h3>
        <p>Refetching Experience data from your Resume...</p>
      </div>
    );
  }

  return (
    <>
      {state === "show" && register.scrappedContent !== "" && (
        <div
          className="flex items-center bg-blue-500 text-gray-100  text-sm md:mt-12 mt-3 px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>
            Don{"'"}t see all your Work Experience? <br />{" "}
            {/* <button
              type="button"
              className="font-bold text-blue-950 "
              onClick={() => {
                dispatch(setScrapped({ workExperience: false }));
                fetchExperienceDataFromResume(true);
              }}
            >
              {" "}
              Click here{" "}
            </button>{" "} */}
            You can add missing experiences manually to get better results.
          </p>
        </div>
      )}

      {state === "add" && <AddNewExperienceCard />}

      {state === "edit" && <EditExperienceCard />}

      {state === "show" && (
        <>
          <h1 className="text-lg xs:my-5 justify-between items-center flex md:mt-2  font-bold leading-tight tracking-tight  md:text-2xl dark:text-gray-100 text-gray-950 ">
            Work Experience
          </h1>

          {list.length === 0 && <p>No Experiences Found</p>}
          <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
            {list.map((rec: WorkExperience) => (
              <div key={rec.id}>
                <ExperienceCard rec={rec} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => dispatch(setStepFive({ state: "add" }))}
            className="xs:w-full md:w-3/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            {plusSimpleIcon}
            Add Experience
          </button>
          {/* <button
            type="button"
            onClick={(e) =>  dispatch(setActiveStep(register.activeStep + 1))}
            className="xs:w-full md:w-3/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            {plusSimpleIcon}
            Add Custom Section
          </button> */}
        </>
      )}
    </>
  );
};
export default StepFive;
