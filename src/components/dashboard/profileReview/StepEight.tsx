import { useDispatch, useSelector } from "react-redux";
import { setStepEight, setTerms } from "@/store/registerSlice";
import { useEffect } from "react";
import Link from "next/link";

const StepEight = () => {
  // Redux
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const { password, cPassword, isValid } = register.stepEight;
  const { terms } = register;

  useEffect(() => {
    if (password === cPassword && password !== "" && cPassword !== "") {
      dispatch(setStepEight({ isValid: true }));
    } else {
      dispatch(setStepEight({ isValid: false }));
    }
  }, [password, cPassword]);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight mt-3  md:text-2xl ">
        Enter password to create your account
      </h1>
      {/* Input */}
      <div className="flex flex-col gap-4 mt-5">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium  "
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              dispatch(setStepEight({ password: e.target.value }));
            }}
            className="bg-transparent  border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          />
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="cPassword"
            className="block mb-2 text-sm font-medium  "
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="cPassword"
            id="cPassword"
            value={cPassword}
            onChange={(e) => {
              dispatch(setStepEight({ cPassword: e.target.value }));
            }}
            className="bg-transparent border border-[#2e2f45] dark:focus-within:border-[#e6f85e] outline-none  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          />
        </div>
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm mt-2">
          Both fields are required and must be same
        </p>
      )}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            onChange={(e) => dispatch(setTerms(e.target.checked))}
            checked={terms}
            className="w-4 h-4 border-[1px] border-gray-300 rounded bg-transparent focus:ring-3 focus:ring-primary-300 "
          />
        </div>

        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-light">
            I accept the{" "}
            <Link
              className="font-medium text-primary-600 hover:underline"
              href="#"
              target="_blank"
            >
              Terms and Conditions
            </Link>
          </label>
        </div>
      </div>
    </>
  );
};
export default StepEight;
