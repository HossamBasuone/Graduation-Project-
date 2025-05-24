"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { clearData } from "../../../lib/authSlice";
import { useDispatch } from "react-redux";

export default function Unavbar() {
  let dispatch = useDispatch();

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-blue-900 border-gray-200  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/health-_1_.ico" className="h-8" alt="Logo" />
          <h5 className="text-3xl font-bold p-2 rounded-3xl">
            <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>
          </h5>
        </Link>

        {/* Hamburger button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navbar links */}
        <div
          className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                href="/user/home"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/user/home")
                    ? "text-green-400 font-bold"
                    : "text-white hover:text-black"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/user/home/healthPage"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/user/home/healthPage")
                    ? "text-green-400 font-bold"
                    : "text-white hover:text-black"
                }`}
              >
                Health
              </Link>
            </li>
            <li>
              <Link
                href="/user/home/socialPage"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/user/home/socialPage")
                    ? "text-green-400 font-bold"
                    : "text-white hover:text-black"
                }`}
              >
                Social
              </Link>
            </li>
            <li>
              <Link
                href="/user/home/updateUser"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/user/home/updateUser")
                    ? "text-green-400 font-bold"
                    : "text-white hover:text-black"
                }`}
              >
                Update
              </Link>
            </li>
            <li>
              <Link
                href="/user/home/appointment"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/user/home/appointment")
                    ? "text-green-400 font-bold"
                    : "text-white hover:text-black"
                }`}
              >
                Appointment
              </Link>
            </li>
            <li>
              <Link href="/">
                <button
                  onClick={() => {
                    dispatch(clearData());
                  }}
                  className="block py-2 px-3 text-white rounded-sm hover:text-red-400 md:p-0 cursor-pointer"
                >
                  logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
