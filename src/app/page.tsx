"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../lib/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { token, role } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth
  );

  useEffect(() => {
    if (token && role === "partner") {
      router.push("/partner/home");
    } else if (token && role === "user") {
      router.push("/user/home");
    }
  }, [token, role, router]);

  return (
    <main className="w-full overflow-hidden bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-700 text-white py-20 relative">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row  gap-10">
          <div className="lg:w-1/2 z-10 ">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
               We Provide Medical Services That You Can Trust!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              We provide the best healthcare for you and your family with the
              best doctors and specialists in all medical fields.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/partner/login">
                <button className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold py-3 px-8 rounded-full hover:scale-105  hover:text-amber-300 transition transform">
                  Partner
                </button>
              </Link>

              <Link href="/user/login">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:text-amber-300 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition transform">
                  User
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/home.avif"
                alt="Doctor smiling"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Header with Website Name */}
      <header className="absolute top-6 left-6 z-20 text-white font-bold text-3xl">
        <h5 className="text-3xl font-bold p-2 rounded-3xl bg-black">
        <span className="text-green-500">Heal</span>
            <span className="text-blue-500">Hub</span>
        </h5>
      </header>

      {/* Services Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: "🚑",
                title: "Emergency Help",
                desc: "24/7 emergency services with a complete medical team to deal with all emergency cases quickly and professionally",
              },
              {
                emoji: "💊",
                title: "Online Pharmacy",
                desc: "Consultations with the best doctors and specialists in various medical fields to provide the best healthcare",
              },
              {
                emoji: "🩺",
                title: "Medical Treatment",
                desc: "Comprehensive treatment for various conditions with the latest technologies and medical equipment and a specialized team of doctors",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                  {card.emoji}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:underline">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-700 text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { number: "3468", label: "Happy Patients" },
            { number: "557", label: "Specialist Doctors" },
            { number: "4379", label: "Success Cases" },
            { number: "32", label: "Years Experience" },
          ].map((item, index) => (
            <div key={index}>
              <div className="text-5xl font-extrabold mb-2">{item.number}</div>
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Offer Different Services To Improve Your Health
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of specialized medical services to meet
              your various health needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Who We Are</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We are an integrated medical center that provides the best
                medical services by elite specialized doctors in all fields. We
                always strive to provide the highest level of healthcare for all
                patients.
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Integrated medical team of top consultants",
                  "Latest medical devices and technologies",
                  "Excellent service 24 hours a day",
                  "Personal care for each patient",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/partner bg.jpg"
                alt="Doctor with patient"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg">
                <span className="text-xl">▶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-500 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Choose Your Path:
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            <Link href="/partner/login">
              <button className="bg-gradient-to-r from-green-400 to-teal-400 hover:text-amber-300 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition transform">
                Partner
              </button>
            </Link>
            <Link href="/user/login">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:text-amber-300 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition transform">
                User
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
