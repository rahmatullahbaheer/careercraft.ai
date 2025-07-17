import { useDispatch, useSelector } from "react-redux";
import { setStepOne } from "@/store/registerSlice";
import { useEffect } from "react";

const StepOne = () => {
  // Redux
  const dispatch = useDispatch();
  const stepOne = useSelector((state: any) => state.register.stepOne);
  const { firstName, lastName } = stepOne;

  useEffect(() => {
    if (firstName && lastName) {
      dispatch(setStepOne({ isValid: true }));
    } else {
      dispatch(setStepOne({ isValid: false }));
    }
  }, [firstName, lastName]);

 

  return (
    <>
      <div className="w-full grid  grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100  text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            First Name *{" "}
          </label>
          <div className="flex px-4 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] gap-3 mt-4 bg-white dark:bg-[#11121c] border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="rounded-md xs:text-sm md:text-lg text-gray-900 dark:text-gray-100 bg-transparent outline-none w-full"
              placeholder=""
              value={firstName}
              onChange={(e) => {
                dispatch(setStepOne({ firstName: e.target.value }));
              }}
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100  text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Last Name *{" "}
          </label>
          <div className="flex group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 mt-4 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                dispatch(setStepOne({ lastName: e.target.value }));
              }}
              className="rounded-md md:text-lg xs:text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none w-full"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default StepOne;
