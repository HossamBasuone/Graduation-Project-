"use client";
import React, {  useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { store } from "../../../../../lib/store";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdateOfferPage() {
  const { id } = useParams();
  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "At least 10 characters"),
      price: Yup.string().required("Price is required"),
    }),
    onSubmit: handleUpdateOffer,
  });

  async function handleUpdateOffer(values: {
    title: string;
    description: string;
    price: string;
  }) {
    try {
      const res = await axios.put(
        `http://18.199.172.137:8000/partner/update-offer/${id}`,
        values, // values in request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setApiMessage("Offer updated successfully!");
      setApiError("");
      console.log(res);
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setApiMessage("");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-xl p-8 rounded-lg bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Offer</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <InputField
            id="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title ? formik.errors.title : ""}
          />

          <InputField
            id="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description ? formik.errors.description : ""}
          />

          <InputField
            id="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price ? formik.errors.price : ""}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Update Offer
          </button>

          {apiMessage && (
            <div className="text-green-400 text-center">{apiMessage}</div>
          )}
          {apiError && (
            <div className="text-red-500 text-center">{apiError}</div>
          )}
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
   value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;

}) {
  return (
    <div className="relative z-0 w-full group">
      <input
        type="text"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block py-3 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-lg text-gray-300 transition-all transform scale-75 -translate-y-6 top-3 origin-[0] peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
    </div>
  );
}
