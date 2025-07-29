"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPackages } from "@/utils/storage";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    const allPackages = getPackages();
    setPackages(allPackages);
    setFilteredPackages(allPackages);
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearch(value);
    const lower = value.toLowerCase();
    const filtered = packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(lower) ||
        pkg.places.join(", ").toLowerCase().includes(lower)
    );
    setFilteredPackages(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Tripzy | Explore Amazing Travel Packages
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Find the perfect destination for your next adventure with Tripzy!
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by place or package..."
          className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Packages Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPackages.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No packages match your search.
          </p>
        )}

        {filteredPackages.map((pkg) => (
          <Link
            key={pkg.id}
            href={`/packages/${pkg.id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{pkg.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {pkg.description}
              </p>

              {/* Price */}
              <p className="text-lg font-bold text-green-600 mt-2">
                💰 ${pkg.price || "N/A"}
              </p>

              <div className="mt-3">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                  📅 {pkg.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
