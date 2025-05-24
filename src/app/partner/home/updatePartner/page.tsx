"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { store } from "../../../../lib/store";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Update() {
  const router = useRouter();

  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  type PartnerFormValues = {
    userName: string;
    phone: string;
    address: string;
    description: string;
    profilePic: File | null;
  };

  const formik = useFormik<PartnerFormValues>({
    initialValues: {
      userName: "",
      phone: "",
      address: "",
      description: "",
      profilePic: null,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Name is required"),
      phone: Yup.string()
        .required("Please Enter Right Number")
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egypt number"),
      address: Yup.string().required("Address is required"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: updateProfile,
  });

  async function getPartnerData() {
    try {
      const res = await axios.get(
        "http://18.199.172.137:8000/partner/profile",
        {
          headers: {
            Authorization:` Bearer ${token}`,
          },
        }
      );

      const data = res.data.partnerData;
      formik.setValues({
        userName: data.userName || "",
        phone: data.phone || "",
        address: data.address || "",
        description: data.description || "",
        profilePic: null,
      });
      setProfileImageUrl(data.profilePic || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getPartnerData();
    }
  }, [token]);

  async function updateProfile(values: PartnerFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("newUserName", values.userName);
      formData.append("newPhone", values.phone);
      formData.append("newAddress", values.address);
      formData.append("newDescription", values.description);
      if (values.profilePic) {
        formData.append("profilePic", values.profilePic);
      }

      const res = await axios.put(
        "http://18.199.172.137:8000/partner/update-profile",
        formData,
        {
          headers: {
            Authorization:` Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setApiSuccess("Profile updated successfully");
      setApiError("");
      if (res.data.updatedPartner?.profilePic) {
        setProfileImageUrl(res.data.updatedPartner.profilePic);
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setApiSuccess("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePic", file);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage:` url('/bg_create.jpg')` }}
    >
      <div className="bg-[#0f172a]/80 p-10 rounded-2xl shadow-xl w-full max-w-xl text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create Your Personal Ad
        </h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <InputField
            id="userName"
            label="User Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName ? formik.errors.userName : ""}
          />

          <InputField
            id="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone ? formik.errors.phone : ""}
          />

          <InputField
            id="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address ? formik.errors.address : ""}
          />

          <InputField
            id="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description ? formik.errors.description : ""}
          />

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {formik.values.profilePic ? (
              <img
                src={URL.createObjectURL(formik.values.profilePic)}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-white">No Image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>

          {apiSuccess && <div className="text-green-400">{apiSuccess}</div>}
          {apiError && <div className="text-red-400">{apiError}</div>}
        </form>
      </div>
    </div>
  );
}

// Reusable InputField
function InputField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  value: any;
  onChange: any;
  onBlur: any;
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-white mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
    </div>
  );
}