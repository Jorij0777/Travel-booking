"use client";
import AdminRoute from "@/components/AdminRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPackages } from "@/utils/storage";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setPackages(getPackages());
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(allBookings);
  }, []);

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              toast.success("Logged out");
              window.location.href = "/admin/login";
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm">Total Packages</h2>
            <p className="text-3xl font-bold">{packages.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm">Total Bookings</h2>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-500 text-sm">Latest Booking</h2>
            <p className="text-lg font-semibold">
              {bookings.length > 0 ? bookings[bookings.length - 1].name : "No Bookings"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/packages"
            className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 block text-center text-lg font-medium"
          >
            📦 Manage Packages
          </Link>
          <Link
            href="/admin/bookings"
            className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 block text-center text-lg font-medium"
          >
            📖 View Bookings
          </Link>
        </div>

        {/* Recent Packages */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Recent Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.slice(-3).reverse().map((pkg) => (
              <div key={pkg.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                <p className="text-sm text-gray-500">{pkg.places.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
