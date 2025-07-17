import { useDispatch } from "react-redux";
import { months, getYearsList } from "@/helpers/listsProvider";
import { setStepFour } from "@/store/registerSlice";

const years = getYearsList();

const EducationForm = ({ formik }: any) => {
  const dispatch = useDispatch();

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium ">
          Level of education <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="educationLevel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.educationLevel}
          className={`w-full  border border-[#2e2f45] outline-none ${
            formik.touched.educationLevel &&
            formik.errors.educationLevel &&
            "border-red-500 outline-red-500"
          } rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent`}
        />
        {formik.touched.educationLevel && formik.errors.educationLevel && (
          <p className="text-red-600">
            {formik.touched.educationLevel && formik.errors.educationLevel}
          </p>
        )}
      </div>
      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium ">
          Field of study
        </label>
        <input
          type="text"
          name="fieldOfStudy"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.fieldOfStudy}
          className="w-full border border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1  dark:focus:border-[#e6f85e] focus:border-blue-500 bg-transparent"
        />
      </div>
      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium ">
          School
        </label>
        <input
          type="text"
          name="schoolName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.schoolName}
          className="w-full border  border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
        />
      </div>

      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium ">
          School Location
        </label>
        <input
          type="text"
          name="schoolLocation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.schoolLocation}
          className="w-full border border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
        />
      </div>
      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium ">
          Time Period
        </label>
        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <label className="block dark:text-gray-100 text-gray-950 text-xs ">
              From Month
            </label>
            <select
              className="w-full border text-gray-950  border-[#2e2f45] dark:text-gray-100 dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              name="fromMonth"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fromMonth}
            >
              <option value="" className="text-gray-950">
                -- select --
              </option>
              {months.map((month: string) => (
                <option key={month} className="text-gray-950" value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block dark:text-gray-100 text-gray-950 text-xs ">
              From Year
            </label>
            <select
              className="w-full border border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              name="fromYear"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fromYear}
            >
              <option value="" className="text-gray-950">
                -- select --
              </option>
              {years.map((year: number) => (
                <option key={year} value={year} className="text-gray-950">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!formik.values.isContinue && (
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block dark:text-gray-100 text-gray-950 text-xs ">
                To Month
              </label>
              <select
                className="w-full border border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                name="toMonth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.toMonth}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {months.map((month: string) => (
                  <option key={month} value={month} className="text-gray-950">
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block dark:text-gray-100 text-gray-950 text-xs ">
                To Year
              </label>
              <select
                className="w-full border border-[#2e2f45] outline-none  rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                name="toYear"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.toYear}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {years.map((year: number) => (
                  <option key={year} value={year} className="text-gray-950">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="mt-2">
          <input
            type="checkbox"
            id="currentlyEnrolled"
            className="mr-2"
            name="isContinue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            checked={formik.values.isContinue}
          />
          <label htmlFor="currentlyEnrolled" className="text-sm ">
            Currently enrolled
          </label>
        </div>
      </div>
      <div className="w-full">
        <button
          type="submit"
          disabled={String(formik.errors.educationLevel) !== "undefined"}
          className=" px-4 !bg-blue-500 text-white rounded-md py-2  xs:my-2 md:my-0 hover:!bg-blue-600 mr-4 disabled:bg-blue-300"
        >
          Save Education
        </button>
        <button
          type="button"
          onClick={(e) => dispatch(setStepFour({ state: "show" }))}
          className=" px-4 !bg-gray-500 text-white rounded-md py-2 hover:!bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
