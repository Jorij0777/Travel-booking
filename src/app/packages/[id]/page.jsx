"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPackages, getBookings, saveBookings } from "@/utils/storage";
import toast from "react-hot-toast";

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const pack = getPackages().find((p) => p.id == id);
    setPkg(pack);
  }, [id]);

  const bookNow = () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all fields!");
      return;
    }

    const bookings = getBookings();
    bookings.push({ packageId: id, ...form });
    saveBookings(bookings);
    toast.success("✅ Booking successful!");
    setForm({ name: "", email: "", phone: "" });
  };

  if (!pkg) return <p className="text-center p-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Package Info */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{pkg.title}</h1>
            <p className="text-gray-600 mt-3">{pkg.description}</p>
            <p className="text-gray-700 font-semibold mt-3">
              📅 Available: <span className="text-blue-600">{pkg.date}</span>
            </p>
            <p className="text-green-600 font-bold text-xl mt-2">
              💰 Price: NPR {pkg.price || "Not set"}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book This Package</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <button
              onClick={bookNow}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              📩 Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
