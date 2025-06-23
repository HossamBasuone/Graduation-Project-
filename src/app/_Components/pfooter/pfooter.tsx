"use client";
import React, { useState } from "react";

export default function Pfooter() {
  const sections = [
    {
      title: "Medical Info",
      content:
        "We provide reliable health information, medical articles, and updates about the latest treatments and healthcare practices. Our goal is to empower users to make informed health decisions.",
    },
    {
      title: "Patient Care",
      content:
        "Our platform ensures that patients receive accurate advice and trustworthy support throughout their medical journey, helping them understand their conditions better.",
    },
    {
      title: "Health Awareness",
      content:
        "We raise awareness about common diseases and preventive measures to help people live healthier lives through education and early detection.",
    },
    {
      title: "Medical Technology",
      content:
        "Stay updated with the latest innovations in medical technology, including telemedicine, AI diagnostics, and wearable health devices transforming modern care.",
    },
    {
      title: "Doctor Support",
      content:
        "Healhub connects you with qualified professionals, offering virtual consultations and expert guidance for faster, safer, and more convenient medical services.",
    },
  ];

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-green-800 text-white text-center lg:text-left">
      <div className="px-6 py-10 text-center md:text-left">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h6
                className="uppercase font-semibold mb-2 cursor-pointer md:cursor-default"
                onClick={() => toggleSection(index)}
              >
                {section.title}
              </h6>

              {/* Content on desktop */}
              <p className="hidden md:block">{section.content}</p>

              {/* Toggleable content on mobile */}
              <p
                className={`text-sm transition-all duration-300 md:hidden ${
                  openIndexes.includes(index) ? "block mt-1" : "hidden"
                }`}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 py-6">
        <div className="text-center text-sm text-gray-300">
          © 2023 Copyright: Healhub.com
        </div>
      </div>
    </footer>
  );
}
