"use client";
import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPasswordUser() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: code
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendEmail = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post(
        "http://18.192.104.13:8000/user/forgot-password",
        { userEmail: email }
      );
      setSuccessMsg(res.data.message);
      setStep(2);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await axios.post("http://18.192.104.13:8000/user/verify-code", {
        code: resetCode,
      });
      router.push("/user/reset");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <div className="bg-indigo-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        {/* Left Side: Image and Text */}
        <div className="w-full md:w-1/2 relative p-8 flex flex-col justify-between">
          <div className="flex items-center mb-8">
            <h2 className="text-white text-2xl font-bold">
              {" "}
              <span className="text-green-500">Heal</span>
              <span className="text-blue-500">Hub</span>
            </h2>
            <div className="ml-auto  font-bold py-1 px-4 rounded-full">
              <img src="/health-_1_.ico" className="h-10" alt="Logo" />
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative size-2/3">
              <div className="text-center">
                <div className="">
                  <img
                    src="/forgot-password.png"
                    className=" w-full relative"
                    alt="Forgot password illustration"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-white  text-lg">
            You can change your password by entering your email address.
            <br />
            You will then receive a verification code. <br />
            Enter the code to proceed with resetting your password.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 bg-white rounded-tl-3xl rounded-bl-3xl p-8">
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
              {step === 1 ? "Forgotten password" : "Enter verification code"}
            </h1>

            {errorMsg && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="w-full bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                {successMsg}
              </div>
            )}

            {/* Email Form */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address"
                    required
                  />
                </div>

                <button
                  onClick={handleSendEmail}
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  {isLoading ? "Sending..." : "Send reset code"}
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href="/user/login"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Return to login
                  </Link>
                </div>
              </div>
            )}

            {/* Code Verification Form */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Verification code"
                    required
                  />
                </div>

                <button
                  onClick={handleSubmitCode}
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  {isLoading ? "Verifying..." : "Submit code"}
                </button>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Back to email
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="mt-8">
                <div className="text-center text-gray-500 mb-4">
                  Need an account?{" "}
                  <Link
                    href="/user/register"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
