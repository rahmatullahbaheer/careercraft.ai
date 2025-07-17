import { useDispatch, useSelector } from "react-redux";
import { setStepThree } from "@/store/registerSlice";
import { useEffect } from "react";

const StepThree = () => {
  // Redux
  const dispatch = useDispatch();
  const stepThree = useSelector((state: any) => state.register.stepThree);

  const { country, street, cityState, postalCode } = stepThree;
  

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 xs:grid-cols-1 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="dark:text-gray-100 text-gray-950 md:text-lg xs:text-sm "
          >
            {" "}
            Country{" "}
          </label>
          <div className="flex px-4 gap-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100">
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
                  d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                />
              </svg>
            </span>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={(e) => {
                dispatch(setStepThree({ country: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none md:text-lg xs:text-sm dark:text-gray-100"
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
            Street{" "}
          </label>
          <div className="flex px-4 gap-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </span>
            <input
              type="text"
              name="street"
              id="street"
              value={street}
              onChange={(e) => {
                dispatch(setStepThree({ street: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none md:text-lg xs:text-sm dark:text-gray-100"
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
            City State{" "}
          </label>
          <div className="flex px-4 gap-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100">
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
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            </span>
            <input
              type="text"
              name="cityState"
              id="cityState"
              value={cityState}
              onChange={(e) => {
                dispatch(setStepThree({ cityState: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none md:text-lg xs:text-sm dark:text-gray-100"
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
            Postal Code{" "}
          </label>
          <div className="flex px-4 gap-3 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] mt-4 dark:bg-[#11121c] bg-white border border-[#2e2f45] rounded-lg items-center py-3">
            <span className="text-gray-900 dark:text-gray-100">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={postalCode}
              onChange={(e) => {
                dispatch(setStepThree({ postalCode: e.target.value }));
              }}
              className="w-full text-gray-900 bg-transparent rounded-md outline-none md:text-lg xs:text-sm dark:text-gray-100"
              placeholder=""
            />
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-500 md:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5  !mr-2  float-left"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        If you provide your location details, we will suggest relevant nearby
        jobs.
      </p>
    </>
  );
};
export default StepThree;
