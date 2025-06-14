"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HealthPage() {
  type HealthOfferResponse = {
    message: string;
    offers: {
      title: string;
      address: string;
      createdAt: string;
      date: string;
      id: number;
      userName: string;
      description: string;
      profileImage?: string;
      phone: number;
      price: number;
    }[];
  };

  const [data, setData] = useState<HealthOfferResponse | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  async function getHealthOffer() {
    try {
      const res = await axios.get(
        "http://18.192.104.13:8000/partner/health-offers"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getHealthOffer();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1b2a] px-4 py-8">
      {data && (
        <h1 className="text-3xl font-bold text-center text-white mb-10">
          Health Offers
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.offers?.map((product) => (
          <div
            key={product.id}
            className="bg-[#1b263b] text-white rounded-lg p-5 shadow-md"
          >
            <div className="flex items-center gap-6">
              {product.profileImage && (
                <img
                  src={product.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#778da9] cursor-pointer"
                  onClick={() => setModalImage(product.profileImage!)}
                />
              )}
              <div className="flex-1">
                <h1 className="font-semibold text-2xl">
                  <span className="text-[#3d5a80]">🩺</span> {product.title}
                </h1>
                <h2 className="text-xl font-semibold text-[#e0e1dd] mb-1">
                  Dr. {product.userName}
                </h2>
                <p className="text-sm text-[#c0c0c0]">{product.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-[#e0e1dd]">
              <p>
                <span className="font-semibold">📍 Address:</span>{" "}
                {product.address}
              </p>
              <p>
                <span className="font-semibold">📞 Phone:</span> {product.phone}
              </p>
              <p>
                <span className="font-semibold">📅 Date:</span> {product.date}
              </p>
              <p>
                <span className="font-semibold">💲 Fees:</span> {product.price}{" "}
                LE
              </p>
            </div>

            <div className="mt-5 text-center">
              <Link href={`/user/home/healthCheckin/${product.id}`}>
                <button className="bg-[#3d5a80] hover:bg-[#4a6fa5] text-white font-medium px-6 py-2 rounded-md transition duration-200">
                  Book Appointment
                </button>
              </Link>
              <p className="text-xs text-gray-400 mt-2">Clinic offer</p>
            </div>
          </div>
        ))}
        :{" "}
        <h2 className="text-4xl font-black text-white">
          We currently don&#39;t have offers Yet
        </h2>
      </div>

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
            className="absolute top-5 cursor-pointer right-5 text-white text-3xl font-bold"
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
