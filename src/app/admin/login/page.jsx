"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      Cookies.set("token", "admin-token", { expires: 1 / 24 }); // 1 hour
      toast.success("Login successful");
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 mb-2 w-full" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
}
