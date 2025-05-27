"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../../../lib/store";

interface PartnerOffer {
  address: string;
  date: string;
  description: string;
  id: number;
  partnerId: number;
  phone: string;
  price: string;
  profileImage: string;
  title: string;
  userName: string;
}

interface Appointment {
  createdAt: string;
  offerId: number;
  partnerOffer: PartnerOffer;
  sessionId: string;
  status: string;
  updatedAt: string;
  title:string;
  userId: number;
}

export default function Page() {
  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // حالة الصورة المكبرة (Modal)
  const [modalImage, setModalImage] = useState<string | null>(null);

  async function show() {
    try {
      const res = await axios.get(
        "http://18.194.24.83:8000/user/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(res.data.appointmentData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      show();
    }
  }, [token]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
    
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        🗓 Your Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-400">You have no appointments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.offerId}
              className="bg-gray-800 rounded-2xl border border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 p-5"
            >
              <img
                src={appointment.partnerOffer.profileImage}
                alt="Partner"
                className="w-full h-60 object-cover rounded-xl mb-4 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setModalImage(appointment.partnerOffer.profileImage)}
              />
              <div className="space-y-2">

                    <h1  className="font-semibold text-2xl">
                <span className="text-[#3d5a80]">🩺</span>{" "}
                {appointment.partnerOffer.title}
              </h1>
                <h2 className="text-xl font-semibold text-cyan-300">
                  {appointment.partnerOffer.userName}
                </h2>
                
                
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">Address:</span>{" "}
                  {appointment.partnerOffer.address}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">Service:</span>{" "}
                  {appointment.partnerOffer.title}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">Price:</span>{" "}
                  {appointment.partnerOffer.price} EGP
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">Phone:</span>{" "}
                  {appointment.partnerOffer.phone}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">Date:</span>{" "}
                  {appointment.partnerOffer.date}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400 font-medium">
                    Description:
                  </span>{" "}
                  {appointment.partnerOffer.description}
                </p>

                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      appointment.status === "pending" &&
                      "bg-yellow-600/20 text-yellow-400"
                    }
                    ${
                      appointment.status === "approved" &&
                      "bg-green-600/20 text-green-400"
                    }
                    ${
                      appointment.status === "rejected" &&
                      "bg-red-600/20 text-red-400"
                    }
                    ${
                      !["pending", "approved", "rejected"].includes(
                        appointment.status
                      ) && "bg-gray-700 text-gray-300"
                    }
                  `}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}: <h1> You don&#39;t put any thing yet</h1>
        </div>
      )}

\       {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Zoomed"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 cursor-pointer text-white text-3xl font-bold"
            onClick={() => setModalImage(null)}
            aria-label="Close image modal"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}