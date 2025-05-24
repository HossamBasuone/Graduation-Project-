"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userlogo from "../../../../public/Whats Up Hello GIF by Make it Move.gif";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setToken } from "../../../lib/authSlice";

export default function LoginUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: {
    userEmail: string;
    userPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://18.199.172.137:8000/user/signin",
        values
      );
      dispatch(setToken(res.data.token));
      router.push("/user/home");
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userPassword: "",
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .email("Invalid userEmail")
        .required("userEmail is required"),
      userPassword: Yup.string()
        .required("userPassword is required")
        .min(6)
        .max(20),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-400 to-indigo-600 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl m-auto rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* Left side: Logo and text */}
        <div className="bg-indigo-800 text-white w-full lg:w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>
          </h2>

          <div className="my-6 flex justify-center">
            <div className=" size-80 lg:size-70 bg-cover relative">
              <Image
                src={userlogo}
                alt="Health Icon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-lg text-center">
            Discover the power of personalized health <br />
            insights and seamless tracking with  <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>.
          </p>
        </div>

        {/* Right side: Login form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center relative">
       

          <div className="w-full max-w-md mx-auto">
            {apiError && (
              <div className="w-full bg-red-500 text-white text-center p-3 mb-4 rounded-md font-semibold">
                {apiError}
              </div>
            )}

                    <div className="relative mb-6">
  <Link href={'/'} className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl ">🔙</Link>
  <h2 className="text-3xl font-bold text-indigo-800 text-center">Log in</h2>
</div>


            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="userEmail"
                  placeholder="Email address"
                  value={formik.values.userEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.userEmail && formik.errors.userEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.userEmail}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  placeholder="Password"
                  value={formik.values.userPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div
                  className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
                {formik.touched.userPassword &&
                  formik.errors.userPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.userPassword}
                    </p>
                  )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>

              <div className="text-right">
                <Link
                  href="/user/forget"
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Forgotten password
                </Link>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or log in with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  className="flex justify-center items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  type="button"
                >
                  <span className="text-xl">ƒ</span>
                </button>
                <button
                  className="flex justify-center items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  type="button"
                >
                  <span className="text-xl">G</span>
                </button>
                <button
                  className="flex justify-center items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  type="button"
                >
                  <span className="text-xl">𝕏</span>
                </button>
                <button
                  className="flex justify-center items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  type="button"
                >
                  <span className="text-xl">🍎</span>
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                  Need an account?{" "}
                  <Link
                    href="/user/register"
                    className="text-teal-500 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
