"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../../../lib/store";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Create() {

  const [Data, setData] = useState({
    userName: "",
    phone: "",
    address: "",
    description: "",
    profilePic: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  type PartnerFormValues = {
    userName: string;
    phone: string;
    address: string;
    description: string;
    profilePic: File | null;
    price: string;
    date: string;
    title:string;
  };

  const formik = useFormik<PartnerFormValues>({
    initialValues: {
      userName: "",
      profilePic: null,
      address: "",
      phone: "",
      description: "",
      price: "",
      date: "",
      title:"",
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
price: Yup.number()
  .typeError("Price must be a number")
  .required("Price is required")
  .min(25, "Price must be at least 25 EGP"),
      date: Yup.date()
      .required("Date is required")
      .min(new Date(Date.now() + 24 * 60 * 60 * 1000), "Date must be in the future"),
          title:Yup.string()
        .required("Please Enter Tittle for your  Offer")
        }),
    onSubmit: createAd,

  });

  async function getData() {
    try {
      const res = await axios.get(
        "http://18.194.24.83:8000/partner/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
   
      setData(res.data.partnerData);

      formik.setFieldValue("userName", res.data.partnerData.userName);
      formik.setFieldValue("phone", res.data.partnerData.phone);
      formik.setFieldValue("address", res.data.partnerData.address);
      formik.setFieldValue("description", res.data.partnerData.description);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  async function createAd(values: PartnerFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("date", values.date);
      formData.append("title",values.title)
      if (values.profilePic) {
        formData.append("profilePic", values.profilePic);
      }

      const res = await axios.post(
        "http://18.194.24.83:8000/partner/offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res)
      setApiSuccess(res.data.message);
      setApiError("");
    } catch (error) {
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
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("/bg_create.jpg")`,
        backgroundColor: "#111827",
      }}
    >
      <div className="flex w-full justify-center items-center backdrop-blur-sm bg-black/50">
        <div className="w-full mt-3 mb-3 max-w-2xl p-10 rounded-xl bg-gray-900/80 shadow-xl my">
          <h1 className="text-3xl md:text-4xl text-center text-blue-300 font-bold mb-8">
            Create Your Personal Ad
          </h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
              id="title"
              label="Title of your offer  "
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
              error={
                formik.touched.description ? formik.errors.description : ""
              }
            />

            <InputField
              id="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price ? formik.errors.price : ""}
            />

            <DateField
              id="date"
              label="Date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date ? formik.errors.date : ""}
            />

            <div className="flex justify-center">
              {formik.values.profilePic ? (
                <img
                  src={URL.createObjectURL(formik.values.profilePic)}
                  alt="Profile Preview"
                  className="w-40 h-32 rounded-xl object-cover"
                />
              ) : Data.profilePic ? (
                <img
                  src={Data.profilePic}
                  alt="Profile from Data"
                  className="w-40 h-32 rounded-xl object-cover"
                />
              ) : (
                <div className="w-40 h-32 rounded-xl bg-blue-50 flex items-center justify-center">
                  <span className="text-black text-sm">No Image</span>
                </div>
              )}
            </div>

            <div className="flex self-center">
              <input
                type="file"
                name="profilePic"
                id="profilePic"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Create Ad"}
            </button>

            {apiSuccess && (
              <div className="text-green-500 mt-4 text-center">
                {apiSuccess}
              </div>
            )}
            {apiError && (
              <div className="text-red-500 mt-4 text-center">{apiError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Text input field component
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

// Date input field component
function DateField({
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
        type="date"
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
  