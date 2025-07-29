"use client";
import AdminRoute from "@/components/AdminRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPackages } from "@/utils/storage";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setPackages(getPackages());
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(allBookings);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
        {/* Header with glassmorphism effect */}
        <header className="flex justify-between items-center mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              toast.success("Logged out successfully");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </header>

        {/* Stats Cards with animated hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {isLoading ? (
            <>
              <div className="bg-white/80 p-6 rounded-xl shadow-sm h-32 animate-pulse"></div>
              <div className="bg-white/80 p-6 rounded-xl shadow-sm h-32 animate-pulse"></div>
              <div className="bg-white/80 p-6 rounded-xl shadow-sm h-32 animate-pulse"></div>
            </>
          ) : (
            <>
              <div className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 text-sm font-medium">Total Packages</h2>
                    <p className="text-3xl font-bold mt-2">{packages.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 text-sm font-medium">Total Bookings</h2>
                    <p className="text-3xl font-bold mt-2">{bookings.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 text-sm font-medium">Latest Booking</h2>
                    <p className="text-lg font-semibold mt-2 truncate">
                      {bookings.length > 0 ? bookings[bookings.length - 1].name : "No Bookings"}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions with modern buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Link
            href="/admin/packages"
            className="group relative overflow-hidden bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Manage Packages</h3>
                <p className="text-sm text-gray-500">Add, edit or remove travel packages</p>
              </div>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          
          <Link
            href="/admin/bookings"
            className="group relative overflow-hidden bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-300"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View Bookings</h3>
                <p className="text-sm text-gray-500">Check all customer reservations</p>
              </div>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-green-400 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Recent Packages with card hover effects */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Packages</h2>
            <Link href="/admin/packages" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/80 p-4 rounded-lg shadow-sm h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.slice(-3).reverse().map((pkg) => (
                <div key={pkg.id} className="group bg-white/80 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{pkg.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pkg.places.slice(0, 3).map((place, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {place}
                        </span>
                      ))}
                      {pkg.places.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          +{pkg.places.length - 3} more
                        </span>
                      )}
                    </div>
                    <button className="w-full mt-2 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}