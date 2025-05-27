"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { store } from "../../../lib/store";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Page() {
  type PartnerData = {
    profilePic: string;
    address: string;
    userName: string;
    phone: string;
    workType: string;
    description: string;
  };

  type Offer = {
    id: number;
    userName: string;
    description: string;
    phone: string;
    address: string;
    price: string;
    profileImage: string;
    date: string;
    title: string;
  };

  const [data, setData] = useState<PartnerData | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const token = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.token
  );

  async function getData() {
    try {
      const res = await axios.get("http://18.194.24.83:8000/partner/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.partnerData);
    } catch (err) {
      console.log(err);
    }
  }

  async function getoffer() {
    try {
      const res = await axios.get("http://18.194.24.83:8000/partner/offers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(res.data.unPaidOffers);
    } catch (err) {
      console.log(err);
    }
  }

  async function delteteoffer(kk: number) {
    try {
      await axios.delete(
        `http://18.194.24.83:8000/partner/delete-offer/${kk}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getoffer();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getData();
      getoffer();
    }
  }, [token]);

  return (
    <>
      {/* Image Modal */}
 {selectedImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedImage(null)}
      className="absolute top-5 right-5 cursor-pointer text-white text-3xl font-bold bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center z-50"
    >
      ×
    </button>

    <img
      src={selectedImage}
      alt="Full View"
      className="max-w-full max-h-full rounded-xl shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}


      {data && offers && (
        <div
          className="relative min-h-screen bg-cover bg-center px-4 py-10"
          style={{ backgroundImage: "url('/partner bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#0E0E52]/60 backdrop-blur-sm z-0"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Partner Data */}
            <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto">
              <img
                src={data.profilePic}
                alt="Profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg mt-4 mb-6 cursor-pointer"
                onClick={() => setSelectedImage(data.profilePic)}
              />
              <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                Let&#39;s book the next meeting
              </h1>
              <p className="text-gray-300 text-base sm:text-lg px-2 mb-6 leading-relaxed">
                Secure our next meeting. Let&#39;s continue to shape a successful
                partnership.
                <br />
                Your success is our priority.
              </p>

              <div className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-md w-full text-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <p>
                  <span className="font-bold text-purple-300">Name:</span>{" "}
                  {data.userName}
                </p>
                <p>
                  <span className="font-bold text-purple-300">Major:</span>{" "}
                  {data.workType}
                </p>
                <p>
                  <span className="font-bold text-purple-300">Phone:</span>{" "}
                  {data.phone}
                </p>
                <p>
                  <span className="font-bold text-purple-300">Description:</span>{" "}
                  {data.description}
                </p>
              </div>

              <button className="mt-8 mb-3 bg-[#7B61FF] hover:bg-[#6a4fff] transition-all text-white font-semibold py-3 px-10 rounded-full shadow-xl text-base sm:text-lg">
                Book a call
              </button>
            </div>

            {/* Offers Data */}
            <div className="h-[500px] overflow-y-auto w-full max-w-3xl mx-auto p-4 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
              <h1 className="text-center font-bold mb-3 text-[red] border-[#6a4fff] border-2 rounded-2xl">
                Your offer&#39;s
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: Math.ceil(offers.length / 2) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {[offers[index * 2], offers[index * 2 + 1]]
                        .filter(Boolean)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="bg-white/10 p-4 rounded-xl shadow-md text-white space-y-2"
                          >
                            <img
                              src={product.profileImage}
                              alt=""
                              className="w-full h-32 object-cover rounded-md mb-2 cursor-pointer"
                              onClick={() => setSelectedImage(product.profileImage)}
                            />
                            <h1 className="font-bold text-purple-300">
                              ID: {product.id}
                            </h1>
                            <p className="text-sm">{product.date}</p>
                            <h2 className="text-lg font-semibold">
                              {product.title}
                            </h2>
                            <div className="flex justify-between">
                              <button
                                className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded mt-2"
                                onClick={() => delteteoffer(product.id)}
                              >
                                Clear
                              </button>
                              <Link href={`/partner/home/updateOffer/${product.id}`}>
                                <button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded mt-2">
                                  Update
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
