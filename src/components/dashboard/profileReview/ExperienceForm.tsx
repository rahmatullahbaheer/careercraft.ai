import { useDispatch } from "react-redux";
import { months, getYearsList, countriesList } from "@/helpers/listsProvider";
import { setStepFive } from "@/store/registerSlice";

const years = getYearsList();

const ExperienceForm = ({ formik }: any) => {
  const dispatch = useDispatch();
  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <label className="block dark:text-gray-100 text-gray-950 text-sm font-medium  ">
          Job title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="jobTitle"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.jobTitle}
          className={`w-full border border-[#2e2f45] outline-none ${
            formik.touched.jobTitle &&
            formik.errors.jobTitle &&
            "border-red-500 outline-red-500"
          } rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-[#e6f85e] bg-transparent`}
        />
        {formik.touched.jobTitle && formik.errors.jobTitle && (
          <p className="text-red-600">
            {formik.touched.jobTitle && formik.errors.jobTitle}
          </p>
        )}
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium ">Company</label>
        <input
          type="text"
          name="company"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.company}
          className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500  bg-transparent"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium ">Country</label>
        <input
          type="text"
          name="country"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.country}
          className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
        />
        {/* <select
          className="w-full border-[1px] border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
          name="country"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.country}
        >
          <option value="">-- select --</option>
          {countriesList.map((countryName: string) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select> */}
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium ">City, State</label>
        <input
          type="text"
          name="cityState"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.cityState}
          className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent bg-gray-100"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium ">Time Period</label>
        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <label className="block text-xs text-gray-500">From Month</label>
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
                <option className="text-gray-950" key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-xs text-gray-500">From Year</label>

            <select
              className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent "
              name="fromYear"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fromYear}
            >
              <option value="" className="text-gray-950">
                -- select --
              </option>
              {years.map((year: number) => (
                <option className="text-gray-950" key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!formik.values.isContinue && (
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">To Month</label>
              <select
                className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                name="toMonth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.toMonth}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {months.map((month: string) => (
                  <option className="text-gray-950" key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">To Year</label>
              <select
                className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                name="toYear"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.toYear}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {years.map((year: number) => (
                  <option className="text-gray-950" key={year} value={year}>
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
            id="currentlyWorking"
            className="mr-2"
            name="isContinue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            checked={formik.values.isContinue}
          />
          <label htmlFor="currentlyWorking" className="text-sm ">
            I currently work here
          </label>
        </div>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium ">Description</label>
        <p className="block text-xs text-gray-500">
          Describe your position and any key accomplishments.
        </p>
        <textarea
          rows={5}
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          className="w-full border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          disabled={String(formik.errors.jobTitle) !== "undefined"}
          className=" px-4 !bg-blue-500 text-white xs:my-3 md:my-0  rounded-md py-2 hover:!bg-blue-600 mr-4 disabled:bg-blue-300"
        >
          Save Exerience
        </button>
        <button
          type="button"
          onClick={(e) => dispatch(setStepFive({ state: "show" }))}
          className=" px-4 !bg-gray-500 text-white rounded-md py-2 hover:!bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
