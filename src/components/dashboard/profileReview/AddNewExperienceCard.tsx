import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeid } from "@/helpers/makeid";
import ExperienceForm from "./ExperienceForm";
import { RootState } from "@/store/store";

const AddNewExperienceCard = () => {
  const dispatch = useDispatch();
  const stepFive = useSelector((state: RootState) => state.register.stepFive);
  const { list } = stepFive;

  const formik = useFormik({
    initialValues: {
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
      // generate random id
      const obj = { id: makeid(), ...values };
      const newList = [obj, ...list];
      // Sort the array by fromYear and fromMonth
      newList.sort((a: any, b: any) => {
        const yearComparison = a.fromYear.localeCompare(b.fromYear);
        if (yearComparison !== 0) {
          return yearComparison;
        }
        return a.fromMonth.localeCompare(b.fromMonth);
      });
      newList.reverse();
      dispatch(setStepFive({ list: newList }));
      dispatch(setStepFive({ state: "show" }));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 mt-10 dark:border-[1px] dark:border-[#2e2f45]   rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Add Experience
        <button
          type="button"
          onClick={(e) => dispatch(setStepFive({ state: "show" }))}
          className="text-xs float-right flex flex-row gap-1 items-center hover:font-extrabold mt-2"
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
export default AddNewExperienceCard;
