"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo from "../../../../public/img1.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPartner() {
  const router = useRouter();
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type PartnerFormValues = {
    partnerUserName: string;
    partnerEmail: string;
    partnerPassword: string;
    confirmPassword: string;
    partnerAddress: string;
    partnerPhone: string;
    partnerAge: string;
    partnerWorkType: string;
    partnerDescription: string;
    partnerImage: File | string;
  };

  const handleLogin = async (values: PartnerFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("partnerUserName", values.partnerUserName);
      formData.append("partnerEmail", values.partnerEmail);
      formData.append("partnerPassword", values.partnerPassword);
      formData.append("partnerAddress", values.partnerAddress);
      formData.append("partnerPhone", values.partnerPhone);
      formData.append("partnerAge", values.partnerAge);
      formData.append("partnerWorkType", values.partnerWorkType);
      formData.append("partnerDescription", values.partnerDescription);
      if (values.partnerImage) {
        formData.append("partnerProfilePic", values.partnerImage);
      }

      const res = await axios.post(
        "http://18.199.172.137:8000/partner/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response:", res);
      setApiSuccess(res.data.message);
      setApiError("");

      localStorage.setItem("token", res.data.token);
    } catch (error: any) {
      setApiError(error.response?.data?.message);
      setApiSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<PartnerFormValues>({
    initialValues: {
      partnerUserName: "",
      partnerEmail: "",
      partnerPassword: "",
      confirmPassword: "",
      partnerAddress: "",
      partnerPhone: "",
      partnerAge: "",
      partnerWorkType: "",
      partnerDescription: "",
      partnerImage: "",
    },
    validationSchema: Yup.object({
      partnerUserName: Yup.string().required("Name is required"),
      partnerEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      partnerPassword: Yup.string()
        .required("Password is required")
        .min(6, "Min length is 6")
        .max(12, "Max length is 12"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("partnerPassword")], "Passwords must match")
        .required("Please confirm your password"),
      partnerAddress: Yup.string().required("Address is required"),
      partnerAge: Yup.number()
        .min(10, "Age must be at least 10")
        .max(100, "Age must be less than 100")
        .required("Please Enter your Age"),
      partnerPhone: Yup.string()
        .required("Please Enter your Number")
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egypt number"),
      partnerWorkType: Yup.string().required("Please select a work type"),
      partnerDescription: Yup.string().required(
        "please tell us about your self"
      ),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-l from-green-500 to-green-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto w-full rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Brand Section */}
          <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <div className="w-full h-full animate-bgZoomLoop">
          <Image
            src={logo}
            alt="Login background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
          
              <div className="mb-8 flex justify-center ">
               
                          <img src="/health-_1_.ico" className="h-15" alt="Logo" />

              </div>
          <h2 className="text-white text-4xl font-bold text-center px-4">
            Hello Partner!
          </h2>
        </div>

        <style jsx global>{`
          @keyframes bgZoomLoop {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }

          .animate-bgZoomLoop {
            animation: bgZoomLoop 10s ease-in-out infinite;
          }
        `}</style>
      </div>  

          {/* Right: Form Section */}
          <div className="w-full lg:w-3/5 bg-white p-6 sm:p-8 md:p-10 lg:p-12">
            {apiError && (
              <div className="w-full bg-red-500 text-white text-center p-3 mb-6 rounded-md font-semibold">
                {apiError}
              </div>
            )}
            {apiSuccess && (
              <div className="w-full bg-green-500 text-white text-center p-3 mb-6 rounded-md font-semibold">
                {apiSuccess}
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
              Register
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Personal Information Section */}
              <div className="space-y-4">
                {/* User Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="partnerUserName"
                    id="partnerUserName"
                    value={formik.values.partnerUserName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Full Name"
                  />
                  {formik.touched.partnerUserName &&
                    formik.errors.partnerUserName && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerUserName}
                      </div>
                    )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="partnerEmail"
                    id="partnerEmail"
                    value={formik.values.partnerEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email address"
                  />
                  {formik.touched.partnerEmail &&
                    formik.errors.partnerEmail && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerEmail}
                      </div>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="partnerPassword"
                    id="partnerPassword"
                    value={formik.values.partnerPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                    placeholder="Password"
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </div>
                  {formik.touched.partnerPassword &&
                    formik.errors.partnerPassword && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerPassword}
                      </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                    placeholder="Confirm Password"
                  />
                  <div
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                {/* Address */}
                <div className="relative">
                  <input
                    type="text"
                    name="partnerAddress"
                    id="partnerAddress"
                    value={formik.values.partnerAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Address"
                  />
                  {formik.touched.partnerAddress &&
                    formik.errors.partnerAddress && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerAddress}
                      </div>
                    )}
                </div>

                {/* Phone and Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="tel"
                      name="partnerPhone"
                      id="partnerPhone"
                      value={formik.values.partnerPhone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Phone Number"
                    />
                    {formik.touched.partnerPhone &&
                      formik.errors.partnerPhone && (
                        <div className="text-sm text-red-600 mt-1">
                          {formik.errors.partnerPhone}
                        </div>
                      )}
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      name="partnerAge"
                      id="partnerAge"
                      value={formik.values.partnerAge}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Age"
                    />
                    {formik.touched.partnerAge && formik.errors.partnerAge && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerAge}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-4">
                {/* Work Type Radio Buttons */}
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-2">Work Type</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Hospital", "Doctor", "Freelancer"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-all ${
                          formik.values.partnerWorkType === type
                            ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="partnerWorkType"
                          value={type}
                          checked={formik.values.partnerWorkType === type}
                          onChange={formik.handleChange}
                          className="hidden"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                  {formik.touched.partnerWorkType &&
                    formik.errors.partnerWorkType && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerWorkType}
                      </div>
                    )}
                </div>

                {/* Description */}
                <div className="relative">
                  <textarea
                    name="partnerDescription"
                    id="partnerDescription"
                    value={formik.values.partnerDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Tell us about yourself and your medical experience"
                  ></textarea>
                  {formik.touched.partnerDescription &&
                    formik.errors.partnerDescription && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerDescription}
                      </div>
                    )}
                </div>

                {/* Profile Picture */}
                <div className="relative">
                  <p className="text-gray-700 font-medium mb-2">
                    Profile Picture
                  </p>
                  <input
                    type="file"
                    name="partnerImage"
                    id="partnerImage"
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "partnerImage",
                        event.currentTarget.files?.[0]
                      );
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                  />
                  {formik.errors.partnerImage &&
                    formik.touched.partnerImage && (
                      <div className="text-sm text-red-600 mt-1">
                        {formik.errors.partnerImage}
                      </div>
                    )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  {isLoading ? "Processing..." : "Register"}
                </button>
              </div>

              {/* Link to Login */}
              <div className="text-center text-gray-600 mt-4">
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/partner/login"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Social Login Divider */}
              <div className="relative flex items-center justify-center mt-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-4 text-sm text-gray-500">
                  or register with
                </span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium">f</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium">G</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium">X</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}