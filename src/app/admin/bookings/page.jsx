"use client";
import AdminRoute from "@/components/AdminRoute";
import { getBookings } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => setBookings(getBookings()), []);

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📖 User Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-lg text-center mt-10">
            No bookings yet.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Booking #{i + 1}
                </h2>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Name:</strong> {b.name}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Email:</strong> {b.email}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Phone:</strong> {b.phone}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong className="text-gray-900">Package ID:</strong> {b.packageId}
                </p>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  📄 View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminRoute>
  );
}
