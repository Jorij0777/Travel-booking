"use client";
import { useState } from "react";
import { getPackages, savePackages } from "@/utils/storage";
import toast from "react-hot-toast";

export default function PackageForm() {
  const [data, setData] = useState({ title: "", description: "", image: "", places: "", date: "" });

  const handleSubmit = () => {
    const newPackage = {
      id: Date.now(),
      ...data,
      places: data.places.split(",").map(p => p.trim())
    };
    const all = getPackages();
    savePackages([...all, newPackage]);
    toast.success("Package Created");
    setData({ title: "", description: "", image: "", places: "", date: "" });
  };

  return (
    <div className="p-4">
      <input className="border p-2 m-1 w-full" placeholder="Title" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} />
      <textarea className="border p-2 m-1 w-full" placeholder="Description" value={data.description} onChange={(e) => setData({...data, description: e.target.value})}></textarea>
      <input className="border p-2 m-1 w-full" placeholder="Image URL" value={data.image} onChange={(e) => setData({...data, image: e.target.value})} />
      <input className="border p-2 m-1 w-full" placeholder="Places (comma separated)" value={data.places} onChange={(e) => setData({...data, places: e.target.value})} />
      <input className="border p-2 m-1 w-full" type="date" value={data.date} onChange={(e) => setData({...data, date: e.target.value})} />
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleSubmit}>Add Package</button>
    </div>
  );
}
