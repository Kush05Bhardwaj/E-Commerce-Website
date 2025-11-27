import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "react-toastify/dist/ReactToastify.css";

export const AppLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <main className="min-h-[70vh]">
      <Outlet />
    </main>
    <Footer />
    <ToastContainer position="top-right" theme="colored" />
  </div>
);

