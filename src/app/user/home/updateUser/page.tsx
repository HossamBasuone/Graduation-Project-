"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { store } from "../../../../lib/store";

export default function UserProfileUpdate() {
  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  type UserFormValues = {
    userName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    age: string;
    gender: string;
    profilePic: File | null;
  };

  const formik = useFormik<UserFormValues>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      age: "",
      gender: "",
      profilePic: null,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Name is required"),
      // email: Yup.string().email("Invalid email").required("Email is required"),
      // password: Yup.string().min(6).required("Password is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number"),
      age: Yup.number().required("Age is required").min(1).max(120),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: updateUserProfile,
  });

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  async function fetchUserProfile() {
    try {
      const res = await axios.get("http://18.199.172.137:8000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.userData;
      console.log(data);
      formik.setValues({
        userName: data.userName || "",
        email: data.email || "",
        password: "",
        address: data.address || "",
        phone: data.phone || "",
        age: data.age?.toString() || "",
        gender: data.gender || "",
        profilePic: null,
      });

      setProfileImageUrl(data.profilePic || null);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function updateUserProfile(values: UserFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("newUserName", values.userName);
      if (values.email) {
        formData.append("newEmail", values.email);
      }
      if (values.password) {
        formData.append("newPassword", values.password);
      }
      formData.append("newAddress", values.address);
      formData.append("newPhone", values.phone);
      formData.append("newAge", values.age);
      formData.append("newGender", values.gender);
      if (values.profilePic) {
        formData.append("profilePic", values.profilePic);
      }

      const res = await axios.put(
        "http://18.199.172.137:8000/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setApiSuccess("Profile updated successfully");
      setApiError("");
      if (res.data.updatedUser?.profilePic) {
        setProfileImageUrl(res.data.updatedUser.profilePic);
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setApiSuccess("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePic", file);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/bg_create.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center my-5">
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-8 w-full max-w-md mx-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Create Your Personal Ad
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* User Name */}
            <div>
              <label htmlFor="userName" className="block text-white mb-2">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.userName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-white mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-white mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>

            {/* Description (using gender field for this) */}
            <div>
              <label htmlFor="gender" className="block text-white mb-2">
                Description
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
              />
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </p>
              )}
            </div>

            {/* Hidden Fields */}
            <input type="hidden" name="email" value={formik.values.email} />
            <input
              type="hidden"
              name="password"
              value={formik.values.password}
            />
            <input type="hidden" name="age" value={formik.values.age} />

            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              {formik.values.profilePic ? (
                <img
                  src={URL.createObjectURL(formik.values.profilePic)}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                />
              ) : profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}

              <div className="mt-4">
                <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="ml-3 text-sm text-gray-300">
                  {formik.values.profilePic
                    ? formik.values.profilePic.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-all disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>

            {/* Messages */}
            {apiSuccess && (
              <div className="text-green-500 text-center mt-2">
                {apiSuccess}
              </div>
            )}
            {apiError && (
              <div className="text-red-500 text-center mt-2">{apiError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}