import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeid } from "@/helpers/makeid";
import EducationForm from "./EducationForm";
import { RootState } from "@/store/store";

const AddNewEducationCard = () => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: RootState) => state.register.stepFour);
  const { list } = stepFour;

  const formik = useFormik({
    initialValues: {
      educationLevel: "",
      fieldOfStudy: "",
      schoolName: "",
      schoolLocation: "",
      fromMonth: "",
      fromYear: "",
      isContinue: false,
      toMonth: "",
      toYear: "",
    },
    validationSchema: Yup.object({
      educationLevel: Yup.string().required("Education Level is Required"),
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
      dispatch(setStepFour({ list: newList }));
      dispatch(setStepFour({ state: "show" }));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 xs:mt-3 md:mt-10 !border-[1px] dark:!border-[#2e2f45] border-gray-700  rounded-lg">
      <h2 className="text-lg md:text-2xl items-center flex justify-between font-semibold mb-4 dark:text-gray-100 text-gray-950">
        Add Education
        <button
          type="button"
          onClick={(e) => dispatch(setStepFour({ state: "show" }))}
          className="text-xs  float-right flex flex-row gap-1 items-center hover:font-extrabold mt-2 dark:text-gray-100 text-gray-950"
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
          View all educations
        </button>
      </h2>
      <EducationForm formik={formik} />
    </div>
  );
};
export default AddNewEducationCard;
