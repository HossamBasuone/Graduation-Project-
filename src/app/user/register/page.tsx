"use client";
import { useState } from "react";
import { useFormik } from "formik/dist";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Registeruser() {
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async (values: {
    userUserName: string;
    userEmail: string;
    userPassword: string;
    userAddress: string;
    userPhone: string;
    userAge: string;
    userGender: string;
    userProfilePic: File | string;
  }) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "userProfilePic" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "confirmPassword") {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        "http://18.194.24.83:8000/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setApiSuccess(res.data.message);
      setApiError("");
      console.log(res);
      // router.push("/");
    } catch (error) {
      setApiError(error.response?.data?.message);
      setApiSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  type userFormValues = {
    userUserName: string;
    userEmail: string;
    userPassword: string;
    confirmPassword: string;
    userAddress: string;
    userPhone: string;
    userAge: string;
    userGender: string;
    userProfilePic: File | string;
  };

  const formik = useFormik<userFormValues>({
    initialValues: {
      userUserName: "",
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
      userAddress: "",
      userPhone: "",
      userAge: "",
      userGender: "",
      userProfilePic: "",
    },
    validationSchema: Yup.object({
      userUserName: Yup.string().required("Name is required"),
      userEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      userPassword: Yup.string()
        .required("Password is required")
        .min(6, "Min length is 6")
        .max(12, "Max length is 12"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("userPassword")], "Passwords must match")
        .required("Please confirm your password"),
      userAddress: Yup.string().required("Address is required"),
      userAge: Yup.number()
        .min(10, "Age must be at least 10")
        .max(100, "Age must be less than 100")
        .required("Please Enter your Age"),
      userPhone: Yup.string()
        .required("Please Enter your Number")
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egypt number"),
      userGender: Yup.string().required("Please select a gender"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-400 to-blue-500">
      <div className="m-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Brand & Illustration */}
          <div className="bg-indigo-800 p-8 text-white md:w-1/2 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="relative z-10">
           
              <div className="mb-8 flex justify-center">
               
                          <img src="/health-_1_.ico" className="h-15" alt="Logo" />

              </div>
              <p className="text-lg text-center mb-6">
                Discover the power of personalized health insights and seamless
                tracking with  <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>.
              </p>
            </div>

            {/* Background design elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white"></div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-8 md:w-1/2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-indigo-800">Sign up</h2>
              <p className="text-gray-600 mt-2">
                Create your  <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span> account
              </p>
            </div>

            {apiError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p>{apiError}</p>
              </div>
            )}

            {apiSuccess && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                <p>{apiSuccess}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* User Name */}
              <div className="relative">
                <input
                  type="text"
                  id="userUserName"
                  name="userUserName"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.userUserName && formik.errors.userUserName
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.userUserName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="userUserName"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.userUserName && formik.errors.userUserName
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Full Name
                </label>
                {formik.touched.userUserName && formik.errors.userUserName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.userUserName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.userEmail && formik.errors.userEmail
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.userEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="userEmail"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.userEmail && formik.errors.userEmail
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Email Address
                </label>
                {formik.touched.userEmail && formik.errors.userEmail && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.userEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="userPassword"
                  name="userPassword"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.userPassword && formik.errors.userPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.userPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="userPassword"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.userPassword && formik.errors.userPassword
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                {formik.touched.userPassword && formik.errors.userPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.userPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  type="text"
                  id="userAddress"
                  name="userAddress"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.userAddress && formik.errors.userAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.userAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="userAddress"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.userAddress && formik.errors.userAddress
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Address
                </label>
                {formik.touched.userAddress && formik.errors.userAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.userAddress}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  id="userPhone"
                  name="userPhone"
                  className={`peer w-full rounded-lg border ${
                    formik.touched.userPhone && formik.errors.userPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                  placeholder=" "
                  value={formik.values.userPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="userPhone"
                  className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                  ${
                    formik.touched.userPhone && formik.errors.userPhone
                      ? "text-red-500"
                      : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                  }`}
                >
                  Phone Number
                </label>
                {formik.touched.userPhone && formik.errors.userPhone && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.userPhone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age */}
                <div className="relative">
                  <input
                    type="number"
                    id="userAge"
                    name="userAge"
                    className={`peer w-full rounded-lg border ${
                      formik.touched.userAge && formik.errors.userAge
                        ? "border-red-500"
                        : "border-gray-300"
                    } px-4 py-3 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none`}
                    placeholder=" "
                    value={formik.values.userAge}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="userAge"
                    className={`absolute -top-2.5 left-4 bg-white px-1 text-sm transition-all 
                    ${
                      formik.touched.userAge && formik.errors.userAge
                        ? "text-red-500"
                        : "text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                    }`}
                  >
                    Age
                  </label>
                  {formik.touched.userAge && formik.errors.userAge && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.userAge}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userGender"
                        value="Male"
                        checked={formik.values.userGender === "Male"}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userGender"
                        value="Female"
                        checked={formik.values.userGender === "Female"}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                  {formik.touched.userGender && formik.errors.userGender && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.userGender}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="userProfilePic"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-1 text-xs text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="userProfilePic"
                      name="userProfilePic"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "userProfilePic",
                          event.currentTarget.files?.[0]
                        );
                      }}
                    />
                  </label>
                </div>
                {formik.errors.userProfilePic &&
                  formik.touched.userProfilePic && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.userProfilePic}
                    </p>
                  )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-indigo-600 py-3 text-white font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/user/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-2 text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.378 6.596c1.671 0 2.696 1.2 2.696 2.9 0 2.1-1.8 3.3-3.3 3.3-.5 0-.9-.2-1.2-.5-.3-.2-.4-.5-.5-.9h2.6c.1 0 .1-.1.1-.2v-.7c0-.1-.1-.2-.1-.2h-2.6c0-.4.2-.8.5-1 .3-.2.6-.3 1-.3.8 0 1.4.6 1.5 1.3h.9c-.1-1.3-1.1-2.2-2.4-2.2-1.6 0-2.8 1.2-2.8 2.8 0 1.6 1.2 2.8 2.8 2.8 1.5 0 2.7-1.2 2.7-2.8 0-.1 0-.3-.1-.4h-.9c0 .1.1.2.1.4 0 1-.8 1.8-1.8 1.8-1 0-1.8-.8-1.8-1.8.1-1 .9-1.8 1.9-1.8z"></path>
                      <path d="M9.5 12.2c.2.2.5.4.8.5-.8.3-1.3 1-1.3 1.8 0 1.1.9 2 2 2s2-.9 2-2c0-.8-.5-1.5-1.3-1.8.3-.1.6-.3.8-.5.6-.6.8-1.5.5-2.3-.3-.8-1-1.3-1.9-1.3-.9 0-1.6.5-1.9 1.3-.4.8-.2 1.7.5 2.3zm1.5 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm0 3.3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
                      <circle
                        cx="12"
                        cy="12"
                        r="9.5"
                        fill="none"
                        stroke="currentColor"
                      ></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}