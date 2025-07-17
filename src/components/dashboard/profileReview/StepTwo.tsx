import { useDispatch, useSelector } from "react-redux";
import { setStepTwo } from "@/store/registerSlice";
import { useEffect } from "react";
import { setUserData } from "@/store/userDataSlice";

const StepTwo = () => {
  // Redux
  const dispatch = useDispatch();
  const stepTwo = useSelector((state: any) => state.register.stepTwo);

  useEffect(() => {
    if (stepTwo.Email) {
      // check if email is valid or not
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(stepTwo.Email)) {
        dispatch(setStepTwo({ emailInvalid: false }));
      } else {
        dispatch(setStepTwo({ emailInvalid: true }));
      }
    }
    if (
      stepTwo.phoneNumber &&
      stepTwo.Email &&
      stepTwo.emailInvalid === false
    ) {
      dispatch(setStepTwo({ isValid: true }));
    } else {
      dispatch(setStepTwo({ isValid: false }));
    }
  }, [stepTwo.phoneNumber, stepTwo.Email]);


  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 mt-2 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="dark:text-gray-100 text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Phone Number *{" "}
          </label>
          <div className="flex px-4 gap-3 mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
            <span className="text-gray-900 dark:text-gray-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <input
              type="text"
              name="phone"
              id="phone"
              value={stepTwo.phoneNumber}
              onChange={(e) => {
                dispatch(setStepTwo({ phoneNumber: e.target.value }));
                dispatch(setUserData({ phone: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none xs:text-sm md:text-lg dark:text-gray-100"
              placeholder=""
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100 text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Email *{" "}
          </label>
          <div className="flex px-4 gap-3 mt-4 bg-white group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] dark:bg-[#11121c]  border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <input
              type="text"
              name="Email"
              disabled={true}
              id="Email"
              value={stepTwo.Email}
              onChange={(e) => {
                dispatch(setStepTwo({ Email: e.target.value }));
                dispatch(setUserData({ email: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none xs:text-sm md:text-lg dark:text-gray-100"
              placeholder=""
              title="Email can't be changed"
            />
          </div>
          {stepTwo.emailInvalid && (
            <p className="text-sm text-red-500">
              Please enter a valid email address
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="linkedin"
            className="dark:text-gray-100 text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Linkedin{" "}
          </label>
          <div className="flex px-4 gap-3 mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
            <span className="text-gray-900 dark:text-gray-100 ">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                  stroke="white"
                  strokeWidth="0.8"
                />
                <path
                  d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
                  fill="white"
                />
              </svg>
            </span>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              value={stepTwo.linkedin}
              onChange={(e) => {
                dispatch(setStepTwo({ linkedin: e.target.value }));
                dispatch(setUserData({ linkedin: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none xs:text-sm md:text-lg dark:text-gray-100"
              placeholder=""
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500  md:text-sm xs:mt-3 md:mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6  !mr-2  float-left"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        Your contact details won{"'"}t be public and will not be shared with
        anyone.
      </p>
    </>
  );
};
export default StepTwo;
