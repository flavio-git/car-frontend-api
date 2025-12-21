"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router, pathname]);

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box>{children}</Box>
      </main>
    </div>
  );
}
