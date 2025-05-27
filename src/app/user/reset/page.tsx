"use client";
import { useState } from "react";
import { useFormik } from "formik/dist";
import * as Yup from "yup";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Resetuser() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlereset = async (values: { newPassword: string }) => {
    setIsLoading(true);
    try {
      const { ...userData } = values;
      const res = await axios.put(
        "http://18.194.24.83:8000/user/update-password",
        userData
      );
      console.log(res);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      setApiError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  type userreset = {
    newPassword: string;
    confirmPassword: string;
  };

  const formik = useFormik<userreset>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password is required")
        .min(6, "Min length is 6")
        .max(12, "Max length is 12"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: handlereset,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-400 to-indigo-600">
      <div className="m-auto w-full max-w-5xl flex  flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side - Brand panel */}
        <div className="bg-indigo-800 text-white w-full lg:w-1/2 p-12 flex flex-col items-center justify-center relative">
          <div className=" rounded flex  items-center justify-center mb-6">
            <img src="/forgot-password.png" alt="" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-white">Heal Hub</h1>
          <p className="text-lg text-center max-w-md text-white/90">
            Discover the power of personalized health insights and seamless
            tracking with Heal Hub.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="bg-white w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="w-full max-w-md">
            {apiError && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {apiError}
              </div>
            )}

            <h2 className="text-3xl font-bold mb-8 text-indigo-800">
              Reset Password
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-sm text-red-600 mt-1">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-sm text-red-600 mt-1">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mt-4"
              >
                {isLoading ? "Processing..." : "Reset password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}