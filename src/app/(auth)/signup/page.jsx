"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { AlertCircle, RotateCw, Upload, Eye, EyeOff } from "lucide-react";
import FileUploadHandler from "../components/FileUploadHandler";
import WordFileHandler from "../components/WordFileHandler";
import { makeid } from "../components/makeid";
import { useDispatch } from "react-redux";
// Force dynamic rendering
export const dynamic = "force-dynamic";

const RegistrationFormNewContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const dispatch = useDispatch();
  const [submittingError, setSubmittingError] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data, status } = useSession();
  const isAuth = status === "authenticated";

  const content = params?.get("content");
  const getProfile = params?.get("profile");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      file: "",
      expectedSalary: "",
      desiredJobTitle: "",
      preferedLocation: "",
      industry: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address required"),
      phone: Yup.string().required("Phone number required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password required"),
      expectedSalary:
        getProfile === "true"
          ? Yup.string().required("Expected salary is required")
          : Yup.string().notRequired(),
      desiredJobTitle:
        getProfile === "true"
          ? Yup.string().required("Desired job title is required")
          : Yup.string().notRequired(),
      preferedLocation:
        getProfile === "true"
          ? Yup.string().required("Preferred location is required")
          : Yup.string().notRequired(),
      industry:
        getProfile === "true"
          ? Yup.string().required("Industry is required")
          : Yup.string().notRequired(),
    }),
    onSubmit: async (values) => {
      setSubmittingError("");

      // Check if resume is required and uploaded
      if (!isAuth && content !== "true" && text === "") {
        setSubmittingError("Please Upload Your Resume to Continue");
        return;
      }

      if (values.terms) {
        setSubmitting(true);
        const obj = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          registeredPhone: values.phone,
          desiredJobTitle: values.desiredJobTitle,
          expectedSalary: values.expectedSalary,
          locationPreference: values.preferedLocation,
          industry: values.industry,
          uploadedResume: {
            id: makeid(),
            fileName: fileName,
            fileContent: text,
            uploadedDateTime: new Date(),
          },
          status: true,
        };
        axios
          .post("/api/auth/users", obj)
          .then(async () => {
            console.log("User created successfully>>>>>>>>>>>>>>>>>:", values);

            if (values.file !== "") {
              await updateUser(values.file, values.email);
            }
            const res = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });

            if (res?.ok) {
              if (getProfile === "true") {
                router.replace("/creating-profile?goToProfile=true");
              } else {
                router.replace("/dashboard");
              }
            } else {
              setSubmittingError("Authentication failed");
            }
          })
          .catch((error) => {
            if (error.response?.data?.error) {
              setSubmittingError(error.response.data.error);
            } else {
              setSubmittingError("Something went wrong");
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    },
  });

  const updateUser = (file, email) => {
    console.log("Updating user with file:", file, "and email:", email);
    if (file && email) {
      return axios.post("/api/users/updateUser", {
        newFile: file,
        email: email,
      });
    }
  };

  const removeDashesFromString = (str) => {
    return str.replace(/-/g, " ");
  };

  const fetchRegistrationDataFromResume = async (content) => {
    setFileError("");
    setFileUploading(true);
    console.log("Processing PDF content, length:", content?.length);

    if (content) {
      fetch("/api/homepage/fetchRegistrationDataForHomepage", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp) => {
          const res = await resp.json();
          console.log("API response:", res);

          if (res.success) {
            let userData =
              typeof res.result === "object"
                ? res.result
                : JSON.parse(res.result);
            console.log("Extracted user data:", userData);

            router.replace(
              `/signup?firstName=${userData.firstName}&lastName=${
                userData.lastName
              }&email=${userData.email}&phone=${
                userData.registeredPhone
              }&content=true${getProfile === "true" ? "&profile=true" : ""}`
            );

            if (
              userData.firstName ||
              userData.lastName ||
              userData.email ||
              userData.registeredPhone
            ) {
              formik.setFieldValue(
                "firstName",
                removeDashesFromString(userData.firstName)
              );
              formik.setFieldValue(
                "lastName",
                removeDashesFromString(userData.lastName)
              );
              formik.setFieldValue(
                "email",
                removeDashesFromString(userData.email)
              );
              formik.setFieldValue(
                "phone",
                removeDashesFromString(userData.registeredPhone)
              );
            }
          } else {
            console.error("API error:", res);
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setFileError("Something went wrong");
        })
        .finally(() => {
          setFileUploading(false);
        });
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setFile(fileInput.files[0]);
      setFileName(fileInput.files[0].name);
    }
  };

  useEffect(() => {
    const firstName = params?.get("firstName");
    const lastName = params?.get("lastName");
    const email = params?.get("email");
    const registeredPhone = params?.get("phone");
    const file = params?.get("file");

    if (firstName)
      formik.setFieldValue("firstName", removeDashesFromString(firstName));
    if (lastName)
      formik.setFieldValue("lastName", removeDashesFromString(lastName));
    if (email) formik.setFieldValue("email", removeDashesFromString(email));
    if (registeredPhone)
      formik.setFieldValue("phone", removeDashesFromString(registeredPhone));
    if (file) formik.setFieldValue("file", file);
  }, [params]);

  useEffect(() => {
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFileError("");
    } else if (file) {
      setFileError("only PDF and Word Doc file is allowed");
    }
  }, [file]);

  useEffect(() => {
    axios
      .get("/api/deo/jobCategories")
      .then((resp) => setJobCategories(resp.data.data))
      .catch(console.log);
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("pdfText");
      if (data) {
        setText(data);
      }
    }
  }, []);

  return (
    <div className="font-outfit w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="CareerCraft.ai" className="h-12 w-auto" />
          </div>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Upload Resume Button at Top */}
          {content !== "true" && (
            <div className="mb-6">
              <label className="block cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  disabled={fileUploading}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />

                <div className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  {fileUploading ? (
                    <RotateCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  <span>
                    {fileUploading ? "Uploading..." : "UPLOAD RESUME"}
                  </span>
                </div>
              </label>
            </div>
          )}

          <div className={`mb-5`}>
            {!params?.get("file") && (
              <>
                {file !== null && file?.type === "application/pdf" ? (
                  <FileUploadHandler
                    file={file}
                    text={text}
                    setText={setText}
                    fetchRegistrationDataFromResume={
                      fetchRegistrationDataFromResume
                    }
                  />
                ) : (
                  file !== null &&
                  (file?.type === "application/msword" ||
                    file?.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
                    <WordFileHandler
                      file={file}
                      text={text}
                      setText={setText}
                      fetchRegistrationDataFromResume={
                        fetchRegistrationDataFromResume
                      }
                    />
                  )
                )}
              </>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="First Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Last Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.lastName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Email Address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Phone Number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 pr-12"
                placeholder="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 pr-12"
                placeholder="Confirm Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {getProfile && (
            <>
              <div className="my-2 text-start">
                <div className="relative flex flex-wrap items-stretch w-full ">
                  <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="expectedSalary"
                    className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                    placeholder="Expected Salary Per Annum (in $)"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.expectedSalary}
                  />
                </div>
                {formik.touched.expectedSalary &&
                  formik.errors.expectedSalary && (
                    <p className="pt-3 text-red-600">
                      {formik.touched.expectedSalary &&
                        formik.errors.expectedSalary}
                    </p>
                  )}
              </div>
              <div className="my-2 text-start">
                <div className="relative flex flex-wrap items-stretch w-full ">
                  <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="desiredJobTitle"
                    className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                    placeholder="Desired Job Title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.desiredJobTitle}
                  />
                </div>
                {formik.touched.desiredJobTitle &&
                  formik.errors.desiredJobTitle && (
                    <p className="pt-3 text-red-600">
                      {formik.touched.desiredJobTitle &&
                        formik.errors.desiredJobTitle}
                    </p>
                  )}
              </div>
              <div className="my-2 text-start">
                <div className="relative flex flex-wrap items-stretch w-full ">
                  <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="preferedLocation"
                    className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                    placeholder="Preferred Location"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.preferedLocation}
                  />
                </div>
                {formik.touched.preferedLocation &&
                  formik.errors.preferedLocation && (
                    <p className="pt-3 text-red-600">
                      {formik.touched.preferedLocation &&
                        formik.errors.preferedLocation}
                    </p>
                  )}
              </div>
              <div className="my-2 text-start">
                <div className="relative flex flex-wrap items-stretch w-full">
                  <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                      />
                    </svg>
                  </span>
                  <select
                    id="industry"
                    placeholder="Industry"
                    required
                    className="block outline-none focus:border-blue-400 bg-[#0D1527] rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg- bg-clip"
                    {...formik.getFieldProps("industry")}
                  >
                    <option value="" disabled>
                      Select an Industry
                    </option>
                    {jobCategories.map((industry) => {
                      return (
                        <option
                          key={industry._id}
                          value={industry.name}
                          className="space-y-1 "
                        >
                          {industry.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {formik.touched.industry && formik.errors.industry && (
                  <div className="text-red-500">{formik.errors.industry}</div>
                )}
              </div>
            </>
          )}
          {content !== "true" ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Important Notice
                  </p>
                  <p className="text-slate-400 text-sm">
                    Please upload your resume above to auto-fill the form
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Important Notice
                  </p>
                  <p className="text-slate-400 text-sm">
                    Please verify your details before sign up
                  </p>
                </div>
              </div>
            </div>
          )}

          {fileError && (
            <div
              className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500"
              role="alert"
            >
              <p>{fileError}</p>
            </div>
          )}

          {/* Debug: Show current text state */}
          {/* {process.env.NODE_ENV === "development" && text && (
            <div className="p-4 my-2 text-green-700 bg-green-100 border-l-4 border-green-500">
              <p>
                <strong>PDF Text Extracted:</strong> {text.substring(0, 100)}...
              </p>
              <p>
                <strong>Length:</strong> {text.length} characters
              </p>
            </div>
          )} */}

          {formik.touched.file && formik.errors.file && (
            <p className="pt-3 text-red-600">
              {formik.touched.file && formik.errors.file}
            </p>
          )}
          <div className="my-4 text-start">
            <div className="ml-3 text-sm flex items-center">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.terms ? true : false}
                className="w-4 mr-4 h-4 border-[1px] border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
              />

              <label htmlFor="terms" className="mr-1 font-light">
                I accept the{" "}
                <Link
                  className="font-medium text-primary-600 text-blue-400 hover:underline"
                  href="/terms-and-conditions"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>
              </label>

              <label htmlFor="terms" className="font-light">
                &
                <Link
                  className="ml-1 font-medium text-primary-600 text-blue-400 hover:underline"
                  href="/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {submittingError !== "" && (
            <div
              className="p-4 my-2 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>{submittingError}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={!formik.values.terms || submitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {submitting ? "Creating Account..." : "SIGN UP"}
          </button>
          <div className="mt-2 text-center">
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-400 hover:underline">
                Sign In{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const RegistrationFormNew = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationFormNewContent />
    </Suspense>
  );
};

export default RegistrationFormNew;
