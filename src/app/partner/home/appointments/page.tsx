"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface User {
  id: number;
  userName: string;
  email: string;
  address: string;
  phone: string;
  age: string;
  gender: string;
  profilePic: string | null;
}

interface PartnerOffer {
  id: number;
  title: string;
  userName: string;
  description: string;
  profileImage: string;
  price: string;
  date: string;
  phone: string;
  address: string;
  partnerId: number;
  createdAt: string;
  updatedAt: string;
}

interface Appointment {
  userId: number;
  offerId: number;
  sessionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  partnerOffer: PartnerOffer;
  user: User;
}

export default function Page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  const getAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://18.192.104.13:8000/partner/appointments",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  // Handle scroll event to toggle scroll-to-top arrow visibility
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0c121c]">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c121c] p-4 md:p-8 text-white relative">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span role="img" aria-label="calendar">
          📅
        </span>{" "}
        Your Appointments
      </h1>
      {appointments.length > 0 ? (
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              key={appointment.sessionId}
              className="bg-[#151e2e] p-4 md:p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4"
            >
              <img
                src={appointment.partnerOffer.profileImage}
                alt={appointment.partnerOffer.title}
                onClick={() =>
                  setPreviewImage(appointment.partnerOffer.profileImage)
                }
                className="w-full md:w-[400px] h-[300px] object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
              />

              <div className="flex-1 space-y-2 text-[15px]">
                <h2 className="text-xl font-bold text-cyan-400">
                  {appointment.partnerOffer.userName}
                </h2>

                <p>
                  <span className="text-cyan-400 font-semibold">Address:</span>{" "}
                  {appointment.partnerOffer.address}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Service:</span>{" "}
                  {appointment.partnerOffer.title}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Price:</span>{" "}
                  {appointment.partnerOffer.price} EGP
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Phone:</span>{" "}
                  {appointment.partnerOffer.phone}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Date:</span>{" "}
                  {appointment.partnerOffer.date}
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">
                    Description:
                  </span>{" "}
                  {appointment.partnerOffer.description}
                </p>

                {appointment.user.profilePic && (
                  <div className="mt-4">
                    <strong className="text-cyan-400">User Image:</strong>
                    <div className="mt-2">
                      <img
                        src={appointment.user.profilePic}
                        alt={appointment.user.userName}
                        onClick={() =>
                          setPreviewImage(appointment.user.profilePic!)
                        }
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 cursor-pointer hover:scale-110 transition"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {appointment.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No appointments found.</p>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer font-bold bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center z-50"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewImage(null);
            }}
          >
            ×
          </button>

          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Scroll to Top Arrow */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
