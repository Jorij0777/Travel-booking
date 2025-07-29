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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">🌍 Welcome to Tripzy</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover your next escape with hand-picked travel experiences designed for dreamers,
          adventurers, and explorers. ✈️✨
        </p>
        <p className="text-sm mt-2 text-gray-500 italic">
          “Travel is the only thing you buy that makes you richer.”
        </p>
        <div className="mt-6">
          <Link
            href="#packages"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="🔍 Search by destination, place, or keyword..."
          className="w-full px-5 py-3 rounded-xl border shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>

      {/* Package Grid */}
      <section id="packages" className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPackages.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No matching packages found. Try a different destination!
          </p>
        ) : (
          filteredPackages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-blue-800">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {pkg.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">💰 ${pkg.price}</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    📅 {pkg.date}
                  </span>
                </div>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  Book Now →
                </button>
              </div>
            </Link>
          ))
        )}
      </section>

      {/* Call to Adventure */}
      <div className="mt-20 text-center bg-blue-100 py-10 rounded-2xl shadow-inner">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          Ready for the journey of a lifetime?
        </h2>
        <p className="text-gray-700 mb-4">
          Don't just dream about it — book your next adventure with Tripzy today!
        </p>
        <Link
          href="#packages"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg transition"
        >
          Explore Packages
        </Link>
      </div>
    </div>
  );
}
