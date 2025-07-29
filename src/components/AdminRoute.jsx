"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AdminRoute({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")) router.push("/admin/login");
  }, []);
  return children;
}
