"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if user is already authenticated
  useEffect(() => {
    console.log("Checking session status:", status, session);
    if (status === "authenticated" && session) {
      console.log("User already authenticated:", session);
      // Redirect based on user role
      if (session.user.role === "admin") {
        router.push("/admin-dashboard");
      }
      if (session.user.role === "user") {
        router.push("/dashboard");
      } else {
        router.push("/"); // or wherever users should go
      }
    }
  }, [status, session, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Checking authentication...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render signin form if already authenticated
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}

        {/* Sign In Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/logo.png"
                alt="CareerCraft.ai"
                className="h-12 w-auto"
              />
            </div>
          </div>
          <div className="mb-6 text-center">
            <p className="text-gray-600">Enter your email and password</p>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                console.log("Attempting signin with:", { email: values.email });

                const result = await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                });

                console.log("SignIn result:", result);

                if (result?.error) {
                  // Handle sign-in errors with better error messages
                  let errorMessage = "Invalid email or password";
                  if (result.error.includes("Invalid Email")) {
                    errorMessage = "No account found with this email";
                  } else if (result.error.includes("not active")) {
                    errorMessage =
                      "Account is not active. Please contact support.";
                  } else if (result.error.includes("Invalid credentials")) {
                    errorMessage = "Incorrect password. Please try again.";
                  } else if (
                    result.error.includes("Missing email or password")
                  ) {
                    errorMessage = "Please fill in both email and password.";
                  }

                  console.log("Setting error:", errorMessage);
                  setFieldError("email", errorMessage);
                } else if (result?.ok) {
                  // Sign-in was successful
                  console.log("Sign-in successful");

                  // Get the updated session
                  const session = await getSession();
                  console.log("Retrieved session:", session);

                  if (session) {
                    // Store remember me preference
                    if (rememberMe) {
                      localStorage.setItem("rememberMe", "true");
                    }

                    // Redirect based on user role
                    if (session.user.role === "admin") {
                      console.log("Redirecting admin to dashboard");
                      router.push("/admin-dashboard");
                    } else {
                      console.log("Redirecting user to home");
                      router.push("/dashboard"); // or wherever users should go after signin
                    }
                  } else {
                    console.error(
                      "No session retrieved after successful signin"
                    );
                    setFieldError(
                      "email",
                      "Authentication successful but session creation failed. Please try again."
                    );
                  }
                }
              } catch (error) {
                console.error("Sign-in error:", error);
                setFieldError("email", "Network error. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/otp-email"
                      className="font-medium text-purple-600 hover:text-purple-500"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                </div>

                {/* Sign In Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-purple-600 hover:text-purple-500"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>

          {/* Session Debug Info (for development) */}
          {/* {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Session Debug Info:
              </h4>
              <p className="text-xs text-gray-600">Status: {status}</p>
              {session && (
                <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-32">
                  {JSON.stringify(session, null, 2)}
                </pre>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
