"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo from "../../../../public/img1.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setToken } from "../../../lib/authSlice";

export default function LoginPartner() {
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = async (values: {
    partnerEmail: string;
    partnerPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://18.199.172.137:8000/partner/signin",
        values
      );
      localStorage.setItem("token", res.data.token);
      dispatch(setToken(res.data.token));
      router.push("/partner/home");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      partnerEmail: "",
      partnerPassword: "",
    },
    validationSchema: Yup.object({
      partnerEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      partnerPassword: Yup.string()
        .required("Password is required")
        .min(6, "Min length is 6")
        .max(20, "Max length is 20"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-800 to-green-500">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left side */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-r from-indigo-950 to-indigo-600 text-white px-10 py-20">
<Link href={'/'}> 
              <h5 className="text-3xl self-start justify-self-start  font-bold p-2 rounded-3xl bg-black my-3">
        <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>
        </h5>
</Link>

          <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="mb-8 rounded-md"
          />
          <p className="text-center text-lg leading-relaxed">
            Discover the power of personalized health insights and seamless
            tracking with Heal Hub.
          </p>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
          {apiError && (
            <div className="bg-red-500 text-white text-center p-3 mb-4 rounded-md font-semibold">
              {apiError}
            </div>
          )}
         <div className="relative mb-6">
  <Link href={'/'} className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl ">🔙</Link>
  <h2 className="text-3xl font-bold text-indigo-800 text-center">Log in</h2>
</div>


         

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                name="partnerEmail"
                id="email"
                value={formik.values.partnerEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email address"
              />
              {formik.touched.partnerEmail && formik.errors.partnerEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.partnerEmail}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="partnerPassword"
                id="password"
                value={formik.values.partnerPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
              />
              <div
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
              {formik.touched.partnerPassword &&
                formik.errors.partnerPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.partnerPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Forgot password */}
          <div className="text-right mt-4">
            <Link
              href="/partner/forget"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgotten password
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">or log in with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-4 gap-3">
            <div className="border rounded-lg p-2 text-center text-xl">𝒇</div>
            <div className="border rounded-lg p-2 text-center text-xl">G</div>
            <div className="border rounded-lg p-2 text-center text-xl">𝕏</div>
            <div className="border rounded-lg p-2 text-center text-xl">🍎</div>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Need an account?{" "}
            <Link
              href="/partner/register"
              className="text-blue-800 font-bold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}