import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { WorkExperience } from "@/store/userDataSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import ExperienceForm from "./ExperienceForm";

const EditExperienceCard = () => {
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const { list, state, editId } = stepFive;

  const formik = useFormik({
    initialValues: {
      id: "",
      jobTitle: "",
      company: "",
      country: "",
      cityState: "",
      fromMonth: "",
      fromYear: "",
      isContinue: false,
      toMonth: "",
      toYear: "",
      description: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Job title is required"),
    }),
    onSubmit: async (values) => {
      const updatedList = list.map((rec: WorkExperience) => {
        if (rec.id === editId) {
          return values;
        } else {
          return rec;
        }
      });
      dispatch(setStepFive({ list: updatedList }));
      dispatch(setStepFive({ state: "show" }));
    },
  });

  useEffect(() => {
    const foundRec = list.find((rec: WorkExperience) => rec.id === editId);

    formik.setValues({
      id: foundRec.id,
      jobTitle: foundRec.jobTitle,
      company: foundRec.company,
      country: foundRec.country,
      cityState: foundRec.cityState,
      fromMonth: foundRec.fromMonth,
      fromYear: foundRec.fromYear,
      isContinue: foundRec.isContinue,
      toMonth: foundRec.toMonth,
      toYear: foundRec.toYear,
      description: foundRec.description,
    });
  }, [list]);

  return (
    <div className="w-full max-w-md mx-auto p-6 xs:mt-4 md:mt-10 !border-[1px] dark:!border-[#2e2f45] border-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Update Experience
        <button
          type="button"
          onClick={(e) => dispatch(setStepFive({ state: "show" }))}
          className="text-xs float-right flex flex-row gap-1 items-center font-normal hover:font-extrabold mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          View all Experiences
        </button>
      </h2>
      <ExperienceForm formik={formik} />
    </div>
  );
};
export default EditExperienceCard;
