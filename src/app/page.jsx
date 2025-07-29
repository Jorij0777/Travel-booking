"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPackages } from "@/utils/storage";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      const allPackages = getPackages();
      setPackages(allPackages);
      setFilteredPackages(allPackages);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
    <div className="min-h-screen bg-gray-50"> {/* 40% dominant color */}
      {/* Hero Section with Adventure Theme */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Adventure-themed background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-70"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <span className="text-orange-400">ADVENTURE</span> AWAITS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover wild destinations and create stories worth telling. Our expert guides will take you beyond the ordinary.
          </p>
          <div className="flex gap-4">
            <Link
              href="#packages"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              EXPLORE EXPEDITIONS
            </Link>
            <Link
              href="#"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
            >
              MEET OUR GUIDES
            </Link>
          </div>
        </div>
        
        {/* Adventure stats floating cards */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-500">150+</div>
              <div className="text-gray-700 text-sm font-medium">DESTINATIONS</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-500">24/7</div>
              <div className="text-gray-700 text-sm font-medium">SUPPORT</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-500">5K+</div>
              <div className="text-gray-700 text-sm font-medium">ADVENTURERS</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-500">100%</div>
              <div className="text-gray-700 text-sm font-medium">SATISFACTION</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-100"> {/* 50% secondary color */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">FIND YOUR NEXT CHALLENGE</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search for mountain treks, jungle expeditions, desert safaris, and more adrenaline-packed adventures
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="🔍 Search for 'Everest Base Camp', 'Amazon Trek', 'Sahara Safari'..."
              className="w-full px-6 py-4 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section id="packages" className="py-16 bg-white"> {/* 10% accent colors */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">FEATURED ADVENTURES</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Filter
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Sort
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No adventures found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filter to find the perfect adventure for you.
              </p>
              <button 
                onClick={() => {
                  setSearch("");
                  setFilteredPackages(packages);
                }}
                className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {pkg.difficulty || 'MODERATE'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                      <span className="text-orange-500 font-bold text-lg">${pkg.price}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {pkg.places.slice(0, 3).map((place, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {place}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {pkg.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {pkg.duration || '7 days'}
                      </div>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Adventure */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            READY TO PUSH YOUR LIMITS?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of adventurers and get exclusive access to off-the-grid expeditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#packages"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-300"
            >
              JOIN AN EXPEDITION
            </Link>
            <Link
              href="#"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-300"
            >
              CONTACT OUR TEAM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}