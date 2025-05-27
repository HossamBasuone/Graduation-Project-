import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Pfooter() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-green-800 text-white text-center lg:text-left">
      <div className="px-6 py-10 text-center md:text-left">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <h6 className="uppercase font-semibold mb-4">Medical Info</h6>
            <p className="hidden md:block">
              We provide reliable health information, medical articles, and
              updates about the latest treatments and healthcare practices. Our
              goal is to empower users to make informed health decisions.
            </p>
          </div>

          <div>
            <h6 className="uppercase font-semibold mb-4">Patient Care</h6>
            <p className="hidden md:block">
              Our platform ensures that patients receive accurate advice and
              trustworthy support throughout their medical journey, helping them
              understand their conditions better.
            </p>
          </div>

          <div>
            <h6 className="uppercase font-semibold mb-4">Health Awareness</h6>
            <p className="hidden md:block">
              We raise awareness about common diseases and preventive measures
              to help people live healthier lives through education and early
              detection.
            </p>
          </div>

          <div>
            <h6 className="uppercase font-semibold mb-4">Medical Technology</h6>
            <p className="hidden md:block">
              Stay updated with the latest innovations in medical technology,
              including telemedicine, AI diagnostics, and wearable health
              devices transforming modern care.
            </p>
          </div>

          <div>
            <h6 className="uppercase font-semibold mb-4">Doctor Support</h6>
            <p className="hidden md:block">
              Healhub connects you with qualified professionals, offering
              virtual consultations and expert guidance for faster, safer, and
              more convenient medical services.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-6">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#">
            <FaFacebookF className="text-white hover:text-blue-500" />
          </a>
          <a href="#">
            <FaTwitter className="text-white hover:text-blue-400" />
          </a>
          <a href="#">
            <FaGoogle className="text-white hover:text-red-500" />
          </a>
          <a href="#">
            <FaInstagram className="text-white hover:text-pink-500" />
          </a>
          <a href="#">
            <FaLinkedinIn className="text-white hover:text-blue-700" />
          </a>
          <a href="#">
            <FaGithub className="text-white hover:text-gray-400" />
          </a>
        </div>
        <div className="text-center text-sm text-gray-400">
          © 2023 Copyright: Healhub.com
        </div>
      </div>
    </footer>
  );
}