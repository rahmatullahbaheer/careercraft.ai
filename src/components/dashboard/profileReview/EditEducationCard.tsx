import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { Education } from "@/store/userDataSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import EducationForm from "./EducationForm";

const EditEducationCard = () => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list, editId } = stepFour;

  const formik = useFormik({
    initialValues: {
      id: "",
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
      const updatedList = list.map((rec: Education) => {
        if (rec.id === editId) {
          return values;
        } else {
          return rec;
        }
      });
      dispatch(setStepFour({ list: updatedList }));
      dispatch(setStepFour({ state: "show" }));
    },
  });

  useEffect(() => {
    const foundRec = list.find((rec: Education) => rec.id === editId);

    formik.setValues({
      id: foundRec.id,
      educationLevel: foundRec.educationLevel,
      fieldOfStudy: foundRec.fieldOfStudy,
      schoolName: foundRec.schoolName,
      schoolLocation: foundRec.schoolLocation,
      fromMonth: foundRec.fromMonth,
      fromYear: foundRec.fromYear,
      isContinue: foundRec.isContinue,
      toMonth: foundRec.toMonth,
      toYear: foundRec.toYear,
    });
  }, [list]);

  return (
    <div className="w-full max-w-md mx-auto p-6 xs:mt-4 md:mt-10 shadow-md dark:border-[1px] dark:border-[#2e2f45] rounded-lg">
      <h2 className="text-lg md:text-2xl items-center flex justify-between font-semibold mb-4 dark:text-gray-100 text-gray-950">
        Update Education
        <button
          type="button"
          onClick={(e) => dispatch(setStepFour({ state: "show" }))}
          className="text-xs float-right flex flex-row gap-1 items-center mt-2 transition-all duration-300 ease-in-out hover:font-extrabold hover:text-blue-500 dark:hover:text-yellow-300"
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
export default EditEducationCard;
