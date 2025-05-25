"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPartner() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { newPassword: string }) => {
    setIsLoading(true);
    try {
      const { newPassword } = values;
      const res = await axios.put(
        "http://18.199.172.137:8000/partner/update-password",
        { newPassword }
      );
      console.log(res);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      setApiError(error.response?.data?.message || "Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  type PartnerReset = {
    newPassword: string;
    confirmPassword: string;
  };

  const formik = useFormik<PartnerReset>({
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
    onSubmit: handleLogin,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-800 to-green-500">
      <div className="m-auto w-full max-w-5xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side - Brand panel */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-500 text-white w-full lg:w-1/2 p-12 flex flex-col items-center justify-center relative">
        
              <div className="mb-8 flex justify-center">
               
                          <img src="/health-_1_.ico" className="h-15" alt="Logo" />

              </div>
          <Link href={"/"}>
            <h5 className="my-3 text-3xl font-bold p-2 rounded-3xl bg-black text-center">
              <span className="text-green-500">Heal</span>
              <span className="text-blue-500">Hub</span>
            </h5>
          </Link>
          <p className="text-lg text-center max-w-md text-white/90">
            Welcome back Partner! Reset your password and get started again with
            Heal Hub.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="bg-white w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {apiError && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {apiError}
              </div>
            )}

            <Link
              href="/partner/login"
              className="text-indigo-600 text-xl mb-4 inline-block font-bold"
            >
              ← Back to login
            </Link>

            <h2 className="text-3xl font-bold mb-8 text-indigo-800 text-center">
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