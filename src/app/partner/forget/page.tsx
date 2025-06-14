"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPasswordPartner() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendEmail = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post(
        "http://18.192.104.13:8000/partner/forgot-password",
        { partnerEmail: email }
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
      await axios.post("http://18.192.104.13:8000/partner/verify-code", {
        code: resetCode,
      });
      router.push("/partner/reset");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-600">
      {/* Left card */}
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-t from-green-400 to-green-900">
        <div className="relative w-full max-w-md p-8 text-white">
          <Link href={"/"}>
            <h5 className="my-3 text-3xl font-bold p-2 rounded-3xl bg-black text-center">
              <span className="text-green-500">Heal</span>
              <span className="text-blue-500">Hub</span>
            </h5>
          </Link>

          <div className="mb-8 flex justify-center">
            <img src="/health-_1_.ico" className="h-15" alt="Logo" />
          </div>
          <p className="text-center text-lg">
            Discover the power of personalized health insights and seamless
            tracking with MediTrack.
          </p>
        </div>
      </div>

      {/* Right card */}
      <div className="md:w-1/2 flex items-center justify-center bg-white py-10 px-6">
        <div className="w-full max-w-md">
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMsg}
            </div>
          )}
          <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
            Forgotten password
          </h2>

          {step === 1 && (
            <>
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>
              <button
                onClick={handleSendEmail}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-200"
              >
                {isLoading ? "Sending..." : "Send reset code"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter verification code"
                />
              </div>
              <button
                onClick={handleSubmitCode}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-200"
              >
                {isLoading ? "Verifying..." : "Verify code"}
              </button>
            </>
          )}

          <div className="mt-6 text-center text-sm">
            <Link
              href="/partner/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to login
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Need an account?
            <Link
              href="/partner/register"
              className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
