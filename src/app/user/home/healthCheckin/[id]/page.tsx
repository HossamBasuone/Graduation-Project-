"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../../../../lib/store";

export default function ProductDetailsPage() {
  type Offer = {
    address: string;
    createdAt: string;
    date: string;
    userName: string;
    description: string;
    profileImage?: string;
    phone: number;
    price: string;
    id: number;
  };

  const [data, setData] = useState<Offer | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const params = useParams();
  const id = params.id;
  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  async function getData() {
    try {
      const res = await axios.get(
     `   http://18.199.172.137:8000/partner/single-offer/${id}`,
        { headers: { Authorization:` Bearer ${token}` } }
      );
      setData(res.data.partnerOffer);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function pay(id: number) {
    try {
      const res = await axios.post(
       ` http://18.199.172.137:8000/payment/checkout/${id}`,
        {},
        { headers: { Authorization: ` `} }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4 py-12">
      {data && (
        <div className="bg-[#1b263b] text-white rounded-lg p-6 w-full max-w-3xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex justify-center">
              {data.profileImage && (
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-[#778da9] cursor-pointer"
                  onClick={() => setModalImage(data.profileImage!)}
                />
              )}
            </div>

            <div className="w-full md:w-2/3 space-y-3">
              <h2 className="text-2xl font-bold text-[#e0e1dd]">
                {data.userName}
              </h2>
              <p className="text-sm text-gray-300">{data.description}</p>
              <p className="text-sm">
                <span className="font-semibold">📞 Phone:</span> {data.phone}
              </p>
              <p className="text-sm">
                <span className="font-semibold">📍 Address:</span> {data.address}
              </p>
              <p className="text-sm">
                <span className="font-semibold">📅 Created At:</span>{" "}
                {new Date(data.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p className="text-lg font-semibold text-[#fca311]">
                💲 {data.price} LE
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => pay(data.id)}
              className="bg-[#3d5a80] hover:bg-[#4a6fa5] text-white font-medium px-6 py-3 rounded-md transition duration-200"
            >
              Pay Now
            </button>
            <p className="text-xs text-gray-400 mt-2">Secure payment process</p>
          </div>
        </div>
      )}

      {/* Modal for image zoom */}
      {modalImage && (
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