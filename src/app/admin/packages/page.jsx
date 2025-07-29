"use client";
import { useState } from "react";
import { getPackages, savePackages } from "@/utils/storage";
import toast from "react-hot-toast";

export default function PackageForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    places: "",
    date: "",
    price: "",
  });

  const handleSubmit = () => {
    const newPackage = {
      id: Date.now(),
      ...data,
      price: parseFloat(data.price) || 0,
      places: data.places.split(",").map((p) => p.trim()),
    };

    const all = getPackages();
    savePackages([...all, newPackage]);
    toast.success("✅ Package Created Successfully!");

    setData({
      title: "",
      description: "",
      image: "",
      places: "",
      date: "",
      price: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📦 Create a New Travel Package
      </h2>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Package Title</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter package title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter package description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block font-medium mb-1">Image URL</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Paste image URL"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
        />
      </div>

      {/* Places */}
      <div>
        <label className="block font-medium mb-1">Places (comma separated)</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. Kathmandu, Pokhara, Chitwan"
          value={data.places}
          onChange={(e) => setData({ ...data, places: e.target.value })}
        />
      </div>

      {/* Date */}
      <div>
        <label className="block font-medium mb-1">Available Date</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-1">Price (NPR)</label>
        <input
          type="number"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter price in NPR"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        onClick={handleSubmit}
      >
        ➕ Add Package
      </button>
    </div>
  );
}